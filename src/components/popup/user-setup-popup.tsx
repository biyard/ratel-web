'use client';

import React, { useState, useEffect } from 'react';
import { usePopup } from '@/lib/contexts/popup-service';
import { LoginPopupFooter } from './login-popup-footer';
import { WelcomeHeader } from './welcome-header';
import { PrimaryButton } from '../button/primary-button';
import { Checkbox } from '../checkbox/checkbox';
import { ConfirmPopup } from './confirm-popup';

interface UserSetupPopupProps {
  id?: string;
  nickname?: string;
  profileUrl?: string;
  email: string;
  principal?: string;
}

interface LabeledInputProps {
  labelName: string;
  placeholder: string;
  value: string;
  onInput: (text: string) => void;
  warning?: string;
  children?: React.ReactNode;
}

const UserSetupPopup = ({
  id = 'user_setup_popup',
  nickname = '',
  profileUrl = '',
  email = 'test',
  principal = '',
}: UserSetupPopupProps) => {
  const popup = usePopup();
  const [displayName, setDisplayName] = useState('');
  const [userName, setUserName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [announcementAgree, setAnnouncementAgree] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);

  const isValidUsername = (username: string) =>
    username.length > 0 && /^[a-z0-9_-]+$/.test(username);

  const handleSubmit = async () => {
    if (!agreed || !isUserNameValid) return;

    popup.open(<ConfirmPopup />);
  };

  useEffect(() => {
    setIsUserNameValid(isValidUsername(userName));
  }, [userName]);

  return (
    <div
      id={id}
      className="flex flex-col w-400 max-w-400 mx-5 max-mobile:!w-full max-mobile:!max-w-full gap-35 mt-35"
    >
      <WelcomeHeader
        title="Finish your Profile!"
        description="Completing your profile makes it easier for you to take action."
      />

      <div className="flex flex-col items-start justify-start w-full gap-5">
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-row items-start">
            <span className="text-c-cg-30 font-bold text-base/28">
              {'Email'}
            </span>
          </div>
          <input
            className="w-full outline-none px-5 h-44 text-white text-base placeholder-gray-500 font-medium border rounded-lg border-gray-600"
            disabled={email === ''}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-20 w-full mt-20">
          <LabeledInput
            labelName={'Display Name'}
            placeholder={'Display Name'}
            value={displayName}
            onInput={(value: string) => {
              setDisplayName(value);
            }}
          />

          <LabeledInput
            labelName={'User Name'}
            placeholder={'User Name'}
            value={userName}
            onInput={(value: string) => {
              setUserName(value);
            }}
            warning={
              'Only numbers, lowercase letters, -, _ and more than one character can be entered.'
            }
          />
        </div>

        <div className="flex flex-col gap-10 items-start mb-20 mt-20">
          <Checkbox id="agree_checkbox" onChange={setAgreed}>
            <span className="text-sm text-gray-400">
              <strong>[Required]</strong> I have read and accept the{' '}
              <strong>Terms of Service</strong>
            </span>
          </Checkbox>

          <Checkbox id="announcement_checkbox" onChange={setAnnouncementAgree}>
            <span className="text-sm text-gray-400">
              I want to receive announcements and news from Ratel.
            </span>
          </Checkbox>
        </div>

        <PrimaryButton
          disabled={!agreed || !isUserNameValid}
          onClick={handleSubmit}
        >
          {'Finished Sign-up'}
        </PrimaryButton>
      </div>

      <LoginPopupFooter />
    </div>
  );
};

const LabeledInput = ({
  labelName,
  placeholder,
  value,
  onInput,
  children,
  warning = '',
}: LabeledInputProps) => (
  <div className="w-full flex flex-col items-start gap-5">
    <p className="text-c-cg-30 font-bold text-base/28">{labelName}</p>
    <input
      type="text"
      className="w-full outline-none px-5 text-white text-base placeholder-gray-500 font-medium border rounded-lg border-gray-600"
      style={{ height: 50 }}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onInput(e.target.value)}
    >
      {children}
    </input>
    {warning !== '' && <span className="text-sm text-c-cg-30">{warning}</span>}
  </div>
);

export default UserSetupPopup;
