
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

  const semesters = useMemo(() => {
    const semesterSet = new Set<string>();
    papers.forEach((p) => {
      if (p.semester) semesterSet.add(String(p.semester));
    });
    return Array.from(semesterSet).sort((a, b) => Number(a) - Number(b));
  }, [papers]);

  const subjects = useMemo(() => {
    const subjectSet = new Set<string>();
    papers
      .filter(
        (p) =>
          semesterFilter === ALL_FILTER || String(p.semester) === semesterFilter
      )
      .forEach((p) => {
        if (p.subject) subjectSet.add(p.subject);
      });
    return Array.from(subjectSet).sort();
  }, [papers, semesterFilter]);

  useEffect(() => {
    if (!subjects.includes(subjectFilter) && subjectFilter !== ALL_FILTER) {
      setSubjectFilter(ALL_FILTER);
    }
  }, [subjects, subjectFilter]);

  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const semesterMatch =
        semesterFilter === ALL_FILTER || String(p.semester) === semesterFilter;
      const subjectMatch =
        subjectFilter === ALL_FILTER || p.subject === subjectFilter;
      return semesterMatch && subjectMatch;
    });
  }, [papers, semesterFilter, subjectFilter]);

  const handleSemesterChange = (value: string) => {
    setSemesterFilter(value);
    setSubjectFilter(ALL_FILTER);
  };

  const handleRefresh = useCallback(() => {
    setSemesterFilter(ALL_FILTER);
    setSubjectFilter(ALL_FILTER);
    if (papers.length === 0) {
      fetchPapers();
    }
  }, [fetchPapers, papers.length]);

  return (
    <>
      <Card className="overflow-hidden shadow-sm rounded-xl bg-card">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select value={semesterFilter} onValueChange={handleSemesterChange}>
                <SelectTrigger className="h-12 text-base shadow-sm rounded-lg focus:ring-ring">
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
                <SelectTrigger className="h-12 text-base shadow-sm rounded-lg focus:ring-ring">
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
      
      <div className="mt-8 grid gap-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4 rounded-xl shadow-md">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </Card>
          ))
        ) : error ? (
          <Card className="p-10 text-center text-destructive rounded-xl shadow-md">
            <h3 className="font-semibold text-lg text-foreground">Error</h3>
            <p>{error}</p>
          </Card>
        ) : filteredPapers.length > 0 ? (
          filteredPapers.map((paper, index) => (
            <PaperItem key={paper.key} paper={paper} index={index} />
          ))
        ) : (
          <Card className="mt-8">
            <CardContent className="p-10 text-center rounded-xl shadow-md">
              <h3 className="font-semibold text-lg text-foreground">
                No Matching Papers Found
              </h3>
              <p className="text-muted-foreground">Try adjusting your filter criteria or view all.</p>
              <Button onClick={handleRefresh} className="mt-4 rounded-lg">Reset & View All</Button>
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
