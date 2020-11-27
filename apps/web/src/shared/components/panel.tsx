import React from 'react';

// The pick strips the optional characteristic from the prop so need to wrap it in Partial
type PanelProps = Partial<Pick<HTMLDivElement, 'className'>>;

export const Panel: React.FC<PanelProps> = (props) => {
  const { children, className: inputClassName } = props;
  const className = `rounded-lg bg-white shadow-md ${inputClassName ?? ''}`;
  return <div className={className}>{children}</div>;
};
