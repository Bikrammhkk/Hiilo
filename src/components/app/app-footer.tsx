import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="mt-12 border-t py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="mb-3 flex items-center justify-center gap-4">
          <Link
            href="https://wa.me/919954487795"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            WhatsApp
          </Link>
          <span className="text-foreground/30">&bull;</span>
          <Link
            href="https://www.instagram.com/bikram.m1"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            Instagram
          </Link>
        </div>
        <p>Developed by Bikram</p>
      </div>
    </footer>
  );
}
