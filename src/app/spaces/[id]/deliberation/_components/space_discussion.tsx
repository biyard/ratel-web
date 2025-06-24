'use client';

import Image from 'next/image';
import BlackBox from '@/app/(social)/_components/black-box';
import CustomCalendar from '@/components/calendar-picker/calendar-picker';
import TimeDropdown from '@/components/time-dropdown/time-dropdown';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { format } from 'date-fns';

import discussionImg from '@/assets/images/discussion.png';
import { DiscussionCreateRequest } from '@/lib/api/models/discussion';

export interface SpaceDiscussionProps {
  isEdit?: boolean;
  discussions: DiscussionCreateRequest[];
  onremove?: (index: number) => void;
  onupdate?: (index: number, discussion: DiscussionCreateRequest) => void;
  onadd?: (discussion: DiscussionCreateRequest) => void;
}

export default function SpaceDiscussion({
  isEdit = false,
  discussions,
  onadd = () => {},
  onremove = () => {},
  onupdate = () => {},
}: SpaceDiscussionProps) {
  return (
    <div className="flex flex-col w-full">
      {isEdit ? (
        <EditableDiscussion
          discussions={discussions}
          onadd={() => {
            const started_at = Math.floor(Date.now() / 1000);
            const ended_at = Math.floor(Date.now() / 1000);
            const name = '';
            const description = '';

            onadd({
              started_at,
              ended_at,
              name,
              description,
            });
          }}
          onupdate={(index: number, discussion: DiscussionCreateRequest) => {
            onupdate(index, discussion);
          }}
          onremove={(index: number) => {
            onremove(index);
          }}
        />
      ) : (
        <ViewDiscussion discussions={discussions} />
      )}
    </div>
  );
}

function ViewDiscussion({
  discussions,
}: {
  discussions: DiscussionCreateRequest[];
}) {
  return (
    <div className="flex flex-col w-full gap-2.5">
      <DiscussionSchedules discussions={discussions} />
    </div>
  );
}

