import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { Login, UserService } from './user.service';
import { InjectRepository } from 'helpers';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @Query(() => User)
  user(): Promise<User> {
    // TODO: use context for user id when there is auth
    return this.userRepository.findOne(1);
  }

  @Mutation(() => Login)
  login(@Arg('email') email: string, @Arg('password') password: string): Promise<Login> {
    return this.userService.login(email, password);
  }
}
