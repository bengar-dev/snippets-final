import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GitHubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { StrapiService } from 'src/strapi/strapi.service';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'github' }),
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
  controllers: [AuthController],
  providers: [GitHubStrategy, AuthService, StrapiService],
  exports: [PassportModule],
})
export class AuthModule {}
