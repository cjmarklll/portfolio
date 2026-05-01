"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { PostMeta } from "@/lib/types";

interface PostNavigationProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  const { locale } = useI18n();

  return (
    <nav className="flex justify-between gap-4 mt-16 pt-8 border-t border-border">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex-1 flex flex-col items-start gap-1 rounded-lg p-4 border border-border hover:border-accent/50 hover:bg-surface transition-all"
        >
          <span className="text-xs text-text-muted">
            ← {locale === "zh" ? "上一篇" : "Previous"}
          </span>
          <span className="text-sm font-medium text-white group-hover:text-accent-bright transition-colors line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex-1 flex flex-col items-end gap-1 rounded-lg p-4 border border-border hover:border-accent/50 hover:bg-surface transition-all"
        >
          <span className="text-xs text-text-muted">
            {locale === "zh" ? "下一篇" : "Next"} →
          </span>
          <span className="text-sm font-medium text-white group-hover:text-accent-bright transition-colors line-clamp-1">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
