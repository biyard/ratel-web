'use client';

import React, { useState, useEffect } from 'react';
import { usePopup } from '@/lib/contexts/popup-service';
import { LoginPopupFooter } from './login-popup-footer';
import { WelcomeHeader } from './welcome-header';
import { PrimaryButton } from '../button/primary-button';
import { Checkbox } from '../checkbox/checkbox';
import { ConfirmPopup } from './confirm-popup';
import { useApiCall } from '@/lib/api/use-send';
import { ratelApi } from '@/lib/api/ratel_api';
import { logger } from '@/lib/logger';
import { useApolloClient } from '@apollo/client';
import { useUserInfo } from '@/lib/api/hooks/users';

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
  email = '',
  profileUrl,
}: UserSetupPopupProps) => {
  const { post } = useApiCall();
  const client = useApolloClient();

  const popup = usePopup();
  const [displayName, setDisplayName] = useState('');
  const [userName, setUserName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [announcementAgreed, setAnnouncementAgree] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [warning, setWarning] = useState('');
  const query = useUserInfo();

  const isValidUsername = (username: string) => /^[a-z0-9_-]+$/.test(username);

  const handleSubmit = async () => {
    if (!agreed || !isUserNameValid) return;

    if (announcementAgreed) {
      try {
        await post(ratelApi.subscription.subscribe(), {
          subscribe: {
            email,
          },
        });
      } catch (err) {
        logger.error('failed to subscription with error: ', err);
      }
    }

    try {
      await post(ratelApi.users.updateUserInfo(), {
        signup: {
          nickname: displayName,
          email,
          profile_url: profileUrl,
          term_agreed: agreed,
          informed_agreed: announcementAgreed,
          username: userName,
        },
      });
      query.refetch();
      popup.open(<ConfirmPopup />);
    } catch (err) {
      logger.error('failed to signup with error: ', err);
    }
  };

  useEffect(() => {
    setIsUserNameValid(isValidUsername(userName));
  }, [userName]);

  return (
    <div
      id={id}
      className="flex flex-col w-100 max-w-100 mx-4.25 max-mobile:!w-full max-mobile:!max-w-full gap-8.75 mt-8.75"
    >
      <WelcomeHeader
        title="Finish your Profile!"
        description="Completing your profile makes it easier for you to take action."
      />

      <div className="flex flex-col items-start justify-start w-full gap-1.25">
        <div className="w-full flex flex-col gap-[5px]">
          <div className="flex flex-row items-start">
            <span className="text-c-cg-30 font-bold text-base/7">
              {'Email'}
            </span>
          </div>
          <input
            className="w-full outline-none px-5 h-11 text-white text-base placeholder-gray-500 font-medium border rounded-lg border-gray-600"
            disabled={email === ''}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-5 w-full mt-2.25">
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
            onInput={async (value: string) => {
              setUserName(value);
              if (value.length === 0) {
                setWarning('');
                setIsUserNameValid(true);
                return;
              }

              if (!isValidUsername(value)) {
                setWarning(
                  'Only numbers, lowercase letters, -, _ and more than one character can be entered.',
                );
                setIsUserNameValid(false);
                return;
              } else {
                setWarning('');
                setIsUserNameValid(true);
              }
              const {
                data: { users },
              } = await client.query(ratelApi.graphql.getUserByUsername(value));

              if (users.length > 0) {
                setWarning('This username is already taken.');
                setIsUserNameValid(false);
              } else {
                setWarning('');
                setIsUserNameValid(true);
              }
            }}
            warning={warning}
          />
        </div>

        <div className="flex flex-col gap-2.25 items-start mb-5 mt-5">
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
  <div className="w-full flex flex-col items-start gap-[5px]">
    <div className="text-c-cg-30 font-bold text-base/7">{labelName}</div>
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
    {warning !== '' && <span className="text-sm text-c-p-50">{warning}</span>}
  </div>
);

export default UserSetupPopup;
