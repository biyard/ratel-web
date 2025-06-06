import { FileType } from './models/file-type';

export const ratelApi = {
  users: {
    getUserInfo: () => '/v1/users?action=user-info',
  },
  assets: {
    getPresignedUrl: (file_type: FileType) =>
      `/v1/assets?action=get-presigned-uris&file-type=${file_type}&total-count=1`,
  },
};
