'use client';

// import CalendarPicker from '@/components/calendar-picker/calendar-picker';
// import TimeDropdown from '@/components/time-dropdown/time-dropdown';
import React from 'react';
import SpaceHeader from '../../_components/space_header';

export default function DeliberationPage({
  title,
  setTitle,

  userType,
  proposerImage,
  proposerName,
  createdAt,
  isEdit,
}: {
  title: string;
  setTitle: (title: string) => void;
  userType: number;
  proposerImage: string;
  proposerName: string;
  createdAt: number;
  isEdit: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      <SpaceHeader
        isEdit={isEdit}
        title={title}
        userType={userType}
        proposerImage={proposerImage}
        proposerName={proposerName}
        createdAt={createdAt}
        setTitle={(title: string) => {
          setTitle(title);
        }}
      />
      {/* <CalendarPicker
        value={1750321970 * 1000}
        onChange={(newTimestamp) => {
          console.log(
            'Selected date:',
            new Date(newTimestamp).toLocaleString(),
          );
        }}
      /> */}
      {/* <TimeDropdown
        value={1750321970 * 1000}
        onChange={function (newTimestamp: number): void {
          throw new Error('Function not implemented.');
        }}
      /> */}
    </div>
  );
}
