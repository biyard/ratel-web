'use client';

import React from 'react';
import AlertCircle from '@/assets/icons/alert-circle.svg';
import { usePopup } from '@/lib/contexts/popup-service';
import { LoaderPopup } from './loader-popup';
import { LoginPopupFooter } from './login-popup-footer';
import { loginWithGoogle } from '@/lib/service/firebase-service';
import UserSetupPopup from './user-setup-popup';
import { logger } from '@/lib/logger';

interface LoginFailurePopupProps {
  id?: string;
  logo: React.ReactNode;
  logoOrigin: React.ReactNode;
  title: string;
  description: string;
  msg: string;
  serviceName: string;
}

export const LoginFailurePopup = ({
  id = 'login_failure_popup',
  logo,
  logoOrigin,
  title,
  description,
  msg,
  serviceName,
}: LoginFailurePopupProps) => {
  const popup = usePopup();
  const failureMsg = `Failed to connect to ${serviceName}.\nWould you like to try again?`;

  return (
    <div id={id} className="w-400 max-mobile:!w-full gap-35">
      <div className="flex flex-col gap-10 mb-35">
        <div
          className="w-full flex flex-row pl-20 py-22 bg-black border-[1px] rounded-[10px] justify-start items-center gap-17 cursor-pointer border-c-p-50"
          onClick={async () => {
            logger.debug('Google login button clicked');
            const loader = popup.open(
              <LoaderPopup
                title={title}
                description={description}
                logo={logo}
                logoOrigin={logoOrigin}
                msg={msg}
                serviceName={serviceName}
              />,
            );

            try {
              const user = await loginWithGoogle();
              loader.close();
              logger.debug('user info: ', user);

              if (user.event == 'signup') {
                popup.open(
                  <UserSetupPopup
                    email={user.email ?? ''}
                    nickname={user.displayName ?? ''}
                    profileUrl={user.photoURL ?? ''}
                    principal={user.principal ?? ''}
                  />,
                );
              } else if (user.event == 'login') {
                popup.close();
              }
            } catch (err) {
              popup.open(
                <LoginFailurePopup
                  title={title}
                  description={description}
                  logo={logo}
                  logoOrigin={logoOrigin}
                  msg={msg}
                  serviceName={serviceName}
                />,
              );
              logger.debug('failed to google sign in with error: ', err);
            }
          }}
        >
          {logoOrigin}
          <div className="flex flex-col gap-3">
            <span className="text-white text-base/19 font-semibold">{msg}</span>
          </div>
        </div>

        <div className="w-full flex flex-row pl-20 py-10 bg-c-p-50-10 rounded-[10px] justify-start items-center gap-10">
          <AlertCircle color="#DB2780" />
          <div className="flex flex-col gap-3">
            <span className="text-c-p-50 text-[15px]/24 font-semibold tracking-wide whitespace-pre-line">
              {failureMsg}
            </span>
          </div>
        </div>
      </div>

      <LoginPopupFooter />
    </div>
  );
};
