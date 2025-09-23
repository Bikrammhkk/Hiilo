import { AppHeader } from '@/components/app/app-header';
import { AppFooter } from '@/components/app/app-footer';
import { PaperCatalogue } from '@/components/app/paper-catalogue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className='mb-8'>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Explore Vacancies</h2>
            <p className="mt-2 text-lg text-muted-foreground">Find previous year papers and notes.</p>
        </div>
        <PaperCatalogue />
        <Card className="mt-8 border-dashed bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <FileText className="h-5 w-5 text-primary" />
              How to download
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the Download button on any paper. If it's a
              Google Drive link, it will be converted to a direct-download link
              for a better experience.
            </p>
          </CardContent>
        </Card>
      </main>
      <AppFooter />
    </div>
  );
}
