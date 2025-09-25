import { FileText, Download } from 'lucide-react';
import type { Paper } from '@/types';
import { DownloadButton } from './download-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaperItemProps {
  paper: Paper;
  index: number;
}

export function PaperItem({ paper, index }: PaperItemProps) {
  return (
    <Card className="group transition-all hover:shadow-xl hover:-translate-y-1 rounded-2xl shadow-lg border-2 border-black bg-accent">
      <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-300 border-2 border-black sm:h-12 sm:w-12">
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="truncate font-semibold text-foreground">
            {paper.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs bg-white/70 border border-black">
              {paper.subject || 'N/A'}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-white/70 border border-black">
              Semester {paper.semester || 'N/A'}
            </Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <DownloadButton link={paper.link} />
        </div>
      </CardContent>
    </Card>
  );
}
