import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StrapiService } from './strapi.service';
import { InputRegisterUser, InputSignUser } from './dto/auth-user.dto';
import { AuthUser, User } from './models/user.model';

@Resolver()
export class StrapiResolver {
  constructor(private readonly strapiService: StrapiService) {}

  @Mutation(() => AuthUser)
  async register(
    @Args('registerUser') registerUser: InputRegisterUser,
  ): Promise<AuthUser> {
    return this.strapiService.register(registerUser);
  }

  @Mutation(() => AuthUser)
  async signIn(@Args('signUser') signUser: InputSignUser): Promise<AuthUser> {
    return this.strapiService.signIn(signUser);
  }

  @Query(() => User)
  async userMe(@Args('jwt') jwt: string): Promise<User> {
    return this.strapiService.userMe(jwt);
  }
}
