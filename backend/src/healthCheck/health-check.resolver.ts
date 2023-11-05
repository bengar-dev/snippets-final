import { Query, Resolver } from '@nestjs/graphql';
import { HealthCheck } from './models/health-check.model';

@Resolver()
export class HealthCheckResolver {
  constructor() {}

  @Query(() => HealthCheck)
  read(): HealthCheck {
    console.log('hello world :)');
    return {
      status: true,
    };
  }
}
