import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { HealthCheckModule } from './healthCheck/health-check.module';
import { StrapiModule } from './strapi/strapi.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    HealthCheckModule,
    StrapiModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
