"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { SectionType } from "@/types"

interface CollapsibleSectionProps {
  section: SectionType
}

export function CollapsibleSection({ section }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(section.isOpen)

  return (
    <div>
      <div className="flex items-center justify-between mb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-sm font-medium">{section.title}</span>
        <ChevronDown className={`w-16 h-16 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && (
        <div className="space-y-1 text-sm text-[#a1a1a1]">
          {section.items.map((item, index) => (
            <div key={index} className="hover:text-white cursor-pointer transition-colors">
              {item}
            </div>
          ))}
          <Button variant="outline" className="text-[#a1a1a1] p-0 h-auto mt-1 text-sm hover:text-white">
            View all →
          </Button>
        </div>
      )}
    </div>
  )
}
