import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { AuthUser, User } from './models/user.model';
import { InputRegisterUser, InputSignUser } from './dto/auth-user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiOptionInput, StrapiResponse } from './models/strapi.common.model';

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

  async getEntriesCollection(
    collection: string,
    apiOptions?: ApiOptionInput,
  ): Promise<StrapiResponse> {
    const query = this.buildApiOptions(apiOptions);

    const observable = this.httpService.get(
      `${this.configService.get('STRAPI_API')}/${collection}${query}`,
    );

    return this.renderStrapiData(observable);
  }

  async getEntryCollection(
    collection: string,
    id: number | string,
  ): Promise<StrapiResponse> {
    const query = this.buildApiOptions();

    const observable = this.httpService.get(
      `${this.configService.get('STRAPI_API')}/${collection}/${id}${query}`,
    );

    return this.renderStrapiData(observable);
  }

  async createEntryCollection(
    collection: string,
    data: object,
  ): Promise<StrapiResponse> {
    const observable = this.httpService.post(
      `${this.configService.get('STRAPI_API')}/${collection}`,
      {
        data,
      },
    );

    return this.renderStrapiData(observable);
  }

  async updateEntryCollection(
    collection: string,
    strapiId: number,
    data: object,
  ): Promise<StrapiResponse> {
    const observable = this.httpService.put(
      `${this.configService.get('STRAPI_API')}/${collection}/${strapiId}`,
      {
        data,
      },
    );

    return this.renderStrapiData(observable);
  }

  public formatDeepCollection<T>(strapiResponse: StrapiResponse): T {
    if (Array.isArray(strapiResponse.data)) {
      return {
        data: strapiResponse.data.map((el: object) =>
          this.formatDeepSingleData(el),
        ),
        meta: strapiResponse.meta,
      } as T;
    }
  }

  public formatDeepSingleData(data: object): object {
    let newObject = {};
    if (!data) {
      return null;
    }

    if (typeof data === 'object') {
      const keysArray = Object.keys(data) || [];

      for (const key of keysArray) {
        if (key !== 'attributes' && key !== 'data') {
          newObject = {
            ...newObject,
            [key]: this.formatDeepSingleData(data[key]),
          };
        } else if (
          (key === 'attributes' || key === 'data') &&
          data[key] &&
          Object.keys(data[key]).length > 0
        ) {
          newObject = {
            ...newObject,
            ...this.formatDeepSingleData(data[key]),
          };
        } else {
          return null;
        }
      }
    } else {
      return data;
    }

    return newObject;
  }

  private buildApiOptions(apiOption?: ApiOptionInput): string {
    let queryString: string = '?populate=deep,5';

    if (!apiOption) {
      return queryString;
    }

    if (apiOption.populateValue) {
      queryString = `populate=deep,${apiOption.populateValue}`;
    }

    if (apiOption.where) {
      queryString = `?filters[${apiOption.where.fieldName}][$eq]=${apiOption.where.value}`;
    }

    return queryString;
  }

  private async renderStrapiData<T>(
    obs: Observable<AxiosResponse<T>>,
  ): Promise<T> {
    const { data } = await firstValueFrom(obs);

    return data;
  }
}
