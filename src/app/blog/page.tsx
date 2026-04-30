import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/content";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, tutorials, and insights on web development.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-4xl">
        <BlogList posts={posts} tags={tags} />
      </div>
    </div>
  );
}
