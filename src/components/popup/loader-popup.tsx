'use client';

import React, { useEffect, useContext, useState } from 'react';
import { LoginPopupFooter } from './login-popup-footer';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { Modal } from '../modal';

interface LoaderPopupProps {
  id?: string;
  title: string;
  description: string;
  logo: React.ReactNode;
  logoOrigin: React.ReactNode;
  msg: string;
}

export const LoaderPopup = ({
  id = 'loader_popup',
  title,
  description,
  logo,
  logoOrigin,
  msg,
}: LoaderPopupProps) => {
  return (
    <div
      id={id}
      className="flex flex-col w-400 max-w-400 mx-5  max-mobile:!w-full max-mobile:!max-w-full  gap-35"
    >
      <div className="flex flex-col w-full justify-center items-center gap-35">
        {/* Spinner */}
        <div className="border-6 border-t-6 w-82 h-82 border-primary border-t-background rounded-full animate-spin" />
        <div className="absolute flex-row w-64 h-64 bg-white rounded-full justify-center items-center flex">
          <div className="flex flex-row w-24 h-24 justify-center items-center">
            {logoOrigin}
          </div>
        </div>
      </div>

      <div className="justify-center text-center text-white font-bold text-base/24">
        {description}
      </div>

      <LoginPopupFooter />
    </div>
  );
};
