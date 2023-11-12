import { Module } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, StrapiService],
})
export class UsersModule {}
