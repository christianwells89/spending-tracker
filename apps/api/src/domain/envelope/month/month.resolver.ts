import { DateTime } from 'luxon';
import { Arg, FieldResolver, Float, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { In, Repository } from 'typeorm';

import { MonthInYear } from '@st/types';
import { EnvelopeService } from '../envelope.service';
import { EnvelopeMonth } from './month.entity';
import { InjectRepository } from 'helpers';

@Resolver(EnvelopeMonth)
export class EnvelopeMonthResolver {
  constructor(
    @InjectRepository(EnvelopeMonth) private readonly monthRepository: Repository<EnvelopeMonth>,
    private readonly envelopeService: EnvelopeService,
  ) {}

  @Query(() => [EnvelopeMonth])
  async months(
    @Arg('envelopeIds', () => [Int]) envelopeIds: number[],
    @Arg('month') month: string,
  ): Promise<EnvelopeMonth[]> {
    const jsMonth = DateTime.fromISO(month).setZone('UTC');
    return this.monthRepository.find({ envelopeId: In(envelopeIds), month: jsMonth });
  }

  @FieldResolver(() => Float)
  async activity(@Root() month: EnvelopeMonth): Promise<number> {
    return this.envelopeService.getMonthTotalActivity(
      month.envelopeId,
      DateTime.fromISO(month.month.toISOString()).setZone('UTC'),
    );
  }

  @FieldResolver(() => Float)
  async available(@Root() month: EnvelopeMonth): Promise<number> {
    return this.envelopeService.getAvailableForMonth(
      month.envelopeId,
      DateTime.fromISO(month.month.toISOString()).setZone('UTC'),
    );
  }

  /**
   * Transforms the id of the envelope month to be of the format (envelopeId)-(year)-(month) when
   * returned to the client. This is because a month row is only saved when it needs to be, and
   * caching on the client means it isn't ideal to just return 0 as the id. The client will never
   * need this id value to pass back anyway, it can always be retrieved by the unique pairing of
   * envelope id and month.
   */
  @FieldResolver()
  id(@Root() month: EnvelopeMonth): string {
    const monthDate = DateTime.fromISO(month.month.toISOString(), { zone: 'utc' });
    return `${month.envelopeId}-${monthDate.toFormat('yyyy-MM')}`;
  }

  @FieldResolver()
  month(@Root() month: EnvelopeMonth): MonthInYear {
    return DateTime.fromISO(month.month.toISOString(), { zone: 'utc' }).toFormat(
      'yyyy-MM',
    ) as MonthInYear;
  }
}
