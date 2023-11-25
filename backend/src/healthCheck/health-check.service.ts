import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import {
  HealthCheck,
  HealthCheckCollection,
} from './models/health-check.model';

@Injectable()
export class HealthCheckService {
  constructor(private readonly strapiService: StrapiService) {}

  async healthChecks(): Promise<HealthCheckCollection> {
    const response =
      await this.strapiService.getEntriesCollection('health-checks');

    return this.strapiService.formatDeepCollection<HealthCheckCollection>(
      response,
    );
  }
}
