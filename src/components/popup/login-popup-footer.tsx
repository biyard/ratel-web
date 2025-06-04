'use client';

interface LoginPopupFooterProps {}

export const LoginPopupFooter = ({}: LoginPopupFooterProps) => {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-10">
      <div className="cursor-pointer text-neutral-400 text-xs/14 font-medium">
        Privacy Policy
      </div>
      <div className="cursor-pointer text-neutral-400 text-xs/14 font-medium">
        Terms of Service
      </div>
    </div>
  );
};
