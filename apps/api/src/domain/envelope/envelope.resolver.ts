import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';

import { Envelope } from './envelope.entity';
import { EnvelopeInput } from './envelope.input';
import { EnvelopeService } from './envelope.service';
import { EnvelopeMonth } from './month/month.entity';
import { InjectRepository } from 'helpers';

@Resolver(Envelope)
export class EnvelopeResolver {
  constructor(
    @InjectRepository(Envelope) private readonly envelopeRepository: Repository<Envelope>,
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

  @Mutation(() => Envelope)
  createEnvelope(@Arg('envelope') input: EnvelopeInput): Promise<Envelope> {
    const envelope = this.envelopeRepository.create({ ...input });
    return this.envelopeRepository.save(envelope);
  }

  @FieldResolver(() => EnvelopeMonth)
  async month(@Root() envelope: Envelope, @Arg('month') month: Date): Promise<EnvelopeMonth> {
    // TODO: this could be cached
    return this.envelopeService.getMonth(envelope, month);
  }
}
