'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FabRefresh({ onRefresh }: { onRefresh: () => void }) {
  return (
    <Button
      onClick={onRefresh}
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full p-0 text-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl sm:w-auto sm:px-6 sm:py-2"
      aria-label="Reset and view all"
    >
      <RefreshCw className="h-5 w-5" />
      <span className="hidden sm:ml-2 sm:inline-block">Reset & View All</span>
    </Button>
  );
}
