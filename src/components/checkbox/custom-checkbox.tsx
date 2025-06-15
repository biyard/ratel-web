interface CustomCheckboxProps {
  isRounded?: boolean;
  checked: boolean;
  onChange: () => void;
}

export default function CustomCheckbox({
  isRounded = false,
  checked,
  onChange,
}: CustomCheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`w-6 h-6 flex items-center justify-center border
        ${checked ? 'bg-yellow-500 border-transparent' : 'bg-transparent border-neutral-500'}
        ${isRounded ? 'rounded-full' : 'rounded-sm'}
        transition-colors duration-150 `}
    >
      {checked && (
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
