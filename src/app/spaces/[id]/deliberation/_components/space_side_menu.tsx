'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { getTimeWithFormat } from '@/lib/time-utils';
import React, { useState } from 'react';
import Clock from '@/assets/icons/clock.svg';
import { BottomTriangle, Discuss, Edit1 } from '@/components/icons';
import { File, Vote, CheckCircle } from 'lucide-react';
import { DeliberationTab, DeliberationTabType } from '../page.client';
import CalendarDayPicker from '@/components/calendar-picker/calendar';

export default function SpaceSideMenu({
  spaceId,
  selectedType,
  setSelectedType,
  setStartDate,
  setEndDate,
  isEdit,
  onedit,
  onsave,
}: {
  spaceId: number;
  selectedType: DeliberationTabType;
  setSelectedType: (tab: DeliberationTabType) => void;
  setStartDate: (startedAt: number) => void;
  setEndDate: (endedAt: number) => void;
  isEdit: boolean;
  onedit: () => void;
  onsave: () => void;
}) {
  const { data: space } = useSpaceBySpaceId(spaceId);
  const created_at = space.created_at;
  const [startAt, setStartAt] = useState<Date>(() =>
    space.started_at ? new Date(space.started_at * 1000) : new Date(),
  );
  const [endedAt, setEndedAt] = useState<Date>(() =>
    space.ended_at ? new Date(space.ended_at * 1000) : new Date(),
  );
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col max-w-[250px] max-tablet:!hidden w-full gap-[10px]">
      <EditSplitButton isEdit={isEdit} onedit={onedit} onsave={onsave} />
      <BlackBox>
        <div className="flex flex-col gap-2.5 w-full">
          <div
            className={`cursor-pointer flex flex-row w-full gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.THREAD ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.THREAD);
            }}
          >
            <File className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Thread</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.DELIBERATION ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.DELIBERATION);
            }}
          >
            <Discuss className="w-5 h-5" />
            <div className="font-bold text-white text-sm">Deliberation</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.POLL ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.POLL);
            }}
          >
            <Vote className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Poll</div>
          </div>

          <div
            className={`cursor-pointer flex flex-row gap-1 items-center px-1 py-2 rounded-sm ${selectedType == DeliberationTab.FINAL ? 'bg-neutral-800' : ''}`}
            onClick={() => {
              setSelectedType(DeliberationTab.FINAL);
            }}
          >
            <CheckCircle className="[&>path]:stroke-neutral-80 w-5 h-5" />
            <div className="font-bold text-white text-sm">Final Consensus</div>
          </div>
        </div>
      </BlackBox>
      <BlackBox>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-row gap-1 items-center">
            <Clock width={20} height={20} />
            <div className="font-bold text-neutral-500 text-sm/[14px]">
              Timeline
            </div>
          </div>

          <div className="flex flex-col w-full gap-[6px]">
            <div className="font-medium text-white text-[15px]/[12px]">
              Created
            </div>
            <div className="font-medium text-neutral-80 text-xs/[12px]">
              {getTimeWithFormat(created_at)}
            </div>
          </div>

          <div
            className="relative flex flex-col w-full gap-[6px] cursor-pointer"
            onClick={() => {
              if (!isEdit) {
                return;
              }
              setStartCalendarOpen((prev) => !prev);
              setEndCalendarOpen(false);
            }}
          >
            <div className="font-medium text-white text-[15px]/[12px]">
              Start
            </div>
            <div className="font-medium text-neutral-80 text-xs/[12px]">
              {getTimeWithFormat(startAt.getTime() / 1000)}
            </div>

            {isEdit && startCalendarOpen && (
              <div className="absolute right-0 mt-7 z-10 bg-white text-black rounded-xl shadow-xl p-4">
                <CalendarDayPicker
                  value={startAt.getTime()}
                  onChange={(date) => {
                    if (date) {
                      setStartAt(date);
                      setStartDate(date.getTime() / 1000);
                      setStartCalendarOpen(false);
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div
            className="relative flex flex-col w-full gap-[6px] cursor-pointer"
            onClick={() => {
              if (!isEdit) {
                return;
              }
              setEndCalendarOpen((prev) => !prev);
              setStartCalendarOpen(false);
            }}
          >
            <div className="font-medium text-white text-[15px]/[12px]">End</div>
            <div className="font-medium text-neutral-80 text-xs/[12px]">
              {getTimeWithFormat(endedAt.getTime() / 1000)}
            </div>

            {isEdit && endCalendarOpen && (
              <div className="absolute right-0 mt-7 z-10 bg-white text-black rounded-xl shadow-xl p-4">
                <CalendarDayPicker
                  value={endedAt.getTime()}
                  onChange={(date) => {
                    if (date) {
                      setEndedAt(date);
                      setEndDate(date.getTime() / 1000);
                      setEndCalendarOpen(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </BlackBox>
    </div>
  );
}

function EditSplitButton({
  isEdit,
  onedit,
  onsave,
}: {
  isEdit: boolean;
  onedit: () => void;
  onsave: () => void;
}) {
  return (
    <div className="flex items-center rounded-full overflow-hidden w-full h-[46px] gap-2">
      {/* Left "Edit" Button */}
      <button
        className="flex items-center justify-start flex-row w-full bg-white text-black px-4 py-3 gap-1 rounded-l-[100px] rounded-r-[4px]"
        onClick={() => {
          if (isEdit) {
            onsave();
          } else {
            onedit();
          }
        }}
      >
        <Edit1 className="w-[18px] h-[18px]" />
        {isEdit ? (
          <span className="font-bold text-neutral-900 text-base/[22px]">
            Save
          </span>
        ) : (
          <span className="font-bold text-neutral-900 text-base/[22px]">
            Edit
          </span>
        )}
      </button>

      {/* Right Dropdown Button */}
      <button className="w-[48px] h-full flex items-center justify-center bg-neutral-500 rounded-r-[100px] rounded-l-[4px]">
        <BottomTriangle />
      </button>
    </div>
  );
}
