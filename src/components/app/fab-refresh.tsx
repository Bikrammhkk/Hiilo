'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FabRefresh({ onRefresh }: { onRefresh: () => void }) {
  return (
    <Button
      onClick={onRefresh}
      className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full p-0 shadow-lg transition-transform hover:scale-105 hover:shadow-xl bg-accent hover:bg-accent/90 text-accent-foreground"
      aria-label="Reset and view all"
    >
      <RefreshCw className="h-6 w-6" />
      <span className="sr-only">Reset & View All</span>
    </Button>
  );
}
