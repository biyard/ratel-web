'use client';

import { Question } from '@/lib/api/models/survey';
import React, { useMemo } from 'react';
import SurveyQuestionEditor from './question/survey_question_editor';
import { AnswerType } from './question/answer_type_select';
import { v4 as uuidv4 } from 'uuid';
import SurveyViewer from './question/survey_viewer';

export interface SpaceSurveyProps {
  isEdit?: boolean;
  questions: Question[];
  onadd: (question: Question) => void;
  onupdate: (
    index: number,
    updated: { answerType: AnswerType; title: string; options?: string[] },
  ) => void;
  onremove: (index: number) => void;
}

export default function SpaceSurvey({
  isEdit = false,
  questions,
  onadd,
  onupdate,
  onremove,
}: SpaceSurveyProps) {
  return (
    <div className="flex flex-col w-full">
      {isEdit ? (
        <EditableSurvey
          questions={questions}
          onadd={() => {
            onadd({
              answer_type: 'short_answer',
              title: '',
              description: '',
            });
          }}
          onupdate={onupdate}
          onremove={onremove}
        />
      ) : (
        <ViewSurvey questions={questions} />
      )}
    </div>
  );
}

function ViewSurvey({ questions }: { questions: Question[] }) {
  return <SurveyViewer questions={questions} />;
}

function EditableSurvey({
  questions,
  onadd,
  onupdate,
  onremove,
}: {
  questions: Question[];
  onadd: () => void;
  onupdate: (
    index: number,
    updated: { answerType: AnswerType; title: string; options?: string[] },
  ) => void;
  onremove: (index: number) => void;
}) {
  const stableKeys = useMemo(() => questions.map(() => uuidv4()), [questions]);

  return (
    <div className="flex flex-col w-full gap-2.5">
      {questions.map((question, index) => {
        return (
          <div key={stableKeys[index]}>
            <SurveyQuestionEditor
              index={index}
              answerType={question.answer_type}
              title={question.title}
              options={'options' in question ? question.options : []}
              onupdate={(updated) => {
                onupdate(index, {
                  answerType: updated.answerType,
                  title: updated.title,
                  options: updated.options ?? [],
                });
              }}
              onremove={(index: number) => {
                onremove(index);
              }}
            />
          </div>
        );
      })}
      <div
        onClick={() => {
          onadd();
        }}
        className="bg-transparent border-2 border-dashed border-neutral-700 rounded-md h-50 flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800 transition gap-[10px]"
      >
        <div className="flex flex-row w-[45px] h-[45px] justify-center items-center rounded-full border border-neutral-500">
          <Add className="w-5 h-5 stroke-neutral-500 text-neutral-500" />
        </div>
        <span className=" text-neutral-500 font-medium text-base">
          Add New Question
        </span>
      </div>
    </div>
  );
}

// function ViewSurvey({}: { questions: Question[] }) {
//   return <div>view surveys</div>;
// }

export function Add(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.375 7.5L7.5 7.5M7.5 7.5L10.625 7.5M7.5 7.5V4.375M7.5 7.5L7.5 10.625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
