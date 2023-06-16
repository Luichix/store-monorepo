import BackOfficeSidebar from '@/components/layout/BackOfficeSidebar';
import React from 'react';

const BackOfficeLayout = ({ children }) => {
  return (
    <>
      <BackOfficeSidebar />
      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Your content */}
          {children}
        </div>
      </main>
    </>
  );
};

export default BackOfficeLayout;
