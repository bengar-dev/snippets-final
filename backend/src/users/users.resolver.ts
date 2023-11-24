import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../strapi/models/user.model';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersServices: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.usersServices.users();
  }

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.usersServices.user(id);
  }
}
