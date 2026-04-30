import Badge from "@/components/ui/Badge";
import { PostMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostHeaderProps {
  post: PostMeta;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-4">
        <time>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
      {post.coverImage && (
        <div className="mt-6 w-full h-64 rounded-xl bg-surface-bright overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </header>
  );
}
