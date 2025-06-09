import { FileInfo } from './feeds';

export interface Space {
  id: number;
  created_at: number;
  updated_at: number;
  title?: string;
  html_contents: string;
  space_type: SpaceType;
  status: SpaceStatus;
  files: FileInfo[];
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
