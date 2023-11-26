import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { GithubUser, GithubUserResponse } from './models/github.model';
import { startWith } from 'rxjs';

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

  @Get('userMe')
  async userMe(@Req() req, @Res() res): Promise<boolean> {
    const { jwt } = req.cookies;
    if (jwt) {
      try {
        const decodeToken = await this.jwtService.verifyAsync(jwt);
        //do things if we decode it
        return res.status(200).json(true);
      } catch (err: any) {
        res.clearCookie('jwt');
        return res.status(401).json(false);
      }
    }

    return res.status(401).json(false);
  }
}
