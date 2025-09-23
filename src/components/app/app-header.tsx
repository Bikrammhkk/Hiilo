import { SocialLinksMenu } from './social-links-menu';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Previous Year Question Papers
        </h1>
        <SocialLinksMenu />
      </div>
    </header>
  );
}
