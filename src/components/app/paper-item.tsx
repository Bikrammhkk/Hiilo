import { FileText } from 'lucide-react';
import type { Paper } from '@/types';
import { DownloadButton } from './download-button';

interface PaperItemProps {
  paper: Paper;
}

export function PaperItem({ paper }: PaperItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 transition-colors hover:bg-accent/20 sm:p-4">
      <div className="hidden sm:block">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground">{paper.title}</h3>
        <p className="text-sm text-muted-foreground">
          {paper.subject || 'N/A'} &bull; Semester {paper.semester || 'N/A'}
        </p>
      </div>
      <div className="flex-shrink-0">
        <DownloadButton link={paper.link} />
      </div>
    </div>
  );
}
