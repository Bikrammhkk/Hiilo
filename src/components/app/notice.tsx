import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export function Notice() {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-800 [&>svg]:text-blue-500">
      <Info className="h-4 w-4" />
      <AlertTitle className="font-bold">Notice</AlertTitle>
      <AlertDescription>
        First select the semester, then select the subject, and after that your
        subject will be shown. But right now, by default, the website is
        showing 'All Subjects All Semester'.
      </AlertDescription>
    </Alert>
  );
}
