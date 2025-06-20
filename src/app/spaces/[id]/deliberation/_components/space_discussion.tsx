'use client';

import BlackBox from '@/app/(social)/_components/black-box';
import CustomCalendar from '@/components/calendar-picker/calendar-picker';
import TimeDropdown from '@/components/time-dropdown/time-dropdown';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DiscussionCreateRequest } from '@/lib/api/models/spaces';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { format } from 'date-fns';

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
    <BlackBox>
      <div className="flex flex-col gap-3">
        <div className="font-bold text-white text-[15px]/[20px]">Schedule</div>
        <div className="flex flex-col gap-5">
          <div className="font-normal text-neutral-300 text-[15px]/[24px]">
            In order to improve feasibility of Digital asset basic act, we have
            scheduled a discussion and a lecture on it.
          </div>

          {discussions.map((discussion, index) => (
            <DiscussionTable
              key={index}
              startDate={format(discussion.started_at * 1000, 'M. dd. yyyy')}
              startTime={format(
                new Date(discussion.started_at * 1000),
                'HH:mm',
              )}
              endTime={format(new Date(discussion.ended_at * 1000), 'HH:mm')}
              title={discussion.name}
              description={discussion.description}
            />
          ))}
        </div>
      </div>
    </BlackBox>
  );
}

function DiscussionTable({
  startDate,
  startTime,
  endTime,
  title,
  description,
}: {
  startDate: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-neutral-500 rounded-md text-white text-sm w-full">
      <div className="w-full text-center border-b border-neutral-500 py-2 font-medium">
        {startDate}
      </div>

      <div className="grid grid-cols-3 text-center border-b border-neutral-500 py-2 text-neutral-400 font-medium">
        <div>Time</div>
        <div>Type</div>
        <div>Contents</div>
      </div>

      <div className="grid grid-cols-3 text-center py-3">
        <div>
          {startTime} - {endTime}
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

  const triggerUpdate = () => {
    onupdate(index, {
      started_at: startTime,
      ended_at: endTime,
      name: title,
      description: desc,
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
                setStartTime(Math.floor(date / 1000));
                triggerUpdate();
              }}
            />
            <TimeDropdown
              value={startTime * 1000}
              onChange={(timestamp) => {
                setStartTime(Math.floor(timestamp / 1000));
                triggerUpdate();
              }}
            />
          </div>

          <div className="w-[20px] h-[1px] bg-neutral-500" />

          <div className="flex flex-row gap-[10px]">
            <CustomCalendar
              value={endTime * 1000}
              onChange={(date) => {
                setEndTime(Math.floor(date / 1000));
                triggerUpdate();
              }}
            />
            <TimeDropdown
              value={endTime * 1000}
              onChange={(timestamp) => {
                console.log('timestamp: ', timestamp);
                setEndTime(Math.floor(timestamp / 1000));
                triggerUpdate();
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
          onBlur={triggerUpdate}
        />
      </div>

      <div className="flex flex-col w-full justify-start items-start gap-[10px]">
        <div className="font-medium text-neutral-300 text-[15px] w-[80px]">
          Description
        </div>
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={triggerUpdate}
        />
      </div>

      <div className="flex flex-row w-full justify-end">
        <RemoveDiscussion onremove={() => onremove(index)} />
      </div>

      <div className="flex flex-row w-full h-[1px] bg-neutral-700" />
    </div>
  );
}
