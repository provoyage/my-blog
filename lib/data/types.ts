export type ArticleType = "comparison" | "ranking" | "review" | "concern";

export type CategorySlug =
  | "gray-hair-scalp"
  | "dry-skin-dullness"
  | "odor-care"
  | "beauty-supplement";

export type RankingKey = "overall" | CategorySlug;

export type ComparisonPoint = {
  label: string;
  value: string;
};

export type MediaCategory = {
  slug: CategorySlug;
  name: string;
  heroLabel: string;
  description: string;
  summary: string;
  concerns: string[];
  image: string;
  imageAlt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: CategorySlug;
  image: string;
  imageAlt: string;
  score: number;
  rating: number;
  reviewCount: number;
  priceLabel: string;
  badge: string;
  summary: string;
  featureLabels: string[];
  strengths: string[];
  bestFor: string;
  caution: string;
  affiliateUrl: string;
  ctaLabel: string;
  reviewArticleSlug?: string;
  comparisonPoints: ComparisonPoint[];
  featured?: boolean;
};

export type PostSection = {
  id: string;
  heading: string;
  body: string;
};

export type PortableTextSpan = {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type PortableTextMarkDef =
  | {
      _key?: string;
      _type: "textColor";
      color?: string;
    }
  | {
      _key?: string;
      _type: string;
      [key: string]: unknown;
    };

export type PortableTextBlockNode = {
  _key?: string;
  _type: "block";
  style?: "normal" | "h2" | "h3" | "h4";
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  listItem?: "bullet" | "number";
  level?: number;
};

export type PortableTextImageNode = {
  _key?: string;
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
};

export type AffiliateButtonNode = {
  _key?: string;
  _type: "affiliateButtonBlock";
  label?: string;
  url?: string;
  subcopy?: string;
  tone?: "dark" | "light";
};

export type ComparisonBoxItem = {
  _key?: string;
  label?: string;
  value?: string;
  emphasis?: string;
};

export type ComparisonBoxNode = {
  _key?: string;
  _type: "comparisonBoxBlock";
  title?: string;
  intro?: string;
  items?: ComparisonBoxItem[];
  note?: string;
};

export type PortableBodyNode =
  | PortableTextBlockNode
  | PortableTextImageNode
  | AffiliateButtonNode
  | ComparisonBoxNode;

export type PostSeed = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  seoDescription?: string;
  image: string;
  imageAlt: string;
  categorySlug: CategorySlug;
  articleType: ArticleType;
  targetConcern: string[];
  targetAge: string;
  appealAxis: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  author: string;
  popularity: number;
  featured?: boolean;
  keywords: string[];
  summaryPoints: string[];
  ctaText: string;
  sections: PostSection[];
  body?: PortableBodyNode[];
  productIds?: string[];
  rankingKey?: RankingKey;
  rankingRank?: number;
  affiliateUrl?: string;
  affiliateLabel?: string;
};

export type Post = PostSeed & {
  categoryName: string;
  productIds: string[];
};
