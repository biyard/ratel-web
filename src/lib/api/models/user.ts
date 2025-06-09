import { Team } from './team';

export interface User {
  id: number;
  created_at: number;
  updated_at: number;

  nickname: string;
  principal: string;
  email: string;
  profile_url?: string;

  term_agreed: boolean;
  informed_agreed: boolean;

  user_type: UserType;
  parent_id?: number;
  username: string;

  groups: Group[];
  teams: Team[];
  badges: Badge[];

  html_contents: string;
}

export enum UserType {
  Individual = 1,
  Team = 2,
  Bot = 3,
  Anonymous = 99,
}

export interface Badge {
  id: number;
  created_at: number;
  updated_at: number;

  creator_id: number;

  name: string;
  scope: Scope;
  image_url: string;

  contract?: string;
  token_id?: number;
}

export enum Scope {
  Global = 1,
  Space = 2,
  Team = 3,
}
export interface Group {
  id: number;
  created_at: number;
  updated_at: number;

  name: string;
  user_id: number;

  permissions: number;
}

export interface UserEditProfileRequest {
  edit_profile: {
    nickname: string;
    html_contents: string;
    profile_url: string;
  };
}

export function userEditProfileRequest(
  nickname: string,
  html_contents: string,
  profile_url: string,
): UserEditProfileRequest {
  return {
    edit_profile: {
      nickname,
      html_contents,
      profile_url,
    },
  };
}
