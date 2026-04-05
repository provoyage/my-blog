"use client";

import Link from "next/link";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const runtime = "edge";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const validProjectIdPattern = /^[a-z0-9-]+$/;
const hasSanityConfig = validProjectIdPattern.test(sanityProjectId);

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f7fb] px-6 py-10">
        <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Studio Setup
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-slate-950">
            /studio は追加済みですが、Sanity の projectId が未設定です
          </h1>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            本番の Vercel に real projectId を設定すると、この画面の代わりに Sanity Studio が開きます。
          </p>

          <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-medium text-slate-950">必要な環境変数</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>
              </li>
              <li>
                <code>NEXT_PUBLIC_SANITY_DATASET</code> (現在値: <code>{sanityDataset}</code>)
              </li>
            </ul>
            <p className="mt-4">
              現在の projectId: <code>{sanityProjectId || "(missing)"}</code>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              トップへ戻る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
