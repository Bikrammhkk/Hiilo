import { FileText } from 'lucide-react';
import type { Paper } from '@/types';
import { DownloadButton } from './download-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaperItemProps {
  paper: Paper;
  index: number;
}

const colors = [
  'bg-pink-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-purple-100',
];

export function PaperItem({ paper, index }: PaperItemProps) {
  const color = colors[index % colors.length];

  return (
    <Card
      className={`group transition-all hover:shadow-lg hover:-translate-y-0.5 rounded-xl shadow-md border-border`}
    >
      <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-4">
        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${color}`}
        >
          <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="truncate font-semibold text-foreground">
            {paper.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
            <Badge
              variant="secondary"
              className="text-xs bg-black/5 border-black/10 text-black/70"
            >
              {paper.subject || 'N/A'}
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs bg-black/5 border-black/10 text-black/70"
            >
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
