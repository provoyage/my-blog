import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type ArticleOgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ArticleOgImageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #fff7f3 0%, #ffffff 45%, #ecf2ee 100%)",
          color: "#172231",
          padding: "48px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "12px 18px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(88,97,109,0.12)",
              fontSize: 22,
            }}
          >
            {post?.categoryName ?? siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#5c6878",
            }}
          >
            {post ? `${post.targetAge}向け ${post.articleType}` : "Beauty Article"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "940px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.05em",
              flexWrap: "wrap",
            }}
          >
            {post?.title ?? "Article not found"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.45,
              color: "#4d596d",
              flexWrap: "wrap",
            }}
          >
            {post?.description ??
              "40代女性の見た目悩みに合わせた美容比較記事です。"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#5e6a7a",
          }}
        >
          <div style={{ display: "flex" }}>{post?.appealAxis ?? "Beauty Media"}</div>
          <div style={{ display: "flex" }}>{post?.targetConcern.join(" / ") ?? ""}</div>
        </div>
      </div>
    ),
    size,
  );
}
