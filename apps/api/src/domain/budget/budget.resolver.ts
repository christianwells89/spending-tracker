import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { Budget } from './budget.entity';
import { BudgetInput } from './budget.input';
import { EnvelopeService } from 'domain/envelope/envelope.service';
import { InjectRepository } from 'helpers';

@Resolver(Budget)
export class BudgetResolver {
  constructor(
    @InjectRepository(Budget) private readonly budgetRepository: Repository<Budget>,
    private readonly envelopeService: EnvelopeService,
  ) {}

  @Query(() => Budget, { nullable: true })
  budget(@Arg('uid') uid: string): Promise<Budget> {
    return this.budgetRepository.findOne({ uid });
  }

  @Query(() => [Budget])
  budgets(): Promise<Budget[]> {
    // TODO: use context for userId
    return this.budgetRepository.find({ userId: 1 });
  }

  @Mutation(() => Budget)
  createBudget(@Arg('budget') budgetInput: BudgetInput): Promise<Budget> {
    const intakeEnvelope = this.envelopeService.createInflowEnvelope();
    // TODO: use context for userId
    const budget = this.budgetRepository.create({
      ...budgetInput,
      userId: 1,
      envelopes: [intakeEnvelope],
    });
    return this.budgetRepository.save(budget);
  }
}
