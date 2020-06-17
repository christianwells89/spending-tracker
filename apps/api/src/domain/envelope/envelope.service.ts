import { DateTime } from 'luxon';
import { LessThan, Repository, LessThanOrEqual } from 'typeorm';
import { Service } from 'typedi';

import { Envelope } from './envelope.entity';
import { EnvelopeMonth } from './month/month.entity';
import { Transaction } from 'domain/transaction';
import { InjectRepository } from 'helpers';

@Service()
export class EnvelopeService {
  constructor(
    @InjectRepository(Envelope) private readonly envelopeRepository: Repository<Envelope>,
    @InjectRepository(EnvelopeMonth) private readonly monthRepository: Repository<EnvelopeMonth>,
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * Get the details of an envelope's month, including summaries of activity and funds available.
   *
   * Month should be a Date of midnight on the 1st day of said month. eg. 2020-06-01 00:00
   */
  async getMonth(envelope: Envelope, month: Date): Promise<EnvelopeMonth> {
    // This method could be cached, and invalidated if any action is done on this envelope
    // see: https://www.apollographql.com/docs/apollo-server/performance/caching/#adding-cache-hints-statically-in-your-schema
    const [months, count] = await this.monthRepository.findAndCount({
      month: LessThanOrEqual(month),
    });

    if (count === 0) return null;

    const totalAvailable = months.reduce(
      (runningTotal: number, m: EnvelopeMonth) => runningTotal + m.allocated,
      0,
    );
    // Use the start of the next month to capture transactions in the current month
    const comparisonDate = DateTime.fromJSDate(month).plus({ month: 1 });
    const transactions = await this.transactionRepository.find({
      envelopeId: envelope.id,
      date: LessThan(comparisonDate),
    });

    const totalActivity = transactions.reduce(
      (runningTotal: number, t: Transaction) => runningTotal + t.amount,
      0,
    );
    const currentMonthActivity = transactions.reduce((runningTotal: number, t: Transaction) => {
      return t.date >= month ? runningTotal + t.amount : runningTotal;
    }, 0);

    const currentMonth = months.pop();
    currentMonth.activity = currentMonthActivity;
    currentMonth.available = totalAvailable - totalActivity;
    return currentMonth;
  }

  async transferMonthAllocated(
    fromEnvelopeId: number,
    toEnvelopeId: number,
    month: Date,
    amount: number,
  ): Promise<EnvelopeMonth[]> {
    const fromMonth = await this.getOrCreateMonth(fromEnvelopeId, month);
    const toMonth = await this.getOrCreateMonth(toEnvelopeId, month);

    fromMonth.allocated -= amount;
    toMonth.allocated += amount;

    return this.monthRepository.save([fromMonth, toMonth]);
  }

  createInflowEnvelope(): Envelope {
    const envelope = new Envelope({ name: 'To Be Budgeted', order: 0 });
    envelope.isIntake = true;

    return envelope;
  }

  private async getOrCreateMonth(envelopeId: number, month: Date): Promise<EnvelopeMonth> {
    // Ideally this would be in a custom repository but, surprise surprise, there are TS issues with
    // extending Repository, so just do it here.
    const monthPartial = { envelopeId, month };
    return (
      (await this.monthRepository.findOne(monthPartial)) ??
      this.monthRepository.create(monthPartial)
    );
  }
}
