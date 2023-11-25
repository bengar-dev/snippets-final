import { Query, Resolver } from '@nestjs/graphql';
import {
  HealthCheck,
  HealthCheckCollection,
} from './models/health-check.model';
import { HealthCheckService } from './health-check.service';

@Resolver()
export class HealthCheckResolver {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Query(() => HealthCheckCollection)
  healthChecks() {
    return this.healthCheckService.healthChecks();
  }
}
