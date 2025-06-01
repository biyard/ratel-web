import { Download } from "lucide-react"
import type { AttachedFile } from "@/types"

interface FileAttachmentProps {
  file: AttachedFile
}

export function FileAttachment({ file }: FileAttachmentProps) {
  const getFileColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-600"
      case "doc":
        return "bg-blue-600"
      case "img":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="bg-[#262626] rounded-lg p-3 flex items-center gap-2 hover:bg-[#333333] transition-colors cursor-pointer">
      <div className={`w-8 h-8 ${getFileColor(file.type)} rounded flex items-center justify-center text-xs font-bold`}>
        {file.type.toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate">{file.name}</div>
        <div className="text-xs text-[#a1a1a1]">{file.size}</div>
      </div>
      <Download className="w-4 h-4 text-[#a1a1a1] hover:text-white transition-colors" />
    </div>
  )
}
