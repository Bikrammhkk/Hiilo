import { FileText, ChevronRight } from 'lucide-react';
import type { Paper } from '@/types';
import { DownloadButton } from './download-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaperItemProps {
  paper: Paper;
}

export function PaperItem({ paper }: PaperItemProps) {
  return (
    <Card className="group transition-all hover:shadow-md hover:-translate-y-1">
      <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-12 sm:w-12">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="truncate font-semibold text-foreground">
            {paper.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs">
              {paper.subject || 'N/A'}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Semester {paper.semester || 'N/A'}
            </Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <DownloadButton link={paper.link} />
          <ChevronRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
        </div>
      </CardContent>
    </Card>
  );
}
