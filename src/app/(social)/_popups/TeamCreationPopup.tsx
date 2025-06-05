import { Button } from '@/components/ui/button';
import { Col } from '@/components/ui/col';
import { Input } from '@/components/ui/input';
import { Row } from '@/components/ui/row';
import { Textarea } from '@/components/ui/textarea';
import { ratelApi } from '@/lib/api/ratel_api';
import { useSend } from '@/lib/api/useSend';
import { usePopup } from '@/lib/contexts/popup-service';
import { getFileType } from '@/lib/file-utils';
import { logger } from '@/lib/logger';
import React, { useRef, useState } from 'react';

export default function TeamCreationPopup() {
  const popup = usePopup();
  const send = useSend();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleUpload = async () => {
    inputRef.current?.click(); // 파일 선택창 열기
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      logger.debug('No file selected');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    const fileType = getFileType(file);
    logger.debug('FileType:', fileType);

    const res = await send(ratelApi.assets.getPresignedUrl(fileType));
    logger.debug('Presigned URL response:', res);
    /* const url = URL.createObjectURL(file); */
    /* setPreviewUrl(url); */
    /* logger.debug('Selected logo file:', file.name); */
    // 필요시 FormData 로 업로드 가능
  };

  return (
    <div className="w-100 max-tablet:w-full flex flex-col gap-10 items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className="w-40 h-40 rounded-full bg-c-wg-80 text-sm font-semibold flex items-center justify-center text-c-wg-50"
        onClick={handleUpload}
      >
        Upload logo
      </div>

      <Col className="w-full gap-2.5">
        <Input type="text" name="team_name" placeholder="Team display name" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
            @
          </span>
          <Input
            type="text"
            name="username"
            className="pl-8"
            placeholder="Team ID (ex. biyard)"
          />
        </div>
        <Textarea placeholder="Please type description of your team." />
      </Col>
      <Row className="w-full grid grid-cols-2">
        <Button
          variant="rounded_secondary"
          className="w-full"
          onClick={() => popup.close()}
        >
          Cancel
        </Button>
        <Button
          variant="rounded_primary"
          className="w-full"
          onClick={() => {
            logger.debug('Team creation button clicked');
            popup.close();
          }}
        >
          Create
        </Button>
      </Row>
    </div>
  );
}
