import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { TransactionInput } from './transaction.input';
import { Payee, Transaction } from './transaction.entity';
import { InjectRepository } from 'helpers';

@Resolver(Transaction)
export class TransactionResolver {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
  ) {}

  @Query(() => Transaction, { nullable: true })
  transaction(@Arg('uid') uid: string): Promise<Transaction> {
    return this.transactionRepository.findOne({ uid });
  }

  @Query(() => [Transaction])
  transactions(
    @Arg('accountId', { nullable: true }) accountId?: number,
    @Arg('budgetId', { nullable: true }) budgetId?: number,
  ): Promise<Transaction[]> {
    let query = this.transactionRepository.createQueryBuilder('transaction');

    if (accountId) {
      query = query.where('transaction.accountId = :accountId', { accountId });
    } else if (budgetId) {
      query = query
        .innerJoin('transaction.account', 'account')
        .where('account.budgetId = :budgetId', { budgetId });
    } else {
      throw new Error('accountId or budgetId is required');
    }

    return query.orderBy({ 'transaction.date': 'DESC', 'transaction.createdAt': 'DESC' }).getMany();
  }

  @Query(() => [Payee])
  payees(@Arg('budgetId') budgetId: number): Promise<Payee[]> {
    return (
      this.transactionRepository
        .createQueryBuilder('transaction')
        // This isn't actually correct, but would need to use ROW_NUMBER to get the latest
        .select('transaction.payee AS name, MAX(transaction.envelopeId) AS lastEnvelopeId')
        .innerJoin('transaction.account', 'account')
        .where('account.budgetId = :budgetId', { budgetId })
        .groupBy('transaction.payee')
        .orderBy('transaction.payee')
        .getRawMany() as Promise<Payee[]>
    );
  }

  @Mutation(() => Transaction)
  createTransaction(@Arg('transaction') transactionInput: TransactionInput): Promise<Transaction> {
    const transaction = this.transactionRepository.create({ ...transactionInput });
    return this.transactionRepository.save(transaction);
  }
}
