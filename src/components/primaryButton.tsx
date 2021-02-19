import React, { ButtonHTMLAttributes } from 'react';

import '../css/components/primaryButton.css';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <button className="primary-button" type="button" {...props}>
      {children}
    </button>
  );
}