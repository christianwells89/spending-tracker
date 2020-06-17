import { ValidateIf } from 'class-validator';
import { Field, Float, InputType } from 'type-graphql';

import { Transaction } from './transaction.entity';

@InputType()
export class TransactionInput implements Partial<Transaction> {
  @Field(() => Float)
  amount: number;

  @Field()
  date: Date;

  @Field()
  payee: string;

  @Field({ nullable: true })
  detail?: string;

  // TODO: Transfers should use a dedicated mutator and input
  @ValidateIf((f: TransactionInput) => !f.isTransfer)
  @Field()
  envelopeId: number;

  @Field()
  accountId: number;

  @Field({ defaultValue: false })
  cleared: boolean;

  @Field({ defaultValue: false })
  isTransfer: boolean;
}
