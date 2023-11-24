import { Module } from '@nestjs/common';
import { StrapiResolver } from './strapi.resolver';
import { StrapiService } from './strapi.service';
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
  providers: [StrapiResolver, StrapiService],
})
export class StrapiModule {}
