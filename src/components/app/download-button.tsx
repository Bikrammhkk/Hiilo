'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDirectLink } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

export function DownloadButton({ link }: { link: string }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    if (!link) {
      toast({
        variant: 'destructive',
        title: 'Download Error',
        description: 'No download link available for this paper.',
      });
      return;
    }

    setLoading(true);
    try {
      let urlToOpen = link;
      if (link.includes('drive.google.com')) {
        const result = await getDirectLink(link);
        urlToOpen = result.directDownloadLink;
      }
      window.open(urlToOpen, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Download failed', error);
      toast({
        variant: 'destructive',
        title: 'Download Error',
        description:
          'Could not process the download link. Trying to open the original link.',
      });
      window.open(link, '_blank', 'noopener,noreferrer'); // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      variant="ghost"
      className="h-10 w-10 rounded-full p-0 transition-all hover:bg-accent/50 sm:w-auto sm:px-4 sm:py-2 sm:hover:scale-105"
      aria-label="Download paper"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span className="hidden sm:ml-2 sm:inline-block">Download</span>
    </Button>
  );
}
