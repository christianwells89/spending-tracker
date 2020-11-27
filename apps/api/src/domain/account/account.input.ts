import { Field, Int, InputType } from 'type-graphql';

import { AccountType } from '@st/types';
import { Account } from './account.entity';

@InputType()
export class AccountInput implements Partial<Account> {
  @Field(() => AccountType)
  type: AccountType;

  @Field()
  name: string;

  @Field({ nullable: true })
  institution?: string;

  @Field({ nullable: true })
  identifier?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => Int)
  budgetId: number;
}
