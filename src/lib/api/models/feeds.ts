export interface Feed {
  id: number;
  created_at: number;
  updated_at: number;

  html_contents: string;

  feed_type: FeedType;

  user_id: number;
  industry_id: number;

  proposer_name?: string | null;
  profile_image?: string | null;

  parent_id?: number | null;
  title?: string | null;
  part_id?: number | null;
  quote_feed_id?: number | null;

  likes: number;
  comments: number;

  files: File[];
  rewards: number;
  shares: number;
}

export enum FeedType {
  Post = 1,
  Reply = 2,
  Repost = 3,
  DocReview = 4,
}

export interface File {
  name: string;
  size: string;
  ext: FileExtension;
  url?: string | null;
}

export enum FileExtension {
  JPG = 1,
  PNG = 2,
  PDF = 3,
  ZIP = 4,
  WORD = 5,
  PPTX = 6,
  EXCEL = 7,
}

export const FileExtensionLabel: Record<
  FileExtension,
  { ko: string; en: string }
> = {
  [FileExtension.JPG]: { ko: 'JPG', en: 'JPG' },
  [FileExtension.PNG]: { ko: 'PNG', en: 'PNG' },
  [FileExtension.PDF]: { ko: 'PDF', en: 'PDF' },
  [FileExtension.ZIP]: { ko: 'ZIP', en: 'ZIP' },
  [FileExtension.WORD]: { ko: 'WORD', en: 'WORD' },
  [FileExtension.PPTX]: { ko: 'PPTX', en: 'PPTX' },
  [FileExtension.EXCEL]: { ko: 'EXCEL', en: 'EXCEL' },
};
