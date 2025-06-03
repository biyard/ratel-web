"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Bold, Italic, Underline, Strikethrough, Code, Link, ImageIcon, Smile } from "lucide-react"

interface ReplyEditorProps {
  onSubmit: (content: string) => void
  onCancel?: () => void
  placeholder?: string
}

export function ReplyEditor({
  onSubmit,
  onCancel,
  placeholder = "Type here. Use Markdown, BB code, or HTML to format. Drag or paste images.",
}: ReplyEditorProps) {
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
      setContent("")
    }
  }

  const formatTools = [
    { icon: Bold, tooltip: "Bold" },
    { icon: Italic, tooltip: "Italic" },
    { icon: Underline, tooltip: "Underline" },
    { icon: Strikethrough, tooltip: "Strikethrough" },
    { icon: Code, tooltip: "Code" },
    { icon: Link, tooltip: "Link" },
    { icon: ImageIcon, tooltip: "Image" },
    { icon: Smile, tooltip: "Emoji" },
  ]

  return (
    <div className="bg-[#262626] rounded-lg p-30 m-16">
      <Input
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-transparent border-none text-lg p-24 placeholder:text-[#a1a1a1] focus-visible:ring-2"
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
      />
      <Separator className="my-2 bg-[#404040]" />
      <div className="flex items-center justify-between m-12">
        <div className="flex items-center gap-8">
          {formatTools.map((tool, index) => (
            <Button
              key={index}
              variant="rounded_secondary"
              size="sm"
              className="h-40 w-40 text-[#a1a1a1] hover:text-white"
              title={tool.tooltip}
            >
              <tool.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-16">
          {onCancel && (
            <Button variant="outline" size="sm" className="h-6 text-[#a1a1a1] hover:text-white p-20" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            className="bg-[#fcb300] hover:bg-[#fcb300]/80 text-black text-lg h-6 px-3 p-20"
            onClick={handleSubmit}
            disabled={!content.trim()}
            variant="outline"
            size={"lg"}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  )
}
