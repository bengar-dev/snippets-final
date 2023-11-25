import { Field, ObjectType } from '@nestjs/graphql';

export interface StrapiResponse {
  data: object | Array<object>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiOptionInput {
  populateValue?: string;
}

@ObjectType()
export class StrapiFile {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  alternativeText?: string;

  @Field()
  url: string;

  @Field()
  size: number;
}

@ObjectType()
export class MetaPagination {
  @Field({ nullable: true })
  page?: number;
  @Field({ nullable: true })
  pageSize?: number;
  @Field({ nullable: true })
  pageCount?: number;
  @Field({ nullable: true })
  total?: number;
}

@ObjectType()
export class MetaStrapiResponse {
  @Field()
  pagination: MetaPagination;
}
