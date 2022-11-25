import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-primary text-white w-72 h-12 flex items-center justify-center rounded-md mb-6 mt-6 md:w-96 hover:bg-nv"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
