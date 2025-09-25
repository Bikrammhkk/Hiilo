import { FileText, ArrowRight } from 'lucide-react';
import type { Paper } from '@/types';
import { DownloadButton } from './download-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PaperItemProps {
  paper: Paper;
  index: number;
}

const colors = [
  'bg-purple-100 text-purple-800',
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-pink-100 text-pink-800',
];

const iconColors = [
    'bg-purple-200 text-purple-800',
    'bg-yellow-200 text-yellow-800',
    'bg-green-200 text-green-800',
    'bg-blue-200 text-blue-800',
    'bg-pink-200 text-pink-800',
];

export function PaperItem({ paper, index }: PaperItemProps) {
  const cardColor = colors[index % colors.length];
  const iconColor = iconColors[index % colors.length];

  return (
    <Card className={`group transition-all hover:shadow-xl hover:-translate-y-2 rounded-2xl shadow-lg border-none ${cardColor}`}
          style={{ transform: `translateY(${-index * 2.5}rem)` }}>
      <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-4">
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${iconColor} sm:h-12 sm:w-12`}>
          <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="truncate font-semibold text-foreground">
            {paper.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs bg-white/50">
              {paper.subject || 'N/A'}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-white/50">
              Semester {paper.semester || 'N/A'}
            </Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
          <DownloadButton link={paper.link} />
          <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
        </div>
      </CardContent>
    </Card>
  );
}
