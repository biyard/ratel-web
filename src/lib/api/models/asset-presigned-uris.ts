import { FileType } from './file-type'; // FileType enum이 정의된 파일에서 import

export interface AssetPresignedUris {
  presigned_uris: string[];
  uris: string[];
  total_count: number;
  file_type: FileType;
}
