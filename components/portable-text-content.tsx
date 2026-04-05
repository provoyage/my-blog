import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type {
  AffiliateButtonNode,
  ComparisonBoxNode,
  PortableBodyNode,
  PortableTextBlockNode,
  PortableTextImageNode,
} from "@/lib/data/types";
import {
  getPortableTextBlockText,
  getPortableTextHeadings,
  slugifyHeading,
} from "@/lib/portable-text";

type PortableTextContentProps = {
  value: PortableBodyNode[];
};

function CompareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5h6.5M5 12h14M12.5 16.5H19" />
      <circle cx="14.5" cy="7.5" r="1.5" />
      <circle cx="9.5" cy="16.5" r="1.5" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 7.75h6.5v6.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8 16 8.25-8.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.25 13.5v4a1.75 1.75 0 0 1-1.75 1.75h-8a1.75 1.75 0 0 1-1.75-1.75v-8A1.75 1.75 0 0 1 6.5 7.75h4"
      />
    </svg>
  );
}

function buildHeadingId(
  value: PortableTextBlockNode | undefined,
  headingIdMap: Map<string, string>,
) {
  if (value?._key) {
    const mappedId = headingIdMap.get(value._key);

    if (mappedId) {
      return mappedId;
    }
  }

  return slugifyHeading(getPortableTextBlockText(value));
}

function renderAffiliateButton(value: AffiliateButtonNode) {
  if (!value.url) {
    return null;
  }

  const isLight = value.tone === "light";

  return (
    <div
      className={`mt-8 rounded-[1.75rem] p-6 sm:p-7 ${
        isLight
          ? "border border-slate-200 bg-white/90 text-slate-900"
          : "bg-slate-950 text-white shadow-[0_24px_60px_rgba(15,23,42,0.22)]"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.28em] ${
          isLight ? "text-slate-500" : "text-white/60"
        }`}
      >
        Affiliate Link
      </p>
      <a
        href={value.url}
        target="_blank"
        rel="nofollow sponsored"
        className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
          isLight
            ? "bg-slate-950 text-white hover:bg-slate-800"
            : "bg-white text-slate-950 hover:bg-stone-100"
        }`}
      >
        <ExternalLinkIcon />
        {value.label ?? "公式サイトを見る"}
      </a>
      {value.subcopy ? (
        <p className={`mt-4 text-sm leading-7 ${isLight ? "text-slate-600" : "text-white/75"}`}>
          {value.subcopy}
        </p>
      ) : null}
    </div>
  );
}

function renderComparisonBox(value: ComparisonBoxNode) {
  const items = value.items?.filter((item) => item.label || item.value) ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="glass-panel mt-8 rounded-[1.75rem] p-6 sm:p-7">
      <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        <CompareIcon />
        Compare Box
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight tracking-[-0.03em] text-slate-950 sm:text-3xl">
        {value.title ?? "比較ボックス"}
      </h3>
      {value.intro ? <p className="mt-3 text-sm leading-7 text-slate-600">{value.intro}</p> : null}
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div
            key={item._key ?? `${item.label}-${item.value}`}
            className="rounded-[1.3rem] border border-white/70 bg-white/80 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-slate-950">{item.label}</p>
              {item.emphasis ? (
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-700">
                  {item.emphasis}
                </span>
              ) : null}
            </div>
            {item.value ? <p className="mt-2 text-sm leading-7 text-slate-600">{item.value}</p> : null}
          </div>
        ))}
      </div>
      {value.note ? <p className="mt-4 text-xs leading-6 text-slate-500">{value.note}</p> : null}
    </section>
  );
}

export function PortableTextContent({ value }: PortableTextContentProps) {
  const headingIdMap = new Map(
    getPortableTextHeadings(value).map((heading) => [heading._key ?? heading.id, heading.id]),
  );

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
      h2: ({ children, value }) => (
        <h2 id={buildHeadingId(value as PortableTextBlockNode | undefined, headingIdMap)}>
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 id={buildHeadingId(value as PortableTextBlockNode | undefined, headingIdMap)}>
          {children}
        </h3>
      ),
      h4: ({ children, value }) => (
        <h4 id={buildHeadingId(value as PortableTextBlockNode | undefined, headingIdMap)}>
          {children}
        </h4>
      ),
    },
    list: {
      bullet: ({ children }) => <ul>{children}</ul>,
      number: ({ children }) => <ol>{children}</ol>,
    },
    listItem: ({ children }) => <li>{children}</li>,
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      underline: ({ children }) => <u>{children}</u>,
      highlight: ({ children }) => <mark>{children}</mark>,
      textColor: ({ children, value }) => (
        <span style={(value as { color?: string } | undefined)?.color ? { color: (value as { color?: string }).color } : undefined}>
          {children}
        </span>
      ),
    },
    types: {
      image: ({ value }) => {
        const imageValue = value as PortableTextImageNode;

        if (!imageValue.asset?.url) {
          return null;
        }

        const width = imageValue.asset.metadata?.dimensions?.width ?? 1600;
        const height = imageValue.asset.metadata?.dimensions?.height ?? 1000;

        return (
          <figure className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 p-3 sm:p-4">
            <div className="overflow-hidden rounded-[1.25rem]">
              <Image
                src={imageValue.asset.url}
                alt={imageValue.alt ?? ""}
                width={width}
                height={height}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            {imageValue.caption ? <figcaption>{imageValue.caption}</figcaption> : null}
          </figure>
        );
      },
      affiliateButtonBlock: ({ value }) => renderAffiliateButton(value as AffiliateButtonNode),
      comparisonBoxBlock: ({ value }) => renderComparisonBox(value as ComparisonBoxNode),
    },
  };

  return <PortableText value={value} components={components} />;
}
