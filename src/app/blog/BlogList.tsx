"use client";

import { useState } from "react";
import PostCard from "@/components/blog/PostCard";
import TagFilter from "@/components/blog/TagFilter";
import { useI18n } from "@/lib/i18n/context";
import { PostMeta } from "@/lib/types";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const { t } = useI18n();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) =>
        p.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
      )
    : posts;

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-heading mb-4">
        {t.blog.title}
      </h1>
      <p className="text-text-muted mb-10">
        {t.blog.subtitle}
      </p>
      <TagFilter
        tags={tags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        allLabel={t.blog.allTags}
      />
      <div className="grid gap-6">
        {filtered.length > 0 ? (
          filtered.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p className="text-text-muted text-center py-12">
            {t.blog.noPosts}
          </p>
        )}
      </div>
    </>
  );
}
