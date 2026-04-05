import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: posts[0]?.publishedAt ?? new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/opengraph-image")],
    },
    {
      url: absoluteUrl("/articles"),
      lastModified: posts[0]?.publishedAt ?? new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/articles/${post.slug}`),
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.9 : 0.7,
      images: [absoluteUrl(`/articles/${post.slug}/opengraph-image`)],
    })),
  ];
}
