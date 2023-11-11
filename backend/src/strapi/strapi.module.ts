import { Module } from '@nestjs/common';
import { StrapiResolver } from './strapi.resolver';
import { StrapiService } from './strapi.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers: [StrapiResolver, StrapiService, ConfigService],
})
export class StrapiModule {}
