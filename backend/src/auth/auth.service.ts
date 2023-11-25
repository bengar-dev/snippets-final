import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import {
  GithubProfil,
  GithubUser,
  GithubUserResponse,
} from './models/github.model';
import { AES, enc } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(private readonly strapiService: StrapiService) {}

  async getGithubUser(githubId: string): Promise<GithubUserResponse | null> {
    const strapiResponse = await this.strapiService.getEntriesCollection(
      'github-users',
      { where: { fieldName: 'githubId', value: githubId } },
    );

    if (
      Array.isArray(strapiResponse.data) &&
      strapiResponse.data.length === 1
    ) {
      const dataWithAccessTokenDecrypted = {
        ...strapiResponse.data[0],
        accessToken: this.decrypt(
          strapiResponse.data[0].attributes.accessToken,
        ),
        refreshToken: this.decrypt(
          strapiResponse.data[0].attributes.refreshToken,
        ),
      };

      return this.strapiService.formatDeepSingleData(
        dataWithAccessTokenDecrypted,
      ) as GithubUserResponse;
    }

    return null;
  }

  async createGithubUser(
    githubProfil: GithubProfil,
    accessToken: string,
    refreshToken: string,
  ): Promise<GithubUser> {
    const data: GithubUser = {
      githubId: githubProfil.id,
      displayName: githubProfil.displayName || '',
      username: githubProfil.username,
      profileUrl: githubProfil.profileUrl,
      avatarUrl: githubProfil._json.avatar_url || '',
      accessToken: this.encrypt(accessToken),
      refreshToken: this.encrypt(refreshToken),
    };

    const strapiResponse = await this.strapiService.createEntryCollection(
      'github-users',
      data,
    );

    return this.strapiService.formatDeepSingleData(
      strapiResponse.data,
    ) as GithubUser;
  }

  async updateGithubUser(
    strapiId: number,
    githubProfil: GithubProfil,
    accessToken: string,
    refreshToken: string,
  ): Promise<GithubUser> {
    const data = {
      username: githubProfil.username,
      displayName: githubProfil.displayName,
      profileUrl: githubProfil.profileUrl,
      avatarUrl: githubProfil._json.avatar_url,
      accessToken: this.encrypt(accessToken),
      refreshToken: this.encrypt(refreshToken),
    };

    const strapiResponse = await this.strapiService.updateEntryCollection(
      'github-users',
      strapiId,
      data,
    );

    return this.strapiService.formatDeepSingleData(
      strapiResponse.data,
    ) as GithubUser;
  }

  private encrypt(text: string): string {
    return AES.encrypt(text, 'mySuperKey').toString();
  }

  private decrypt(ciphertext: string): any {
    return AES.decrypt(ciphertext, 'mySuperKey').toString(enc?.Utf8);
  }
}
