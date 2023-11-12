import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { User } from '../strapi/models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly strapiService: StrapiService) {}

  async users(): Promise<Array<User>> {
    return this.strapiService.getEntriesCollection<User>('users');
  }

  async user(id: number): Promise<User> {
    return this.strapiService.getEntryCollection<User>('users', id);
  }
}
