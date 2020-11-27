import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';

import { MonthInYear } from '@st/types';
import { Envelope } from './envelope.entity';
import { EnvelopeInput } from './envelope.input';
import { EnvelopeService } from './envelope.service';
import { EnvelopeGroup } from './group/group.entity';
import { EnvelopeMonth } from './month/month.entity';
import { InjectRepository } from 'helpers';

@Resolver(Envelope)
export class EnvelopeResolver {
  constructor(
    @InjectRepository(Envelope) private readonly envelopeRepository: Repository<Envelope>,
    @InjectRepository(EnvelopeGroup) private readonly groupRepository: Repository<EnvelopeGroup>,
    private readonly envelopeService: EnvelopeService,
  ) {}

  @Query(() => Envelope, { nullable: true })
  envelope(@Arg('uid') uid: string): Promise<Envelope> {
    return this.envelopeRepository.findOne({ uid });
  }

  @Query(() => [Envelope])
  envelopes(@Arg('budgetUid') budgetUid: string): Promise<Envelope[]> {
    return this.envelopeRepository.find({ budget: { uid: budgetUid } });
  }

  // Should be in a separate resolver, but I'm being lazy
  @Query(() => [EnvelopeGroup])
  groups(@Arg('budgetUid') budgetUid: string): Promise<EnvelopeGroup[]> {
    return this.groupRepository.find({ budget: { uid: budgetUid } });
  }

  @Query(() => [EnvelopeMonth])
  envelopeMonths(
    @Arg('budgetId') budgetId: number,
    @Arg('month') month: MonthInYear,
  ): Promise<EnvelopeMonth[]> {
    return this.envelopeService.getEnvelopeMonths(budgetId, month);
  }

  @Mutation(() => Envelope)
  createEnvelope(@Arg('envelope') input: EnvelopeInput): Promise<Envelope> {
    const envelope = this.envelopeRepository.create({ ...input });
    return this.envelopeRepository.save(envelope);
  }

  @Mutation(() => [EnvelopeMonth])
  transferAllocated(
    @Arg('toId', () => Int) toId: number,
    @Arg('fromId', () => Int) fromId: number,
    @Arg('amount') amount: number,
    @Arg('month') month: MonthInYear,
  ): Promise<EnvelopeMonth[]> {
    return this.envelopeService.transferAllocated(toId, fromId, amount, month);
  }

  @FieldResolver(() => EnvelopeMonth, { nullable: true })
  async month(
    @Root() envelope: Envelope,
    @Arg('month') month: MonthInYear,
  ): Promise<EnvelopeMonth> {
    return this.envelopeService.getMonth(envelope.id, month);
  }
}
