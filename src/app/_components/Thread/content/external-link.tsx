import { ExternalLinkIcon } from "lucide-react"

interface ExternalLinkProps {
  url: string
  text: string
}

export function ExternalLink({ url, text }: ExternalLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-sm text-[#a1a1a1] hover:text-blue-400 transition-colors"
    >
      <ExternalLinkIcon className="w-4 h-4" />
      <span>{text}</span>
    </a>
  )
}
