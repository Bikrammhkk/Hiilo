import { SidebarTrigger } from '../ui/sidebar';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger />
          <h1 className="text-base font-bold sm:text-xl">
            SYLLABUS :: COMMERCE (ASSAM UNIVERSITY)
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* 3-dot menu removed as per request */}
        </div>
      </div>
    </header>
  );
}
