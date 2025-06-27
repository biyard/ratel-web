'use client';

import React, { useEffect, useState } from 'react';
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
import {
  postingSpaceRequest,
  spaceUpdateRequest,
} from '@/lib/api/models/spaces';
import { showErrorToast, showSuccessToast } from '@/lib/toast';
import { logger } from '@/lib/logger';
import { checkString } from '@/lib/string-filter-utils';
import { DiscussionCreateRequest } from '@/lib/api/models/discussion';
import { ElearningCreateRequest } from '@/lib/api/models/elearning';
import { SurveyCreateRequest } from '@/lib/api/models/survey';
import { SpaceDraftCreateRequest } from '@/lib/api/models/space_draft';
import { useRouter } from 'next/navigation';
import { Answer, surveyResponseCreateRequest } from '@/lib/api/models/response';
import { TotalUser, UserType } from '@/lib/api/models/user';

export const DeliberationTab = {
  SUMMARY: 'Summary',
  DELIBERATION: 'Deliberation',
  POLL: 'Poll',
  RECOMMANDATION: 'Recommandation',
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

export interface SurveyAnswer {
  answers: Answer[];
  is_completed: boolean;
}

export interface FinalConsensus {
  drafts: SpaceDraftCreateRequest[];
}

export interface DiscussionInfo {
  started_at: number;
  ended_at: number;
  name: string;
  description: string;

  participants: TotalUser[];
}

export interface Deliberation {
  discussions: DiscussionInfo[];
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
    DeliberationTab.SUMMARY,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(space.title ?? '');
  const [startedAt, setStartedAt] = useState(
    changeStartedAt(Math.floor(space.started_at ?? Date.now() / 1000)),
  );
  const [endedAt, setEndedAt] = useState(
    changeEndedAt(Math.floor(space.ended_at ?? Date.now() / 1000)),
  );
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
      participants: disc.members.map((member) => ({
        id: member.id,
        created_at: member.created_at,
        updated_at: member.updated_at,
        nickname: member.nickname,
        username: member.username,
        email: member.email,
        profile_url: member.profile_url ?? '',
        user_type: UserType.Individual,
      })),
    })),

    elearnings: space.elearnings.map((elearning) => ({
      files: elearning.files,
    })),
  });
  const [survey, setSurvey] = useState<Poll>({
    surveys: space.surveys.map((survey) => ({
      started_at: changeStartedAt(survey.started_at),
      ended_at: changeEndedAt(survey.ended_at),
      questions: survey.questions,
    })),
  });

  const [answer, setAnswer] = useState<SurveyAnswer>({
    answers:
      space.user_responses.length != 0 ? space.user_responses[0].answers : [],
    is_completed: space.user_responses.length != 0,
  });

  const [draft, setDraft] = useState<FinalConsensus>({
    drafts: space.drafts.map((draft) => ({
      title: draft.title,
      html_contents: draft.html_contents,
      files: draft.files,
    })),
  });

  useEffect(() => {
    if (space.user_responses && space.user_responses.length > 0) {
      setAnswer({
        answers: space.user_responses[0].answers,
        is_completed: true,
      });
    }
  }, [space.user_responses]);

  const discussions = space.discussions;

  logger.debug('startedAt: ', startedAt, 'endedAt: ', endedAt);
  logger.debug('deliberation: ', deliberation);

  const handlePostingSpace = async () => {
    await post(
      ratelApi.spaces.getSpaceBySpaceId(spaceId),
      postingSpaceRequest(),
    );
  };

  const handleUpdate = async (
    title: string,
    started_at: number,
    ended_at: number,
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
        started_at,
        ended_at,
      ),
    );
  };

  return (
    <div className="flex flex-row w-full gap-5">
      {selectedType == DeliberationTab.SUMMARY ? (
        <ThreadPage
          title={title}
          status={space.status}
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
          status={space.status}
          deliberation={deliberation}
          discussions={discussions}
          setTitle={(t: string) => {
            setTitle(t);
          }}
          setDeliberation={(d: Deliberation) => {
            console.log('deliberation: ', d);
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
          status={space.status}
          survey={survey}
          startDate={startedAt}
          endDate={endedAt}
          answer={answer}
          setAnswers={(answers: Answer[]) => {
            setAnswer((prev) => ({
              ...prev,
              answers,
            }));
          }}
          setStartDate={(startDate: number) => {
            setStartedAt(Math.floor(startDate));
          }}
          setEndDate={(endDate: number) => {
            setEndedAt(Math.floor(endDate));
          }}
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
          onsend={async () => {
            try {
              await post(
                ratelApi.responses.respond_answer(spaceId),
                surveyResponseCreateRequest(answer.answers),
              );
              showSuccessToast('Your response has been saved successfully.');
              data.refetch();
            } catch (err) {
              showErrorToast(
                'There was a problem saving your response. Please try again later.',
              );
              logger.error('failed to create response with error: ', err);
            }
          }}
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
          status={space.status}
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
        status={space.status}
        selectedType={selectedType}
        setSelectedType={(tab: DeliberationTabType) => {
          setSelectedType(tab);
        }}
        isEdit={isEdit}
        postingSpace={async () => {
          try {
            await handlePostingSpace();
            data.refetch();

            showSuccessToast('Your space has been posted successfully.');
          } catch (err) {
            showErrorToast('Failed to post the space. Please try again.');
            logger.error('failed to posting space with error: ', err);
          }
        }}
        onedit={() => {
          setIsEdit(true);
        }}
        onsave={async () => {
          if (checkString(title) || checkString(thread.html_contents)) {
            showErrorToast(
              'Please remove any test-related keywords before saving.',
            );
            setIsEdit(false);
            return;
          }

          const discussions = deliberation.discussions.map((disc) => ({
            started_at: disc.started_at,
            ended_at: disc.ended_at,
            name: disc.name,
            description: disc.description,
            participants: disc.participants.map((member) => member.id),
          }));

          try {
            await handleUpdate(
              title,
              startedAt,
              endedAt,
              thread.html_contents,
              thread.files,
              discussions,
              deliberation.elearnings,
              survey.surveys,
              draft.drafts,
            );
            data.refetch();

            showSuccessToast('Space has been updated successfully.');
            setIsEdit(false);
          } catch (err) {
            showErrorToast('Failed to update the space. Please try again.');
            logger.error('failed to update space with error: ', err);
            setIsEdit(false);
          }
        }}
      />
    </div>
  );
}

function changeStartedAt(timestamp: number) {
  const date = new Date(timestamp * 1000);
  date.setUTCHours(0, 0, 0, 0);
  const newDate = Math.floor(date.getTime() / 1000);
  return newDate;
}

function changeEndedAt(timestamp: number) {
  const date = new Date(timestamp * 1000);
  date.setUTCHours(23, 59, 59, 0);
  const newDate = Math.floor(date.getTime() / 1000);
  return newDate;
}
