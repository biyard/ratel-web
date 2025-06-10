import { Badge } from './badge';
import { SpaceComment } from './comments';
import { FileInfo } from './feeds';
import { UserType } from './user';

export interface Space {
  id: number;
  created_at: number;
  updated_at: number;
  title?: string;
  html_contents: string;
  space_type: SpaceType;
  owner_id: number;
  industry_id: number;
  feed_id: number;
  author: Author[];
  status: SpaceStatus;
  files: FileInfo[];

  badges: Badge[];
  feed_comments: SpaceComment[];
}

export interface Author {
  id: number;
  nickname: string;
  principal: string;
  email: string;
  profile_url: string;

  user_type: UserType;
}

export enum SpaceType {
  Legislation = 1,
  Poll = 2,
  Deliberation = 3,
  Nft = 4,
  Commitee = 5,
}

export enum SpaceStatus {
  Draft = 1,
  InProgress = 2,
  Finish = 3,
}
