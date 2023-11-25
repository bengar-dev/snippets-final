import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): boolean {
    // Initié par l'utilisateur, redirigez vers GitHub pour l'authentification
    return true;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubLoginCallback(@Req() req, @Res() res): void {
    // Gère la réponse de GitHub, redirigez l'utilisateur après l'authentification
    res.redirect('/');
  }
}
