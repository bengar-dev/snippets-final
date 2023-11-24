import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { AuthUser, User } from './models/user.model';
import { InputRegisterUser, InputSignUser } from './dto/auth-user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class StrapiService {
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async register(user: InputRegisterUser): Promise<AuthUser> {
    const { data } = await axios.post<AuthUser>(
      `${this.configService.get('STRAPI_API')}/auth/local/register`,
      user,
    );

    return data;
  }

  async signIn(user: InputSignUser): Promise<AuthUser> {
    const { data } = await axios.post<AuthUser>(
      `${this.configService.get('STRAPI_API')}/auth/local`,
      user,
    );

    return data;
  }

  async userMe(jwt: string): Promise<User> {
    const observable = this.httpService.get<User>(
      `${this.configService.get('STRAPI_API')}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    return this.renderStrapiData<User>(observable);
  }

  async getEntriesCollection<T>(collection: string): Promise<Array<T>> {
    const observable = this.httpService.get<Array<T>>(
      `${this.configService.get('STRAPI_API')}/${collection}`,
    );

    return this.renderStrapiData(observable);
  }

  async getEntryCollection<T>(
    collection: string,
    id: number | string,
  ): Promise<T> {
    const observable = this.httpService.get<T>(
      `${this.configService.get('STRAPI_API')}/${collection}/${id}`,
    );

    return this.renderStrapiData(observable);
  }

  private async renderStrapiData<T>(
    obs: Observable<AxiosResponse<T>>,
  ): Promise<T> {
    const { data } = await firstValueFrom(obs);

    return data;
  }
}
