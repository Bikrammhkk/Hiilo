import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function Notice() {
  return (
    <Alert className="mb-6 border-primary/50 text-primary-foreground dark:border-primary [&>svg]:text-primary">
      <Info className="h-4 w-4" />
      <AlertTitle className="font-bold text-primary">Notice</AlertTitle>
      <AlertDescription className="text-foreground">
        First select the semester, then select the subject, and after that your
        subject will be shown. But right now, by default, the website is
        showing 'All Subjects All Semester'.
      </AlertDescription>
    </Alert>
  );
}
