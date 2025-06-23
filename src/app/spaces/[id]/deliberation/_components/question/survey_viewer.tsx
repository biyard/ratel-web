import React, { useState } from 'react';
import BlackBox from '@/app/(social)/_components/black-box';
import CustomCheckbox from '@/components/checkbox/custom-checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Question {
  title: string;
  answer_type:
    | 'single_choice'
    | 'multiple_choice'
    | 'short_answer'
    | 'subjective';
  options?: string[];
}

export default function SurveyViewer({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, string[] | string>>({});

  const handleSelect = (
    qIdx: number,
    option: string,
    type: Question['answer_type'],
  ) => {
    setAnswers((prev) => {
      const current = prev[qIdx] ?? (type === 'multiple_choice' ? [] : '');

      if (type === 'single_choice') {
        return { ...prev, [qIdx]: option };
      } else if (type === 'multiple_choice') {
        const selected = current as string[];
        const exists = selected.includes(option);
        const updated = exists
          ? selected.filter((v) => v !== option)
          : [...selected, option];
        return { ...prev, [qIdx]: updated };
      }
      return prev;
    });
  };

  const handleInput = (qIdx: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: value }));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {questions.map((q, index) => (
        <BlackBox key={index}>
          <div className="flex flex-col w-full gap-[10px]">
            {(q.answer_type === 'single_choice' ||
              q.answer_type === 'multiple_choice') && (
              <>
                <div className="flex flex-row w-full mt-[7px] mb-[15px] font-semibold text-base/[22.5px] text-white gap-[4px]">
                  <div className="text-[#51a2ff]">
                    {q.answer_type === 'single_choice'
                      ? '[Single Choice]'
                      : '[Multiple Choice]'}
                  </div>
                  <div>{q.title}</div>
                </div>
                <div className="flex flex-col gap-2">
                  {q.options?.map((opt, idx) => {
                    const selected = answers[index];
                    const isChecked =
                      q.answer_type === 'single_choice'
                        ? selected === opt
                        : Array.isArray(selected) && selected.includes(opt);
                    return (
                      <div
                        key={`${q.answer_type}-${index}-${idx}`}
                        className="flex flex-col w-full gap-[10px]"
                      >
                        <div className="flex flex-row w-full h-fit justify-start items-center gap-[12px]">
                          <div className="w-[18px] h-[18px]">
                            <CustomCheckbox
                              key={idx}
                              checked={isChecked}
                              onChange={() =>
                                handleSelect(index, opt, q.answer_type)
                              }
                            />
                          </div>
                          <div className="font-normal text-neutral-300 text-[15px]/[22.5px]">
                            {opt}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {q.answer_type === 'short_answer' && (
              <div className="flex flex-col w-full gap-[10px]">
                <div className="flex flex-row w-full mt-[7px] mb-[15px] font-semibold text-base/[22.5px] text-white gap-[4px]">
                  <div className="text-[#ff6467]">[Required]</div>
                  <div>{q.title}</div>
                </div>
                <Input
                  type="text"
                  placeholder="Please share your opinion."
                  className="bg-neutral-800 border border-neutral-700 text-base text-white placeholder:text-neutral-600 px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={
                    typeof answers[index] === 'string'
                      ? (answers[index] as string)
                      : ''
                  }
                  onChange={(e) => handleInput(index, e.target.value)}
                />
              </div>
            )}

            {q.answer_type === 'subjective' && (
              <div className="flex flex-col w-full gap-[10px]">
                <div className="flex flex-row w-full mt-[7px] mb-[15px] font-semibold text-base/[22.5px] text-white gap-[4px]">
                  <div className="text-[#ff6467]">[Required]</div>
                  <div>{q.title}</div>
                </div>
                <Textarea
                  rows={7}
                  placeholder="Please share your opinion."
                  className="bg-neutral-800 min-h-[185px] border border-neutral-700 text-base text-white placeholder:text-neutral-600 px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={
                    typeof answers[index] === 'string'
                      ? (answers[index] as string)
                      : ''
                  }
                  onChange={(e) => handleInput(index, e.target.value)}
                />
              </div>
            )}
          </div>
        </BlackBox>
      ))}
    </div>
  );
}
