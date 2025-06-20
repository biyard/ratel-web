'use client';

import { Discussion } from '@/lib/api/models/discussion';
import React from 'react';

export interface SpaceDiscussionProps {
  isEdit?: boolean;
  discussions: Discussion[];
  onremove?: (index: number) => void;
  onupdate?: (index: number, discussion: Discussion) => void;
  onadd?: (discussion: Discussion) => void;
}

export default function SpaceDiscussion({}: SpaceDiscussionProps) {
  return <div>discussion</div>;
}