function DiscussionSchedules({
  discussions,
}: {
  discussions: DiscussionCreateRequest[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <BlackBox>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-white text-[15px]/[20px]">
            Schedule
          </div>
          <div className="flex flex-col gap-5">
            <div className="font-normal text-neutral-300 text-[15px]/[24px]">
              In order to improve feasibility of Digital asset basic act, we
              have scheduled a discussion and a lecture on it.
            </div>

            {discussions.map((discussion, index) => (
              <DiscussionTable
                key={index}
                startDate={discussion.started_at}
                endDate={discussion.ended_at}
                title={discussion.name}
                description={discussion.description}
              />
            ))}
          </div>
        </div>
      </BlackBox>

      <BlackBox>
        <div className="flex flex-col w-full gap-5">
          <div className="font-bold text-white text-[15px]/[20px]">
            Discussions
          </div>
          <div className="flex flex-col w-full gap-2.5">
            {discussions.map((discussion, index) => (
              <React.Fragment key={index}>
                <DiscussionRoom
                  startDate={discussion.started_at}
                  endDate={discussion.ended_at}
                  title={discussion.name}
                />
                {index !== discussions.length - 1 ? (
                  <div className=" w-full h-0.25 gap-1 bg-neutral-800" />
                ) : (
                  <></>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </BlackBox>
    </div>
  );
}

export function DiscussionRoom({
  startDate,
  endDate,
  title,
}: {
  startDate: number;
  endDate: number;
  title: string;
}) {
  const now = Math.floor(Date.now() / 1000);

  const isLive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isFinished = now > endDate;

  const formattedDate = format(new Date(startDate * 1000), 'dd MMM, yyyy');

  const statusLabel = isUpcoming
    ? 'Upcoming discussion'
    : isFinished
      ? 'Finished discussion'
      : 'On-going';

  return (
    <div className="flex flex-row w-full items-start justify-between gap-5">
      <div className="relative w-[240px] h-[150px] rounded-lg overflow-hidden">
        <Image
          src={discussionImg}
          alt="Discussion Thumbnail"
          fill
          className="object-cover"
        />
        {isLive && (
          <div className="absolute top-[12px] left-[12px] bg-[rgba(255,0,0,0.5)] rounded-sm font-semibold text-sm text-white p-1">
            LIVE
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 h-full justify-between items-start">
        <div className="flex flex-col flex-1 gap-1">
          <div className="text-sm text-neutral-400 font-normal">
            {statusLabel}
          </div>
          <div className="text-lg text-white font-bold">{title}</div>
          <div className="text-sm text-[#6d6d6d] font-normal">
            {formattedDate}
          </div>
        </div>

        {/* {isLive && (
          <div className="flex flex-row w-full justify-end items-end">
            <button className="flex items-center gap-[10px] px-5 py-2.5 bg-white text-[#000203] rounded-lg font-semibold hover:bg-neutral-300 transition">
              Join <ArrowRight className="w-[15px] h-[15px]" />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

function DiscussionTable({
  startDate,
  endDate,
  title,
  description,
}: {
  startDate: number;
  endDate: number;
  title: string;
  description: string;
}) {
  const start = new Date(startDate * 1000);
  const end = new Date(endDate * 1000);

  const formattedStartDate = format(start, 'M. dd. yyyy');
  const formattedEndDate = format(end, 'M. dd. yyyy');
  const formattedStartTime = format(start, 'HH:mm');
  const formattedEndTime = format(end, 'HH:mm');

  const displayDate =
    formattedStartDate === formattedEndDate
      ? formattedStartDate
      : `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="border border-neutral-400 rounded-sm text-neutral-400 text-sm w-full font-medium">
      <div className="w-full text-center border-b border-neutral-400 py-[19px] font-semibold">
        {displayDate}
      </div>

      <div className="grid grid-cols-3 text-center border-b border-neutral-400 py-[19px] font-semibold">
        <div>Time</div>
        <div>Type</div>
        <div>Contents</div>
      </div>

      <div className="grid grid-cols-3 text-center py-[23px]">
        <div>
          {formattedStartTime} - {formattedEndTime}
        </div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
}
function EditableDiscussion({
  discussions,
  onremove,
  onadd,
  onupdate,
}: {
  discussions: DiscussionCreateRequest[];
  onremove: (index: number) => void;
  onadd: () => void;
  onupdate: (index: number, discussion: DiscussionCreateRequest) => void;
}) {
  return (
    <BlackBox>
      <div className="flex flex-col w-full gap-5">
        <div className="font-bold text-white text-[15px]/[20px]">
          Discussion
        </div>

        <AddDiscussion
          onadd={() => {
            onadd();
          }}
        />

        {discussions.map((discussion, index) => (
          <EditableDiscussionInfo
            key={index}
            index={index}
            startedAt={discussion.started_at}
            endedAt={discussion.ended_at}
            name={discussion.name}
            description={discussion.description}
            onupdate={(index: number, discussion: DiscussionCreateRequest) => {
              onupdate(index, discussion);
            }}
            onremove={(index: number) => {
              onremove(index);
            }}
          />
        ))}
      </div>
    </BlackBox>
  );
}

function RemoveDiscussion({ onremove }: { onremove: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row w-fit items-center px-[10px] py-[5px] gap-[5px] rounded-[8px]  bg-neutral-700"
      onClick={() => {
        onremove();
      }}
    >
      <Trash2 className="stroke-white w-[20px] h-[20px]" />
      <div className="font-medium text-white text-base">Remove</div>
    </div>
  );
}

function AddDiscussion({ onadd }: { onadd: () => void }) {
  return (
    <div
      className="cursor-pointer flex flex-row w-fit h-fit px-[10px] py-[5px] rounded-[8px] bg-neutral-700 hover:bg-neutral-600 font-medium text-white text-sm"
      onClick={() => {
        onadd();
      }}
    >
      Add Discussion
    </div>
  );
}

function EditableDiscussionInfo({
  index,
  startedAt,
  endedAt,
  name,
  description,
  onupdate,
  onremove,
}: {
  index: number;
  startedAt: number;
  endedAt: number;
  name: string;
  description: string;
  onupdate: (index: number, discussion: DiscussionCreateRequest) => void;
  onremove: (index: number) => void;
}) {
  const [startTime, setStartTime] = useState<number>(startedAt);
  const [endTime, setEndTime] = useState<number>(endedAt);
  const [title, setTitle] = useState<string>(name);
  const [desc, setDesc] = useState<string>(description);

  const update = (
    newStart: number,
    newEnd: number,
    newTitle: string,
    newDesc: string,
  ) => {
    onupdate(index, {
      started_at: newStart,
      ended_at: newEnd,
      name: newTitle,
      description: newDesc,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap w-full justify-between items-center gap-[10px]">
        <div className="font-medium text-neutral-300 text-[15px] w-[80px]">
          Set Date
        </div>
        <div className="flex flex-row gap-[10px] items-center flex-wrap">
          <div className="flex flex-row gap-[10px]">
            <CustomCalendar
              value={startTime * 1000}
              onChange={(date) => {
                const newStart = Math.floor(date / 1000);
                setStartTime(newStart);
                update(newStart, endTime, title, desc);
              }}
            />
            <TimeDropdown
              value={startTime * 1000}
              onChange={(timestamp) => {
                const newStart = Math.floor(timestamp / 1000);
                setStartTime(newStart);
                update(newStart, endTime, title, desc);
              }}
            />
          </div>
          <div className="w-[20px] h-[1px] bg-neutral-500" />
          <div className="flex flex-row gap-[10px]">
            <CustomCalendar
              value={endTime * 1000}
              onChange={(date) => {
                const newEnd = Math.floor(date / 1000);
                setEndTime(newEnd);
                update(startTime, newEnd, title, desc);
              }}
            />
            <TimeDropdown
              value={endTime * 1000}
              onChange={(timestamp) => {
                const newEnd = Math.floor(timestamp / 1000);
                setEndTime(newEnd);
                update(startTime, newEnd, title, desc);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full justify-start items-start gap-[10px]">
        <div className="font-medium text-neutral-300 text-[15px] w-[80px]">
          Title
        </div>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => update(startTime, endTime, title, desc)}
        />
      </div>

      <div className="flex flex-col w-full justify-start items-start gap-[10px]">
        <div className="font-medium text-neutral-300 text-[15px] w-[80px]">
          Description
        </div>
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={() => update(startTime, endTime, title, desc)}
        />
      </div>

      <div className="flex flex-row w-full justify-end">
        <RemoveDiscussion onremove={() => onremove(index)} />
      </div>

      <div className="flex flex-row w-full h-[1px] bg-neutral-700" />
    </div>
  );
}
