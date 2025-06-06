import { UserType, Group } from './user';

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

  html_contents: string;
}
