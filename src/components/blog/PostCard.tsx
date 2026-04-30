"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n/context";
import { PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const { locale } = useI18n();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] relative overflow-hidden"
      >
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-bright transition-colors">
            {post.title}
          </h3>
          <p className="text-text-muted text-sm mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
