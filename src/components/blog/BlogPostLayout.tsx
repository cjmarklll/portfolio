"use client";

import ReadingProgress from "./ReadingProgress";
import PostNavigation from "./PostNavigation";
import { PostMeta } from "@/lib/types";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  prev: PostMeta | null;
  next: PostMeta | null;
}

export default function BlogPostLayout({
  children,
  prev,
  next,
}: BlogPostLayoutProps) {
  return (
    <>
      <ReadingProgress />
      {children}
      <PostNavigation prev={prev} next={next} />
    </>
  );
}
