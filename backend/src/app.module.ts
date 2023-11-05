import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HealthCheckResolver } from './healthCheck/health-check.resolver';
import { HealthCheckModule } from './healthCheck/health-check.module';

@Module({
  imports: [
    HealthCheckModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [HealthCheckResolver],
})
export class AppModule {}
