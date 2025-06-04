'use client';
import React, { useState } from 'react';
import { Modal } from '../modal';
import GoogleIcon from '@/assets/icons/google.svg';
import { LoginPopupFooter } from './login-popup-footer';
import { LoaderPopup } from './loader-popup';
import { usePopup } from '@/lib/contexts/popup-service';

interface LoginModalProps {
  id?: string;
}

interface LoginBoxProps {
  icon: React.ReactNode;
  label: String;
  onClick: () => void;
}

export const LoginModal = ({ id = 'login_popup' }: LoginModalProps) => {
  const popup = usePopup();

  return (
    <div
      id={id}
      className="flex flex-col w-400 max-w-400 mx-5 max-mobile:!w-full max-mobile:!max-w-full gap-35"
    >
      <div className="flex flex-col gap-10">
        <LoginBox
          icon={<GoogleIcon />}
          label="Continue With Google"
          onClick={() => {
            console.log('Google login button clicked');
            popup
              .open(
                <LoaderPopup
                  title="Sign in"
                  description="Sign into your account in the pop-up"
                  logo={<GoogleIcon width="50" height="50" />}
                  logoOrigin={<GoogleIcon />}
                  msg="Continue with Google"
                  serviceName="Google"
                />,
              )
              .withTitle('Sign In');
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
      className="flex flex-row w-full rounded-[10px] bg-[#000203] px-20 py-22 gap-20 cursor-pointer items-center"
      onClick={onClick}
    >
      {icon}
      <div className="font-semibold text-white text-base">{label}</div>
    </button>
  );
};
