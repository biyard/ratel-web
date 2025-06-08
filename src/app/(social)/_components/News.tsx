'use client';
import { Col } from '@/components/ui/col';
import { ratelApi } from '@/lib/api/ratel_api';
import { useSuspenseQuery } from '@apollo/client';
import React from 'react';

export interface NewsItem {
  id: number;
  title: string;
  html_content: string;
  created_at: number;
}

export default function News() {
  const q = ratelApi.graphql.listNews(3);
  const {
    data: { news },
  }: { data: { news: NewsItem[] } } = useSuspenseQuery(q.query, {
    variables: q.variables,
  });

  return (
    <Col className="w-65 rounded-[10px] bg-component-bg px-4 py-5">
      <h3 className="text-[15px]/[20px] tracking-[0.5px] font-bold text-white">
        Latest News
      </h3>
      <Col className="gap-3.75">
        {news.map((item) => (
          <Col key={`news-${item.id}`} className="py-2.5">
            <h4 className="text-base/[25px] tracking-[0.5px] align-middle font-medium">
              {item.title}
            </h4>
            <p
              className="text-sm/[20px] align-middle font-light line-clamp-2 whitespace-normal"
              dangerouslySetInnerHTML={{ __html: item.html_content }}
            ></p>
          </Col>
        ))}
      </Col>
    </Col>
  );
}
