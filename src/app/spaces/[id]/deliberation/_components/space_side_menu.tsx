'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import { useSpaceBySpaceId } from '@/app/(social)/_hooks/use-spaces';
import { getTimeWithFormat } from '@/lib/time-utils';
import React, { useEffect, useRef, useState } from 'react';
import Clock from '@/assets/icons/clock.svg';
import { BottomTriangle, Discuss, Edit1 } from '@/components/icons';
import { File, Vote, CheckCircle } from 'lucide-react';
import { DeliberationTab, DeliberationTabType } from '../page.client';
import CalendarDayPicker from '@/components/calendar-picker/calendar';
import { SpaceStatus } from '@/lib/api/models/spaces';

export default function SpaceSideMenu({
  spaceId,
  selectedType,
  setSelectedType,
  setStartDate,
  setEndDate,
  isEdit,
  postingSpace,
  onedit,
  onsave,
}: {
  spaceId: number;
  selectedType: DeliberationTabType;
  setSelectedType: (tab: DeliberationTabType) => void;
  setStartDate: (startedAt: number) => void;
  setEndDate: (endedAt: number) => void;
  isEdit: boolean;
  postingSpace: () => void;
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
      {space.status != SpaceStatus.InProgress && (
        <EditSplitButton
          isEdit={isEdit}
          postingSpace={postingSpace}
          onedit={onedit}
          onsave={onsave}
        />
      )}
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
  postingSpace,
  onedit,
  onsave,
}: {
  isEdit: boolean;
  postingSpace: () => void;
  onedit: () => void;
  onsave: () => void;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center w-full h-[46px] gap-2">
      {/* Left "Edit" Button */}
      <button
        className="flex items-center justify-start flex-row w-full bg-white hover:bg-neutral-300 text-black px-4 py-3 gap-1 rounded-l-[100px] rounded-r-[4px]"
        onClick={() => {
          if (isEdit) {
            onsave();
          } else {
            onedit();
          }
        }}
      >
        <Edit1 className="w-[18px] h-[18px]" />
        <span className="font-bold text-neutral-900 text-base/[22px]">
          {isEdit ? 'Save' : 'Edit'}
        </span>
      </button>

      {/* Right Dropdown Toggle */}
      <div className="relative h-full" ref={popupRef}>
        <button
          className="w-[48px] h-full flex items-center justify-center bg-neutral-500 rounded-r-[100px] rounded-l-[4px]"
          onClick={() => setShowPopup((prev) => !prev)}
        >
          <BottomTriangle />
        </button>

        {/* Pop-up Menu */}
        {showPopup && (
          <div
            className="absolute top-full right-0 mt-2 px-4 py-2 min-w-[150px] bg-white hover:bg-neutral-300 text-black rounded shadow-lg text-sm cursor-pointer whitespace-nowrap z-50"
            onClick={() => {
              console.log('Posting API called');
              postingSpace();
              setShowPopup(false);
            }}
          >
            Posting
          </div>
        )}
      </div>
    </div>
  );
}
