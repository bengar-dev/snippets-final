import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AuthUser, User } from './models/user.model';
import { InputRegisterUser, InputSignUser } from './dto/auth-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrapiService {
  private strapiApi = this.configService.get('STRAPI_API');

  constructor(private readonly configService: ConfigService) {}

  async register(user: InputRegisterUser): Promise<AuthUser> {
    const { data } = await axios.post<AuthUser>(
      `${this.strapiApi}/auth/local/register`,
      user,
    );

    return data;
  }

  async signIn(user: InputSignUser): Promise<AuthUser> {
    const { data } = await axios.post<AuthUser>(
      `${this.strapiApi}/auth/local`,
      user,
    );

    return data;
  }

  async userMe(jwt: string): Promise<User> {
    const { data } = await axios.get<User>(`${this.strapiApi}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return data;
  }
}
