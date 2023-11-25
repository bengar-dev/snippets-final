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

@ObjectType()
export class MetaPagination {
  @Field()
  page: number;
  @Field()
  pageSize: number;
  @Field()
  pageCount: number;
  @Field()
  total: number;
}

@ObjectType()
export class MetaSrapiResponse {
  @Field()
  pagination: MetaPagination;
}
