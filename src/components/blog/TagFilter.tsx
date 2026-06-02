"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  allLabel?: string;
}

export default function TagFilter({ tags, activeTag, onTagChange, allLabel = "All" }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onTagChange(null)}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm transition-all border",
          !activeTag
            ? "bg-accent text-heading border-accent"
            : "bg-transparent text-text-muted border-border hover:border-accent/50"
        )}
      >
        {allLabel}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm transition-all border",
            activeTag === tag
              ? "bg-accent text-heading border-accent"
              : "bg-transparent text-text-muted border-border hover:border-accent/50"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
