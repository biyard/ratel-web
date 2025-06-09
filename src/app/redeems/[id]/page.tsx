'use client';

import Loading from '@/app/loading';
import { useRedeemCodeRequest } from '@/lib/api/models/redeem-code';
import { ratelApi } from '@/lib/api/ratel_api';
import { useApiCall } from '@/lib/api/use-send';
import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function RedeemPage() {
  const router = useRouter();

  const params = useParams();
  const id = Number(params.id);

  const searchParams = useSearchParams();
  const code = searchParams.get('code') ?? undefined;

  if (!id || !code) {
    useEffect(() => {
      console.error('Missing ID or Code parameters.');
      router.replace('/');
    }, [router]);
    return <p>Invalid request. Redirecting...</p>;
  }

  const idStr = Array.isArray(id) ? id[0] : id;
  const metaId = parseInt(idStr, 10);
  if (isNaN(metaId)) {
    useEffect(() => {
      console.error('Invalid ID parameter.');
      router.replace('/');
    }, [router]);
    return <p>Invalid request. Redirecting...</p>;
  }

  const { post } = useApiCall();

  useEffect(() => {
    const fetchRedeemDetails = async () => {
      try {
        console.log(`Calling redeem API for ID: ${metaId}, Code: ${code}`);
        const response: { meta_id: number } = await post(
          ratelApi.redeems.useRedeemCode(metaId),
          useRedeemCodeRequest(code),
        );
        if (!!response) {
          router.replace(`/spaces/${response.meta_id}`);
        }
      } catch (error) {
        console.error('Failed to fetch redeem details:', error);
      }
    };

    fetchRedeemDetails();
  }, [metaId, code, post, router]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Loading />
    </div>
  );
}
