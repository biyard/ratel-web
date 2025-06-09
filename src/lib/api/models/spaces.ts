import { FileInfo } from './feeds';

export interface Space {
  id: number;
  created_at: number;
  updated_at: number;
  title?: string;
  html_contents: string;
  space_type: SpaceType;
  user_id: number;
  industry_id: number;
  feed_id: number;
  author: Author[];
  status: SpaceStatus;
  files: FileInfo[];
}

export interface Author {
  id: number;
  nickname: string;
  principal: string;
  email: string;
  profile_url: string;
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
