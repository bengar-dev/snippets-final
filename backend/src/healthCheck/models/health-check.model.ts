import { Field, ObjectType } from '@nestjs/graphql';
import { MetaPagination } from 'src/strapi/models/strapi.common.model';

@ObjectType()
export class StrapiFile {
  @Field()
  id: number;
}

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

  @Field(() => MetaPagination)
  meta: MetaPagination;
}
