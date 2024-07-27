import React from 'react';

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={'container'}>{children}</div>;
};
