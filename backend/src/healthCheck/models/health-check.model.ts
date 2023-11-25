import { Field, ObjectType } from '@nestjs/graphql';
import {
  MetaPagination,
  MetaStrapiResponse,
  StrapiFile,
} from 'src/strapi/models/strapi.common.model';

@ObjectType()
export class HealthCheck {
  @Field()
  title: string;

  @Field()
  status: boolean;

  @Field(() => StrapiFile, { nullable: true })
  image: StrapiFile;
}

@ObjectType()
export class HealthCheckCollection {
  @Field(() => [HealthCheck])
  data: Array<HealthCheck>;

  @Field(() => MetaStrapiResponse)
  meta: MetaStrapiResponse;
}
