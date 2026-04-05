import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #fff6f2 0%, #ffffff 45%, #e9f1ee 100%)",
          color: "#1b2431",
          padding: "52px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 9999,
              background: "#d98d7d",
              display: "flex",
            }}
          />
          {siteConfig.name}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "920px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 74,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              flexWrap: "wrap",
            }}
          >
            40代女性の見た目悩みを
            <br />
            比較で整える美容メディア
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.5,
              color: "#536071",
              flexWrap: "wrap",
              maxWidth: "840px",
            }}
          >
            白髪・頭皮、乾燥肌・くすみ、体臭・口臭、美容サプリを
            比較記事とランキング記事で選びやすく整理
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
          <div style={{ display: "flex" }}>Comparison / Ranking / Review</div>
          <div style={{ display: "flex" }}>Clean and Trustworthy</div>
        </div>
      </div>
    ),
    size,
  );
}
