import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { User } from '../strapi/models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly strapiService: StrapiService) {}

  async users(): Promise<Array<User>> {
    return (await this.strapiService.getEntriesCollection(
      'users',
    )) as any as Array<User>;
  }

  async user(id: number): Promise<User> {
    return (await this.strapiService.getEntryCollection(
      'users',
      id,
    )) as any as User;
  }
}
