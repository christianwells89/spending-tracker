import React, { PropsWithChildren } from 'react';
import { Loadable } from 'recoil';
import { ExclamationCircleOutline } from './icons';

interface SkeletonBlockProps {
  className?: string;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ className }) => {
  return <div className={`bg-gray-300 animate-pulse rounded-sm ${className}`}></div>;
};

interface SkeletonLoaderProps<T> extends SkeletonBlockProps {
  loadable: Loadable<T>;
  children(contents: T): JSX.Element;
  error?: JSX.Element;
}

export function SkeletonLoader<T>(props: PropsWithChildren<SkeletonLoaderProps<T>>): JSX.Element {
  const { loadable, children, error, ...blockProps } = props;

  switch (loadable.state) {
    case 'loading':
      return <SkeletonBlock {...blockProps} />;
    case 'hasError':
      return error ?? <ExclamationCircleOutline className="text-red-200 h-5" />;
    case 'hasValue':
      return children(loadable.contents);
    default:
      return <></>;
  }
}
