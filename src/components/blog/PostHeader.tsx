import Image from "next/image";
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
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
      {post.coverImage && (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxMjEyMWEiLz48L3N2Zz4="
          />
        </div>
      )}
    </header>
  );
}
