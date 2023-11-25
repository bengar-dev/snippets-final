import { Module } from '@nestjs/common';
import { HealthCheckResolver } from './health-check.resolver';
import { HealthCheckService } from './health-check.service';
import { StrapiService } from '../strapi/strapi.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        headers: {
          Authorization: `Bearer ${configService.get('GRAPHQL_TOKEN')}`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [HealthCheckResolver, HealthCheckService, StrapiService],
})
export class HealthCheckModule {}
