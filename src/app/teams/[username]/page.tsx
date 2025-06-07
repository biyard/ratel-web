import React from 'react';

export interface TeamsByUsernamePageProps {
  params: Promise<{ username: string }>;
}

export default async function TeamsByUsernamePage({
  params,
}: TeamsByUsernamePageProps) {
  const { username } = await params;

  return <div>{username}</div>;
}
