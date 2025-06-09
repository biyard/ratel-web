'use client'; // 이 컴포넌트는 클라이언트 컴포넌트입니다.

import Loading from '@/app/loading';
import { useRedeemCodeRequest } from '@/lib/api/models/redeem-code';
import { ratelApi } from '@/lib/api/ratel_api';
import { useApiCall } from '@/lib/api/use-send';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 훅 임포트

interface RedeemPageProps {
  params: {
    id: string;
  };
  searchParams: {
    code?: string;
  };
}

export default function RedeemPage({ params, searchParams }: RedeemPageProps) {
  const router = useRouter();

  const { id } = params;
  const { code } = searchParams;

  if (!id || !code) {
    useEffect(() => {
      console.error('Missing ID or Code parameters.');
      router.replace('/'); // 예: 홈으로 리다이렉트
    }, [router]);
    return <p>Invalid request. Redirecting...</p>;
  }

  const metaId = parseInt(id, 10);
  if (isNaN(metaId)) {
    useEffect(() => {
      console.error('Invalid ID parameter.');
      router.replace('/'); // 예: 홈으로 리다이렉트
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
        console.log('Redeem API successful:', response);

        router.replace(`/spaces/${response.meta_id}`);
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
