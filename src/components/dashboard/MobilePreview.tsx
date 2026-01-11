import React from 'react';
import { BiopageRenderer } from '@/components/biopage/BiopageRenderer';
import { useProfile } from '@/context/ProfileContext';

export function MobilePreview() {
  const { profile } = useProfile();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50">
        <div className="mb-4 text-sm font-medium text-slate-500 uppercase tracking-wider">Live Preview</div>
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative scrollbar-hide overflow-y-auto">
                <BiopageRenderer profile={profile} preview={true} />
            </div>
        </div>
    </div>
  );
}
