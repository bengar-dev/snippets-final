import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HealthCheck {
  @Field()
  status: boolean;
}
