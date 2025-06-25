'use client';

import { Clear, Logo } from '@/components/icons';
import React, { useEffect, useState } from 'react';

export default function ChatPanel({
  onClose,
  messages,
  onSend,
}: {
  onClose: () => void;
  messages: { senderId: string; text: string }[];
  onSend: (text: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSend = () => {
    onSend(input);
    setInput('');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[320px] bg-[#2e2e2e] z-40 border-l border-neutral-700 transform transition-all duration-300 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-600">
        <div className="flex flex-row w-fit gap-2.5">
          <Logo width={25} height={25} />
          <div className="font-semibold text-sm text-white">Chat</div>
        </div>
        <Clear
          className="cursor-pointer w-[24px] h-[24px] [&>path]:stroke-[#bfc8d9]"
          onClick={handleClose}
          fill="white"
        />
      </div>

      <div className="flex-1 p-4 text-white text-sm overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="break-words">
            <span className="text-neutral-400 mr-2">{msg.senderId}:</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-neutral-600 p-2">
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message here"
            className="flex-1 rounded-md px-3 py-2 text-sm bg-neutral-800 text-white border border-neutral-700"
          />
          <button
            onClick={handleSend}
            className="text-white bg-blue-600 px-3 py-2 rounded-md text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
