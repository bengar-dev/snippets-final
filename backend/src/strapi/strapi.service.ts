import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RegisterUser, User } from './models/user.model';
import { InputRegisterUser } from './dto/register-user.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrapiService {
  private strapiApi = this.configService.get('STRAPI_API');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async register(user: InputRegisterUser): Promise<RegisterUser> {
    const { data } = await axios.post<RegisterUser>(
      `${this.strapiApi}/auth/local/register`,
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
