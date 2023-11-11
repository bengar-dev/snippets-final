import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputRegisterUser {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
