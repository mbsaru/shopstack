// src/components/layouts/FullPageAuthLayout.jsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // Assumes you have a cn utility for tailwind-merge/clsx

const AuthPageLayout = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8", // Centers content vertically and horizontally, full viewport height
        className // Allows for additional custom classes from UI config
      )}
    >
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10" // Styles the inner content box (the 'card')
      >
        {children}
      </div>
    </div>
  );
};

export default AuthPageLayout;