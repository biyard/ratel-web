import { Button } from '@/components/ui/button';
import { Col } from '@/components/ui/col';
import { Input } from '@/components/ui/input';
import { Row } from '@/components/ui/row';
import { Textarea } from '@/components/ui/textarea';
import { usePopup } from '@/lib/contexts/popup-service';
import { logger } from '@/lib/logger';
import React from 'react';

export default function TeamCreationPopup() {
  const popup = usePopup();

  return (
    <div className="w-100 max-tablet:w-full flex flex-col gap-10 items-center">
      <div className="w-40 h-40 rounded-full bg-c-wg-80 text-sm font-semibold flex items-center justify-center text-c-wg-50">
        Upload logo
      </div>

      <Col className="w-full gap-2.5">
        <Input type="text" name="team_name" placeholder="Team name" />
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
