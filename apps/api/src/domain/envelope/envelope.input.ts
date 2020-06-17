import { Field, InputType, Int } from 'type-graphql';

import { Envelope } from './envelope.entity';

@InputType()
export class EnvelopeInput implements Partial<Envelope> {
  @Field()
  name: string;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  groupId: number;

  @Field(() => Int)
  budgetId: number;
}
