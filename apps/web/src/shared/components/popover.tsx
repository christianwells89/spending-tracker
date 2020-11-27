import React, { useRef, useState } from 'react';
import { usePopper } from 'react-popper';

interface PopoverButtonProps {
  className: string;
  text: string;
  disabled?: boolean;
  children(close: () => void): React.ReactNode;
  onClick?(e: React.MouseEvent): void;
}

export const PopoverButton: React.FC<PopoverButtonProps> = (props) => {
  const { className, text, disabled = false, children, onClick = () => null } = props;
  const [showPopper, setShowPopper] = useState(false);
  const buttonRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes, state } = usePopper(buttonRef.current, popperRef.current, {});

  const placement = state?.placement ?? 'top';
  const position = placement === 'top' ? 'top-full' : 'bottom-full';
  const rotate = placement === 'top' ? '' : 'rotate-180';
  const close = () => setShowPopper(false);

  return (
    <>
      <button
        className={className}
        type="button"
        disabled={disabled}
        ref={buttonRef}
        onClick={(e) => {
          onClick(e);
          setShowPopper(!showPopper);
        }}
      >
        {text}
      </button>
      {showPopper ? (
        <div ref={popperRef} style={styles.popper} {...attributes.popper} className="relative">
          <svg
            className={`absolute text-white h-4 w-full left-0 ${position} transform ${rotate}`}
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
          {children(close)}
        </div>
      ) : null}
    </>
  );
};
