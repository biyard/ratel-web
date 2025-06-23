'use client';

import React, { useState } from 'react';
import SpaceSideMenu from './_components/space_side_menu';
import { useParams } from 'next/navigation';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import ThreadPage from './_components/thread';
import DeliberationPage from './_components/deliberation';
import PollPage from './_components/poll';
import FinalConsensusPage from './_components/final_consensus';
import { FileInfo } from '@/lib/api/models/feeds';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { spaceUpdateRequest } from '@/lib/api/models/spaces';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { logger } from '@/lib/logger';
import { checkString } from '@/lib/string-filter-utils';
import { DiscussionCreateRequest } from '@/lib/api/models/discussion';
import { ElearningCreateRequest } from '@/lib/api/models/elearning';
import { SurveyCreateRequest } from '@/lib/api/models/survey';
import { SpaceDraftCreateRequest } from '@/lib/api/models/space_draft';
import { useRouter } from 'next/navigation';

export const DeliberationTab = {
  THREAD: 'Thread',
  DELIBERATION: 'Deliberation',
  POLL: 'Poll',
  FINAL: 'Final Consensus',
} as const;

export type DeliberationTabType =
  (typeof DeliberationTab)[keyof typeof DeliberationTab];

export interface Thread {
  html_contents: string;
  files: FileInfo[];
}

export interface Poll {
  surveys: SurveyCreateRequest[];
}

export interface FinalConsensus {
  drafts: SpaceDraftCreateRequest[];
}

export interface Deliberation {
  discussions: DiscussionCreateRequest[];
  elearnings: ElearningCreateRequest[];
}

export default function SpaceByIdPage() {
  const { post } = useApiCall();
  const params = useParams();
  const spaceId = Number(params.id);
  const data = useSpaceBySpaceId(spaceId);
  const router = useRouter();
  const space = data.data;
  const [selectedType, setSelectedType] = useState<DeliberationTabType>(
    DeliberationTab.THREAD,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(space.title ?? '');
  const [thread, setThread] = useState<Thread>({
    html_contents: space.html_contents ?? '',
    files: space.files ?? [],
  });
  const [deliberation, setDeliberation] = useState<Deliberation>({
    discussions: space.discussions.map((disc) => ({
      started_at: disc.started_at,
      ended_at: disc.ended_at,
      name: disc.name,
      description: disc.description,
    })),

    elearnings: space.elearnings.map((elearning) => ({
      files: elearning.files,
    })),
  });
  const [survey, setSurvey] = useState<Poll>({
    surveys: space.surveys.map((survey) => ({
      started_at: survey.started_at,
      ended_at: survey.ended_at,
      questions: survey.questions,
    })),
  });

  const [draft, setDraft] = useState<FinalConsensus>({
    drafts: space.drafts.map((draft) => ({
      title: draft.title,
      html_contents: draft.html_contents,
      files: draft.files,
    })),
  });

  logger.debug('deliberation: ', deliberation);

  const handleUpdate = async (
    title: string,
    html_contents: string,
    files: FileInfo[],
    discussions: DiscussionCreateRequest[],
    elearnings: ElearningCreateRequest[],
    surveys: SurveyCreateRequest[],
    drafts: SpaceDraftCreateRequest[],
  ) => {
    await post(
      ratelApi.spaces.getSpaceBySpaceId(spaceId),
      spaceUpdateRequest(
        html_contents,
        files,
        discussions,
        elearnings,
        surveys,
        drafts,
        title,
      ),
    );
  };

  return (
    <div className="flex flex-row w-full gap-5">
      {selectedType == DeliberationTab.THREAD ? (
        <ThreadPage
          title={title}
          thread={thread}
          setThread={(t: Thread) => {
            setThread(t);
          }}
          setTitle={(t: string) => {
            setTitle(t);
          }}
          isEdit={isEdit}
          userType={space.author[0].user_type ?? 0}
          proposerImage={space.author[0].profile_url ?? ''}
          proposerName={space.author[0].nickname ?? ''}
          createdAt={space?.created_at}
          onback={() => {
            if (isEdit) {
              setIsEdit(false);
              data.refetch();
            } else {
              router.back();
            }
          }}
        />
      ) : selectedType == DeliberationTab.DELIBERATION ? (
        <DeliberationPage
          title={title}
          deliberation={deliberation}
          setTitle={(t: string) => {
            setTitle(t);
          }}
          setDeliberation={(d: Deliberation) => {
            setDeliberation(d);
          }}
          isEdit={isEdit}
          userType={space.author[0].user_type ?? 0}
          proposerImage={space.author[0].profile_url ?? ''}
          proposerName={space.author[0].nickname ?? ''}
          createdAt={space?.created_at}
          onback={() => {
            if (isEdit) {
              setIsEdit(false);
              data.refetch();
            } else {
              router.back();
            }
          }}
        />
      ) : selectedType == DeliberationTab.POLL ? (
        <PollPage
          title={title}
          survey={survey}
          setTitle={(t: string) => {
            setTitle(t);
          }}
          setSurvey={(d: Poll) => {
            setSurvey(d);
          }}
          isEdit={isEdit}
          userType={space.author[0].user_type ?? 0}
          proposerImage={space.author[0].profile_url ?? ''}
          proposerName={space.author[0].nickname ?? ''}
          createdAt={space?.created_at}
          onback={() => {
            if (isEdit) {
              setIsEdit(false);
              data.refetch();
            } else {
              router.back();
            }
          }}
        />
      ) : (
        <FinalConsensusPage
          title={title}
          draft={draft}
          setTitle={(t: string) => {
            setTitle(t);
          }}
          setDraft={(d: FinalConsensus) => {
            setDraft(d);
          }}
          isEdit={isEdit}
          userType={space.author[0].user_type ?? 0}
          proposerImage={space.author[0].profile_url ?? ''}
          proposerName={space.author[0].nickname ?? ''}
          createdAt={space?.created_at}
          onback={() => {
            if (isEdit) {
              setIsEdit(false);
              data.refetch();
            } else {
              router.back();
            }
          }}
        />
      )}
      <SpaceSideMenu
        spaceId={spaceId}
        selectedType={selectedType}
        setSelectedType={(tab: DeliberationTabType) => {
          setSelectedType(tab);
        }}
        isEdit={isEdit}
        onedit={() => {
          setIsEdit(true);
        }}
        onsave={async () => {
          if (checkString(title) || checkString(thread.html_contents)) {
            showErrorToast('Please remove the test keyword');
            setIsEdit(false);
            return;
          }

          try {
            await handleUpdate(
              title,
              thread.html_contents,
              thread.files,
              deliberation.discussions,
              deliberation.elearnings,
              survey.surveys,
              draft.drafts,
            );
            data.refetch();

            showSuccessToast('success to update space');
            setIsEdit(false);
          } catch (err) {
            showErrorToast('failed to update space');
            logger.error('failed to update space with error: ', err);
            setIsEdit(false);
          }
        }}
      />
    </div>
  );
}
