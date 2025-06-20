'use client';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface CustomCalendarProps {
  value: number;
  onChange: (newTimestamp: number) => void;
}

export default function CustomCalendar({
  value,
  onChange,
}: CustomCalendarProps) {
  const [selected, setSelected] = useState<Date>();
  const [clicked, onClicked] = useState(false);

  useEffect(() => {
    if (value) setSelected(new Date(value));
  }, [value]);

  return (
    <div className="relative w-fit">
      <button
        className="flex flex-row items-center border border-input px-6 py-[10px] rounded-md font-semibold text-sm text-neutral-300 bg-transparent gap-[20px]"
        onClick={() => {
          onClicked(!clicked);
        }}
      >
        {selected ? format(selected, 'yyyy/MM/dd') : 'Selected Date'}
        <Calendar className="w-6 h-6 stroke-input" />
      </button>

      {clicked && (
        <div className="absolute mt-2 z-10 bg-white text-black rounded-xl shadow-xl p-4">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              if (date) onChange(date.getTime());
              onClicked(false);
            }}
            modifiersClassNames={{
              selected: 'bg-blue-600 text-white rounded-full',
              today: 'text-blue-600 font-bold',
            }}
            classNames={{
              months: 'flex flex-col',
              month: 'space-y-4',
              caption:
                'flex flex-row w-full justify-start items-center mb-2 px-1',
              caption_label:
                'flex flex-row w-full justify-between items-center text-sm font-semibold text-neutral-700',
              nav_button:
                'bg-neutral-500 text-white p-1 hover:opacity-80 rounded',
              table: 'w-full table-fixed border-collapse',
              head_row: 'font-bold',
              head_cell: 'text-xs text-center text-neutral-500 font-bold pb-1',
              row: '',
              cell: 'text-center text-sm text-neutral-800 w-10 h-10 p-0 rounded-full hover:bg-blue-100 cursor-pointer',
            }}
            formatters={{
              formatCaption: (date) => format(date, 'MMMM yyyy'),
            }}
          />
          <style jsx global>{`
            .rdp-nav_button svg path {
              stroke: white !important;
              fill: white !important;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
