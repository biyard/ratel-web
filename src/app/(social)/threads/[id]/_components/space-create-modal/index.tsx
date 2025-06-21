/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';

import { usePopup } from '@/lib/contexts/popup-service';
import InviteCommittee from './invite-committee';
import SelectSpaceForm from './select-space-form';

export default function SpaceCreateModal({ feed_id }: { feed_id: number }) {
  const popup = usePopup();
  const [user_ids, setUserIds] = useState<number[]>([]);
  const [status, setStatus] = useState<
    'invite_committee' | 'select_space_form'
  >('invite_committee');

  useEffect(() => {
    popup.withTitle(
      status === 'invite_committee'
        ? 'Invite Committee'
        : 'Select a Space Form',
    );
  }, [status]);

  const handleUserIds = (user_ids: number[]) => {
    setUserIds(user_ids);
    setStatus('select_space_form');
  };
  return (
    <div className="mobile:w-[400px] max-mobile:w-full ">
      {status === 'invite_committee' && (
        <InviteCommittee onSend={handleUserIds} />
      )}
      {status === 'select_space_form' && (
        <SelectSpaceForm user_ids={user_ids} feed_id={feed_id} />
      )}
    </div>
  );
}
