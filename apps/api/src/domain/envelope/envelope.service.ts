import { DateTime } from 'luxon';
import { Repository } from 'typeorm';
import { Service } from 'typedi';

import { Envelope } from './envelope.entity';
import { EnvelopeMonth } from './month/month.entity';
import { Transaction } from 'domain/transaction';
import { InjectRepository, parseMonthInYearToDate } from 'helpers';
import { MonthInYear } from '@st/types';

// TODO: It would be real nice to figure out how to register custom repositories easily in the IOC
// container so we could offload the ugly queryBuilder calls to it and allow this class to be unit
// tested a lot more easily.

@Service()
export class EnvelopeService {
  constructor(
    @InjectRepository(Envelope) private readonly envelopeRepository: Repository<Envelope>,
    @InjectRepository(EnvelopeMonth) private readonly monthRepository: Repository<EnvelopeMonth>,
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * Gets the envelope's month, or creates a new one if it doesn't exist yet.
   */
  async getMonth(envelopeId: number, isoMonth: MonthInYear): Promise<EnvelopeMonth> {
    const month = DateTime.fromISO(isoMonth).setZone('UTC');
    const jsMonth = month.toJSDate();

    return (
      (await this.monthRepository.findOne({ envelopeId, month: jsMonth })) ??
      this.createAndSaveMonth({ envelopeId, month: jsMonth })
    );
  }

  /**
   * Gets all of the envelopes' given month.
   *
   * Since we don't add a row to this table until something actually happens, we can't just find all
   * months that have the given MonthInYear because it will miss those envelopes that don't have a
   * row and we can't calculate the available value. So we need to get all envelopes, and then get
   * their months, defaulting to a blank one if it doesn't exist.
   */
  async getEnvelopeMonths(budgetId: number, yearMonth: MonthInYear): Promise<EnvelopeMonth[]> {
    const month = parseMonthInYearToDate(yearMonth);
    // TypeORM doesn't give an option to get a flat values list, this is going to be objects with
    // one property that we need to use, annoyingly. Not going to flatten it out here and cause
    // another loop, but if I do figure out custom repositories that should be done in there and
    // return a flat list of numbers to here.
    const rawEnvelopes = await this.envelopeRepository
      .createQueryBuilder('envelope')
      .select('envelope.id')
      .where('budgetId = :budgetId', { budgetId })
      .getRawMany();

    const months = await this.monthRepository.find({
      where: { month: month.toISOString(), envelope: { budgetId } },
    });

    const allMonths = rawEnvelopes.map(
      (raw) =>
        months.find((m) => m.envelopeId === raw.envelope_id) ??
        this.createEmptyMonth(raw.envelope_id, month),
    );
    return allMonths;
  }

  async getMonthTotalActivity(envelopeId: number, month: DateTime): Promise<number> {
    const comparisonDate = month.plus({ month: 1 }).minus({ day: 1 }); // last day of given month
    const { amount } = await this.transactionRepository
      .createQueryBuilder()
      .select('SUM(amount)', 'amount')
      .where('envelopeId = :envelopeId', { envelopeId })
      .andWhere('date BETWEEN :start AND :end', {
        start: month.toFormat('yyyy-LL-dd'),
        end: comparisonDate.toFormat('yyyy-LL-dd'),
      })
      .getRawOne();

    return parseFloat(amount ?? 0);
  }

  async getAvailableForMonth(envelopeId: number, month: DateTime): Promise<number> {
    const nextMonth = month.plus({ month: 1 });
    const { totalActivity } = await this.transactionRepository
      .createQueryBuilder()
      .select('SUM(amount)', 'totalActivity')
      .where('envelopeId = :envelopeId', { envelopeId })
      .andWhere('date < :nextMonth', {
        nextMonth: nextMonth.toJSDate(),
      })
      .getRawOne();

    const { totalAllocated } = await this.monthRepository
      .createQueryBuilder()
      .select('SUM(allocated)', 'totalAllocated')
      .where('envelopeId = :envelopeId', { envelopeId })
      .andWhere('month < :nextMonth', { nextMonth: nextMonth.toJSDate() })
      .getRawOne();

    return parseFloat(totalAllocated ?? 0) + parseFloat(totalActivity ?? 0);
  }

  async transferAllocated(
    toId: number,
    fromId: number,
    amount: number,
    month: MonthInYear,
  ): Promise<EnvelopeMonth[]> {
    const toMonth = await this.getMonth(toId, month);
    const fromMonth = await this.getMonth(fromId, month);

    // For some reason this becomes a string at runtime. Who knows why. TypeORM being werid
    toMonth.allocated = parseFloat((toMonth.allocated as unknown) as string) + amount;
    fromMonth.allocated -= amount;

    return this.monthRepository.save([fromMonth, toMonth]);
  }

  createInflowEnvelope(): Envelope {
    const envelope = new Envelope({ name: 'To Be Budgeted', order: 0 });
    envelope.isIntake = true;

    return envelope;
  }

  private createAndSaveMonth(month: Partial<EnvelopeMonth>): Promise<EnvelopeMonth> {
    const entity = this.monthRepository.create(month);
    return this.monthRepository.save(entity);
  }

  private createEmptyMonth(envelopeId: number, month: Date): EnvelopeMonth {
    const emptyMonth = new EnvelopeMonth();
    emptyMonth.id = 0;
    emptyMonth.envelopeId = envelopeId;
    emptyMonth.month = month;
    emptyMonth.allocated = 0;

    return emptyMonth;
  }
}
