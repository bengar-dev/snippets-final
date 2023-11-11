import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class User {
  @Field()
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  provider: string;

  @Field()
  confirmed: boolean;

  @Field()
  blocked: boolean;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@ObjectType()
export class RegisterUser {
  @Field()
  jwt: string;

  @Field(() => User)
  user: User;
}
