type Config = {
  api_url: string;
};

export const config: Config = {
  api_url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
};
