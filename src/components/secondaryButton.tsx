import React, { ButtonHTMLAttributes } from 'react';

import '../css/components/secondaryButton.css';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SecondaryButton({ children, ...props }: SecondaryButtonProps) {
  return (
    <button className="secondary-button" type="button" {...props}>
      {children}
    </button>
  );
}