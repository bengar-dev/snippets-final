import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { GithubProfil } from './models/github.model';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackUrl: configService.get('GITHUB_CALLBACK_URL'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfil,
    done: any,
  ): Promise<any> {
    const githubUser = await this.authService.getGithubUser(profile.id);

    if (githubUser) {
      await this.authService.updateGithubUser(
        githubUser.id,
        profile,
        accessToken,
        refreshToken,
      );
      return done(null, githubUser);
    }

    const creatingGithubUser = await this.authService.createGithubUser(
      profile,
      accessToken,
      refreshToken,
    );

    return done(null, creatingGithubUser);
  }
}
