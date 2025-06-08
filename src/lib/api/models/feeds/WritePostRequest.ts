export interface WritePostRequest {
  write: {
    html_contents: string;
    user_id: number;
    industry_id: number;
    title: string;
    quote_feed_id: number | null;
    files: File[] | null;
  };
}
