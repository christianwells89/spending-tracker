import { Field, InputType } from 'type-graphql';

import { Currency } from '@st/types';
import { Budget } from './budget.entity';

@InputType()
export class BudgetInput implements Partial<Budget> {
  @Field()
  name: string;

  @Field(() => Currency)
  currency: Currency;

  @Field({ nullable: true })
  timezone?: string;
}
