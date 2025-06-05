import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useSend } from '../useSend';
import { QK_ASSETS_GET_PRESIGNED_URL } from '@/constants';
import { ratelApi } from '../ratel_api';
import { FileType } from '../models/file-type';
import { AssetPresignedUris } from '../models/asset-presigned-uris';

export function getPresignedUrl(
  file_type: FileType,
): UseQueryResult<AssetPresignedUris | undefined> {
  const send = useSend();

  return useQuery({
    queryKey: [QK_ASSETS_GET_PRESIGNED_URL],
    queryFn: () => send(ratelApi.assets.getPresignedUrl(file_type)),
    refetchOnWindowFocus: false,
  });
}
