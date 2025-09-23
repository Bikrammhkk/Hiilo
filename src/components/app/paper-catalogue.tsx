'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import type { Paper } from '@/types';
import { database } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Loader2, Search } from 'lucide-react';

export function PaperCatalogue() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

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
      const search = searchTerm.toLowerCase();
      return (
        (semesterFilter === '' || String(p.semester) === semesterFilter) &&
        (subjectFilter === '' || p.subject === subjectFilter) &&
        (searchTerm === '' ||
          p.title?.toLowerCase().includes(search) ||
          p.subject?.toLowerCase().includes(search) ||
          String(p.semester)?.toLowerCase().includes(search))
      );
    });
  }, [papers, searchTerm, semesterFilter, subjectFilter]);

  const handleRefresh = useCallback(() => {
    setSearchTerm('');
    setSemesterFilter('');
    setSubjectFilter('');
    if (papers.length === 0) {
      fetchPapers();
    }
  }, [fetchPapers, papers.length]);

  return (
    <>
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, subject, or semester"
                className="pl-10 h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Semesters</SelectItem>
                  {semesters.map((s) => (
                    <SelectItem key={s} value={s}>
                      Semester {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="secondary"
                className="h-12 text-base font-semibold"
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </div>
          </div>

          <div className="mt-6 divide-y divide-border rounded-lg border">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-10 w-24 rounded-md" />
                </div>
              ))
            ) : error ? (
              <div className="p-10 text-center text-destructive">{error}</div>
            ) : filteredPapers.length > 0 ? (
              filteredPapers.map((paper) => (
                <PaperItem key={paper.key} paper={paper} />
              ))
            ) : (
              <div className="p-10 text-center text-muted-foreground">
                <h3 className="font-semibold text-lg text-foreground">
                  No Matching Papers Found
                </h3>
                <p>Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <FabRefresh onRefresh={handleRefresh} />
    </>
  );
}
