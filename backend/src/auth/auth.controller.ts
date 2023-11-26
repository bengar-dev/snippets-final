import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { GithubUser, GithubUserResponse } from './models/github.model';

@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): boolean {
    return true;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req, @Res() res): Promise<void> {
    const user: GithubUserResponse = req.user;

    const payload = {
      userId: user.id,
      username: user.username,
      githubSign: true,
    };

    const jwt = await this.jwtService.signAsync(payload);

    res.cookie('jwt', jwt);
    res.redirect(this.configService.get('FRONTEND_ENDPOINT'));
  }
}
