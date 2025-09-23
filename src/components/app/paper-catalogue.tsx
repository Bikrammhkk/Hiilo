
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Paper } from '@/types';
import { database } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PaperItem } from './paper-item';
import { FabRefresh } from './fab-refresh';
import { onValue, ref } from 'firebase/database';

const ALL_FILTER = 'all';

export function PaperCatalogue() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [semesterFilter, setSemesterFilter] = useState(ALL_FILTER);
  const [subjectFilter, setSubjectFilter] = useState(ALL_FILTER);

  const fetchPapers = useCallback(() => {
    setLoading(true);
    setError(null);
    const db = database;
    const papersRef = ref(db, 'papers');

    onValue(
      papersRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const paperList: Paper[] = Object.entries(data).map(
            ([key, value]: [string, any]) => ({
              key,
              ...value,
            })
          );
          // Sort by creation time, newest first
          paperList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          setPapers(paperList);
        } else {
          setPapers([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setError('Could not load papers. Please try again later.');
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const { semesters, subjects } = useMemo(() => {
    const semesterSet = new Set<string>();
    const subjectSet = new Set<string>();
    papers.forEach((p) => {
      if (p.semester) semesterSet.add(String(p.semester));
      if (p.subject) subjectSet.add(p.subject);
    });
    return {
      semesters: Array.from(semesterSet).sort((a, b) => Number(a) - Number(b)),
      subjects: Array.from(subjectSet).sort(),
    };
  }, [papers]);

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      return (
        (semesterFilter === ALL_FILTER || String(p.semester) === semesterFilter) &&
        (subjectFilter === ALL_FILTER || p.subject === subjectFilter)
      );
    });
  }, [papers, semesterFilter, subjectFilter]);

  const handleRefresh = useCallback(() => {
    setSemesterFilter(ALL_FILTER);
    setSubjectFilter(ALL_FILTER);
    if (papers.length === 0) {
      fetchPapers();
    }
  }, [fetchPapers, papers.length]);

  return (
    <>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="h-12 text-base shadow-sm bg-accent text-accent-foreground">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER}>All Semesters</SelectItem>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={s}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="h-12 text-base shadow-sm bg-accent text-accent-foreground">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_FILTER}>All Subjects</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            </Card>
          ))
        ) : error ? (
          <Card className="p-10 text-center text-destructive">
            <h3 className="font-semibold text-lg text-foreground">Error</h3>
            <p>{error}</p>
          </Card>
        ) : filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <PaperItem key={paper.key} paper={paper} />
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <h3 className="font-semibold text-lg text-foreground">
                No Matching Papers Found
              </h3>
              <p className="text-muted-foreground">Try adjusting your filter criteria or view all.</p>
              <Button onClick={handleRefresh} className="mt-4">Reset & View All</Button>
            </CardContent>
          </Card>
        )}
      </div>

      {(semesterFilter !== ALL_FILTER || subjectFilter !== ALL_FILTER) && filteredPapers.length > 0 && (
          <FabRefresh onRefresh={handleRefresh} />
      )}
    </>
  );
}
