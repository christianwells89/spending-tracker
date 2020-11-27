import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Field, ObjectType } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { InjectRepository } from 'helpers';

const APP_SECRET = 'top_secret'; // TODO: put this in env

@ObjectType()
export class Login {
  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  @Field()
  user: User;

  @Field()
  token: string;
}

@Service()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async login(email: string, password: string): Promise<Login> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return new Login(user, token);
  }
}
