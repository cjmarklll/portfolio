import RSS from "rss";
import { getAllPosts } from "@/lib/content";
import { siteConfig } from "@/lib/constants";

export async function GET() {
  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: "en",
  });

  getAllPosts().forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      date: post.date,
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: { "Content-Type": "application/xml" },
  });
}
