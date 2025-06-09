'use client';
import React from 'react';
import GoogleIcon from '@/assets/icons/google.svg';
import { LoginPopupFooter } from './login-popup-footer';
import { LoaderPopup } from './loader-popup';
import { usePopup } from '@/lib/contexts/popup-service';
import { LoginFailurePopup } from './login-failure-popup';
import UserSetupPopup from './user-setup-popup';
import { logger } from '@/lib/logger';
import { useAuth, useEd25519KeyPair } from '@/lib/contexts/auth-context';
import { AuthUserInfo, EventType } from '@/lib/service/firebase-service';

interface LoginModalProps {
  id?: string;
}

interface LoginBoxProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const LoginModal = ({ id = 'login_popup' }: LoginModalProps) => {
  const popup = usePopup();
  const anonKeyPair = useEd25519KeyPair();
  const { login } = useAuth();

  return (
    <div
      id={id}
      className="flex flex-col w-100 max-w-100 mx-1.25 max-mobile:!w-full max-mobile:!max-w-full gap-8.75"
    >
      <div className="flex flex-col gap-2.5">
        <LoginBox
          icon={<GoogleIcon />}
          label="Continue With Google"
          onClick={async () => {
            logger.debug('Google login button clicked');
            const loader = popup.open(
              <LoaderPopup
                title="Sign in"
                description="Signing you in..."
                logo={<GoogleIcon width="50" height="50" />}
                logoOrigin={<GoogleIcon />}
                msg="Continue with Google"
                serviceName="Google"
              />,
            );

            try {
              let user: AuthUserInfo = await login(anonKeyPair);
              // loader.close();

              if (user?.event == EventType.SignUp) {
                popup.open(
                  <UserSetupPopup
                    email={user.email ?? ''}
                    nickname={user.displayName ?? ''}
                    profileUrl={user.photoURL ?? ''}
                    principal={user.principal ?? ''}
                  />,
                );
              } else if (user?.event == EventType.Login) {
                loader.close();
              }
            } catch (err) {
              popup.open(
                <LoginFailurePopup
                  logo={<GoogleIcon />}
                  logoOrigin={<GoogleIcon />}
                  title="Login failed"
                  description="Google authentication failed"
                  msg="Try again later."
                  serviceName="Google"
                />,
              );
              logger.debug('failed to google sign in with error: ', err);
            }
          }}
        />
      </div>

      <LoginPopupFooter />
    </div>
  );
};

export const LoginBox = ({ icon, label, onClick }: LoginBoxProps) => {
  return (
    <button
      className="flex flex-row w-full rounded-[10px] bg-[#000203] px-5 py-5.5 gap-5 cursor-pointer items-center"
      onClick={onClick}
    >
      {icon}
      <div className="font-semibold text-white text-base">{label}</div>
    </button>
  );
};
