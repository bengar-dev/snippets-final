import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StrapiService } from './strapi.service';
import { InputRegisterUser } from './dto/register-user.dto';
import { RegisterUser, User } from './models/user.model';

@Resolver()
export class StrapiResolver {
  constructor(private readonly strapiService: StrapiService) {}

  @Mutation(() => RegisterUser)
  async register(
    @Args('registerUser') registerUser: InputRegisterUser,
  ): Promise<RegisterUser> {
    return this.strapiService.register(registerUser);
  }

  @Query(() => User)
  async userMe(@Args('jwt') jwt: string): Promise<User> {
    return this.strapiService.userMe(jwt);
  }
}
