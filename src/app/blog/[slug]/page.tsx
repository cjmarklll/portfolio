import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/content";
import { mdxOptions } from "@/lib/mdx";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import PostHeader from "@/components/blog/PostHeader";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: MDXComponents,
    options: { mdxOptions } as any,
  });

  return (
    <article className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-3xl">
        <PostHeader post={post} />
        <div className="prose-custom">{content}</div>
      </div>
    </article>
  );
}
