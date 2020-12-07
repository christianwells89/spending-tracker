import React from 'react';

interface BackdropProps {
  isVisible: boolean;
  onClick(): void;
}

export const Backdrop: React.FC<BackdropProps> = ({ isVisible: isOpen, onClick }) => {
  const bgDisplay = isOpen ? 'absolute' : 'hidden';

  return (
    <div className={`lg:hidden inset-0 bg-black opacity-50 z-40 ${bgDisplay}`} onClick={onClick} />
  );
};
