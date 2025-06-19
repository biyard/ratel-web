import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { AttachedFile } from '@/types';
import { ExternalLink } from './external-link';
import { FileAttachment } from './file-attachment';
import Image from 'next/image';

interface MainContentProps {
  files: AttachedFile[];
  links: { url: string; text: string }[];
}

export function MainContent({ files, links }: MainContentProps) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            Crypto/Temporary Increase of Staking Rewards to 8% for 90 Days
          </h1>
          <Badge className="bg-green-600 hover:bg-green-600">Active</Badge>
        </div>
        <Button className="bg-white p-12 hover:bg-[#fcb300]/80 text-black">
          <Plus className="siz-e" />
          Create a Space
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Summary</h2>
        <p className="text-[#a1a1a1] text-sm leading-relaxed">
          This proposal suggests a temporary increase of the staking rewards
          from 6% to 8% APR for a trial period of 90 days. The goal is to boost
          staking participation, enhance long-term commitment from token
          holders, and assess how a slightly more generous reward structure
          impacts token velocity, treasury health, and user behavior.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Motivation</h2>
        <div className="text-[#a1a1a1] text-sm leading-relaxed space-y-3">
          <p>
            Over the past month, staking participation has declined by
            approximately 12%. This downward trend may be partially due to the
            low competitiveness of our current APR compared to similar projects
            in the ecosystem.
          </p>
          <p>
            This proposal aims to test whether a modest increase in rewards can
            reverse this trend and promote deeper engagement.
          </p>
          <p>
            We believe this is a data-driven opportunity to improve DAO growth,
            especially if paired with UI enhancements that improve staking
            visibility and clarity.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-[#262626] rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <span className="text-sm">Total Staking Rewards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm">ETH/STORE</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-red-400 text-sm">-20%</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-blue-400 text-sm">15%</span>
              </div>
            </div>
          </div>
          <div className="relative h-64">
            <Image
              src="/ratel.png"
              alt="Staking rewards chart showing declining red line and blue area chart"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mb-60 mt-24">
        <h2 className="text-lg font-semibold mb-30">Attached Files</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {files.map((file) => (
            <FileAttachment key={file.id} file={file} />
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-16">
        {links.map((link, index) => (
          <div
            className="py-12 bg-[#262626] rounded-lg hover:bg-[#333333] transition-colors"
            key={index}
          >
            <ExternalLink key={index} url={link.url} text={link.text} />
            {/* <hr /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
