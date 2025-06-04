'use client';
import React, { useState } from 'react';
import { Modal } from '../modal';
import GoogleIcon from '@/assets/icons/google.svg';

interface LoginModalProps {
  isOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

interface LoginBoxProps {
  icon: React.ReactNode;
  label: String;
  onClick: () => void;
}

export const LoginModal = ({ isOpen, setModalOpen }: LoginModalProps) => {
  return (
    <Modal
      title="Join the Movement"
      isOpen={isOpen}
      onClose={() => setModalOpen(false)}
    >
      <div className="flex flex-col w-400 max-w-400 mx-5 max-mobile:!w-full max-mobile:!max-w-full gap-35">
        <div className="flex flex-col gap-10">
          <LoginBox
            icon={<GoogleIcon />}
            label="Continue With Google"
            onClick={() => {
              console.log('Google login button clicked');
            }}
          />
        </div>

        <div className="flex flex-row w-full justify-center items-center gap-10">
          <div className="cursor-pointer text-neutral-400 text-xs/14 font-medium">
            Privacy Policy
          </div>
          <div className="cursor-pointer text-neutral-400 text-xs/14 font-medium">
            Terms of Service
          </div>
        </div>
      </div>
    </Modal>
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
