import { LinkIcon } from 'lucide-react';

interface ExternalLinkProps {
  url: string;
  text: string;
}

export function ExternalLink({ url, text }: ExternalLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-12 text-sm m-12 text-[#a1a1a1] hover:text-blue-400 transition-colors"
    >
      <LinkIcon className="w-24 h-24" />
      <span className="text-xl">{text}</span>
      {/* <hr className="m-2 h-4 w-12" /> */}
    </a>
  );
}
