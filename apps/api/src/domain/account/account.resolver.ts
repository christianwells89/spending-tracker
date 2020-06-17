import { Arg, FieldResolver, Float, Mutation, Query, Resolver, Root } from 'type-graphql';
import { Repository } from 'typeorm';

import { Account } from './account.entity';
import { AccountInput } from './account.input';
import { AccountService } from './account.service';
import { InjectRepository } from 'helpers';

@Resolver(Account)
export class AccountResolver {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    private readonly accountService: AccountService,
  ) {}

  @Query(() => Account, { nullable: true })
  account(@Arg('uid') uid: string): Promise<Account> {
    return this.accountRepository.findOne({ uid });
  }

  @Query(() => [Account])
  accounts(@Arg('budgetId') budgetId: number): Promise<Account[]> {
    return this.accountRepository.find({ where: { budgetId } });
  }

  @Mutation(() => Account)
  createAccount(@Arg('account') accountInput: AccountInput): Promise<Account> {
    const account = this.accountRepository.create({ ...accountInput });
    return this.accountRepository.save(account);
  }

  @FieldResolver(() => Float)
  balance(@Root() account: Account): Promise<number> {
    return this.accountService.getBalance(account);
  }
}
