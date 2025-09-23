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
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="h-6 w-6" />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-foreground">{paper.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <Badge variant="secondary">{paper.subject || 'N/A'}</Badge>
            <Badge variant="secondary">Semester {paper.semester || 'N/A'}</Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <DownloadButton link={paper.link} />
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
