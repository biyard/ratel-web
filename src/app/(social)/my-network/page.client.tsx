'use client';
import React from 'react';
import { useNetwork } from '../_hooks/use-network';
import { logger } from '@/lib/logger';

export default function MyNetwork() {
  const network = useNetwork();
  const data = network.data;

  logger.debug('query response of networks', data);
  return <div>{'My network page'}</div>;
}
