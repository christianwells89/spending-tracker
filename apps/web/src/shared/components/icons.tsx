import React from 'react';

// These are copied from @graywolfai/react-heroicons because they can't be imported anymore for some
// really strange reason after moving to Typescript 4

export const ChevronDownOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export const ChevronLeftOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  );
};

export const ChevronRightOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
};

export const ViewListOutline = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );
};

export const XSolid = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  );
};
