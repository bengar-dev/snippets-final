import { Module } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
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
  providers: [UsersResolver, UsersService, StrapiService],
  exports: [UsersService],
})
export class UsersModule {}
