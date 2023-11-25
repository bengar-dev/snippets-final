export interface GithubProfil {
  id: string;
  displayName?: string;
  username: string;
  profileUrl: string;
  photos: Array<{ value: string }>;
  _json: {
    login: string;
    id: number;
    avatar_url: string;
    created_at: string;
    updated_at: string;
  };
}

export interface GithubUser {
  githubId: string;
  displayName?: string;
  username: string;
  profileUrl: string;
  avatarUrl?: string;
  accessToken: string;
  refreshToken: string;
}

export interface GithubUserResponse extends GithubUser {
  id: number;
}
