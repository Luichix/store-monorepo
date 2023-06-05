import { AccountHeader } from '@/components/layout';
import React from 'react';

const Accountlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AccountHeader />
      {children}
    </div>
  );
};

export default Accountlayout;
