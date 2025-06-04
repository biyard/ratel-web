'use client';

import { usePopup } from '@/lib/contexts/popup-service';
import React from 'react';
import { WelcomeHeader } from './welcome-header';
import { PrimaryButton } from '../button/primary-button';
import { LoginPopupFooter } from './login-popup-footer';

interface ConfirmPopupProps {}

export const ConfirmPopup = ({}: ConfirmPopupProps) => {
  const popup = usePopup();

  const handleClose = () => {
    popup.close();
  };

  return (
    <div className="max-w-400 w-full mx-5 max-mobile:!max-w-full mt-35">
      <div className="w-full flex flex-col gap-35 mb-24">
        <WelcomeHeader
          title="Welcome to Ratel!"
          description="Policy is shaped by civic engagement—when we speak up, policymakers listen. Ratel gives you a platform to take action and shape crypto policy. Your voice matters, so make it heard and help secure a bright future for crypto."
        />

        <PrimaryButton onClick={handleClose} disabled={false}>
          {'Start'}
        </PrimaryButton>
      </div>

      <LoginPopupFooter />
    </div>
  );
};
