import { cache } from "react";
import { articleSeeds } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { rankingOrders } from "@/lib/data/rankings";
import type {
  ArticleType,
  CategorySlug,
  MediaCategory,
  Post,
  PortableBodyNode,
  Product,
  RankingKey,
} from "@/lib/data/types";
import { getPortableTextPlainText } from "@/lib/portable-text";
import { client, hasSanityConfig, sanityDataset, sanityProjectId } from "@/lib/sanity";

export type {
  ArticleType,
  CategorySlug,
  ComparisonPoint,
  MediaCategory,
  Post,
  PortableBodyNode,
  PostSection,
  Product,
  RankingKey,
} from "@/lib/data/types";

type SanityImageSource =
  | string
  | {
      asset?: {
        _id?: string;
        _ref?: string;
        url?: string;
        metadata?: {
          dimensions?: {
            width?: number;
            height?: number;
          };
        };
      } | null;
    }
  | null
  | undefined;

type SanityPostDocument = {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  excerpt?: string | null;
  seoDescription?: string | null;
  mainImage?: SanityImageSource;
  category?:
    | string
    | {
        current?: string | null;
        slug?: {
          current?: string | null;
        } | null;
      }
    | null;
  articleType?: string | null;
  targetConcern?: string[] | null;
  rankingRank?: number | null;
  affiliateUrl?: string | null;
  affiliateLabel?: string | null;
  publishedAt?: string | null;
  body?: PortableBodyNode[] | null;
};

export const articleTypeLabels: Record<ArticleType, string> = {
  comparison: "比較",
  ranking: "ランキング",
  review: "レビュー",
  concern: "悩み解決",
};

const categoryMap = new Map<CategorySlug, MediaCategory>(
  categories.map((category) => [category.slug, category]),
);

const productMap = new Map<string, Product>(products.map((product) => [product.id, product]));

function resolveRankingIds(key: RankingKey) {
  return rankingOrders[key] ?? [];
}

function resolvePostProductIds(post: (typeof articleSeeds)[number]) {
  if (post.rankingKey) {
    return resolveRankingIds(post.rankingKey);
  }

  return post.productIds ?? [];
}

const allPosts: Post[] = articleSeeds.map((post) => ({
  ...post,
  categoryName: categoryMap.get(post.categorySlug)?.name ?? post.categorySlug,
  productIds: resolvePostProductIds(post),
}));

const localPostMap = new Map<string, Post>(allPosts.map((post) => [post.slug, post]));

const sanityPostQuery = `*[_type == "post"]{
  title,
  "slug": slug.current,
  description,
  excerpt,
  seoDescription,
  mainImage,
  category,
  articleType,
  targetConcern,
  rankingRank,
  affiliateUrl,
  affiliateLabel,
  publishedAt,
  body[]{
    ...,
    markDefs[]{
      ...
    },
    _type == "image" => {
      ...,
      asset->{
        url,
        metadata {
          dimensions
        }
      }
    }
  }
}`;

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

const emptyFeaturedPost: Post = {
  slug: "",
  title: "記事を準備中です",
  description: "Sanity に記事が登録されるとここに表示されます。",
  excerpt: "Sanity に記事が登録されるとここに表示されます。",
  seoDescription: "Sanity に記事がまだありません。公開されるとここに表示されます。",
  image: categories[0]?.image ?? "/media/categories/gray-hair.jpg",
  imageAlt: "記事準備中",
  categorySlug: "gray-hair-scalp",
  categoryName: categoryMap.get("gray-hair-scalp")?.name ?? "記事",
  articleType: "concern",
  targetConcern: [],
  targetAge: "40代向け",
  appealAxis: "記事準備中",
  publishedAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  readTime: "7分",
  author: "編集部",
  popularity: 0,
  keywords: [],
  summaryPoints: [],
  ctaText: "詳しく見る",
  sections: [],
  body: [],
  productIds: [],
  affiliateLabel: "公式サイトを見る",
};

function extractCategoryValue(category: SanityPostDocument["category"]) {
  if (typeof category === "string") {
    return category;
  }

  if (category?.slug?.current) {
    return category.slug.current;
  }

  if (category?.current) {
    return category.current;
  }

  return undefined;
}

function isCategorySlug(value: string): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

function resolveCategorySlug(value: string | undefined, fallback?: CategorySlug) {
  if (value && isCategorySlug(value)) {
    return value;
  }

  if (value) {
    const matchedCategory = categories.find((category) => category.name === value);

    if (matchedCategory) {
      return matchedCategory.slug;
    }
  }

  return fallback;
}

function resolveArticleType(value: string | null | undefined, fallback?: ArticleType) {
  if (value === "comparison" || value === "ranking" || value === "review" || value === "concern") {
    return value;
  }

  return fallback;
}

function buildSanityImageUrl(mainImage: SanityImageSource) {
  if (!mainImage) {
    return undefined;
  }

  if (typeof mainImage === "string") {
    return mainImage;
  }

  if (mainImage.asset?.url) {
    return mainImage.asset.url;
  }

  const assetRef = mainImage.asset?._ref ?? mainImage.asset?._id;

  if (!assetRef || !hasSanityConfig) {
    return undefined;
  }

  const match = assetRef.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-([a-z0-9]+)$/);

  if (!match) {
    return undefined;
  }

  const [, assetId, dimensions, format] = match;

  return `https://cdn.sanity.io/images/${sanityProjectId}/${sanityDataset}/${assetId}-${dimensions}.${format}`;
}

function normalizeSanityPost(document: SanityPostDocument): Post | null {
  if (!document.slug || !document.title) {
    return null;
  }

  const localPost = localPostMap.get(document.slug);
  const categoryValue = extractCategoryValue(document.category);
  const categorySlug =
    resolveCategorySlug(categoryValue, localPost?.categorySlug) ?? "gray-hair-scalp";
  const categoryName =
    categoryMap.get(categorySlug)?.name ?? categoryValue ?? localPost?.categoryName ?? categorySlug;
  const articleType = resolveArticleType(document.articleType, localPost?.articleType) ?? "concern";
  const publishedAt = document.publishedAt ?? localPost?.publishedAt ?? new Date().toISOString();
  const categoryMeta = categoryMap.get(categorySlug);
  const image =
    buildSanityImageUrl(document.mainImage) ??
    localPost?.image ??
    categoryMeta?.image ??
    emptyFeaturedPost.image;
  const targetConcern =
    document.targetConcern?.filter((value): value is string => typeof value === "string") ??
    localPost?.targetConcern ??
    categoryMeta?.concerns.slice(0, 2) ??
    [categoryName];
  const excerpt =
    localPost?.excerpt ??
    `${categoryName}に関する${getArticleTypeLabel(articleType)}記事です。`;

  const normalizedDescription = document.description ?? localPost?.description ?? document.title;
  const normalizedExcerpt =
    document.excerpt ?? localPost?.excerpt ?? excerpt ?? truncateText(normalizedDescription, 110);
  const normalizedSeoDescription =
    document.seoDescription ??
    localPost?.seoDescription ??
    truncateText(document.excerpt ?? normalizedDescription, 140);

  return {
    slug: document.slug,
    title: document.title,
    description: normalizedDescription,
    excerpt: normalizedExcerpt,
    seoDescription: normalizedSeoDescription,
    image,
    imageAlt: localPost?.imageAlt ?? document.title,
    categorySlug,
    categoryName,
    articleType,
    targetConcern,
    targetAge: localPost?.targetAge ?? "40代向け",
    appealAxis: localPost?.appealAxis ?? getArticleTypeLabel(articleType),
    publishedAt,
    updatedAt: localPost?.updatedAt ?? publishedAt,
    readTime: localPost?.readTime ?? "1分",
    author: localPost?.author ?? "編集部",
    popularity: localPost?.popularity ?? 0,
    featured: localPost?.featured,
    keywords: localPost?.keywords ?? [],
    summaryPoints: localPost?.summaryPoints ?? targetConcern,
    ctaText: localPost?.ctaText ?? "詳しく見る",
    sections: localPost?.sections ?? [],
    body: document.body ?? localPost?.body ?? [],
    productIds: localPost?.productIds ?? [],
    rankingKey: localPost?.rankingKey,
    rankingRank: document.rankingRank ?? localPost?.rankingRank,
    affiliateUrl: document.affiliateUrl ?? localPost?.affiliateUrl,
    affiliateLabel: document.affiliateLabel ?? localPost?.affiliateLabel ?? "公式サイトを見る",
  };
}

const getSanityPosts = cache(async () => {
  if (!hasSanityConfig) {
    return [] as Post[];
  }

  try {
    const documents = await client.fetch<SanityPostDocument[]>(sanityPostQuery);

    return documents
      .map(normalizeSanityPost)
      .filter((post): post is Post => Boolean(post))
      .sort((left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt));
  } catch {
    return [] as Post[];
  }
});

const getDisplayPosts = cache(async () => {
  const sanityPosts = await getSanityPosts();

  if (sanityPosts.length === 0) {
    return getSeedPosts();
  }

  const mergedPosts = new Map<string, Post>(allPosts.map((post) => [post.slug, post]));

  for (const post of sanityPosts) {
    const localPost = mergedPosts.get(post.slug);
    mergedPosts.set(post.slug, localPost ? { ...localPost, ...post } : post);
  }

  return [...mergedPosts.values()].sort(
    (left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );
});

export function getArticleTypeLabel(articleType: ArticleType) {
  return articleTypeLabels[articleType];
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: CategorySlug) {
  return categoryMap.get(slug);
}

export function getAllProducts() {
  return products;
}

export function getProductById(id: string) {
  return productMap.get(id);
}

export function getProductsByIds(ids: string[]) {
  return ids
    .map((id) => productMap.get(id))
    .filter((product): product is Product => Boolean(product));
}

export function getRankedProductsByKey(key: RankingKey, limit?: number) {
  const list = getProductsByIds(resolveRankingIds(key));
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getRankedProductsByCategory(categorySlug: CategorySlug, limit?: number) {
  return getRankedProductsByKey(categorySlug, limit);
}

export function getTopRankedProducts(limit = 3) {
  return getRankedProductsByKey("overall", limit);
}

export function getFeaturedProducts(limit = 4) {
  const featuredIds = [
    ...rankingOrders.overall.filter((id) => productMap.get(id)?.featured),
    ...products.filter((product) => product.featured).map((product) => product.id),
  ];

  return getProductsByIds([...new Set(featuredIds)]).slice(0, limit);
}

function getSeedPosts() {
  return [...allPosts].sort(
    (left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );
}

export async function getAllPosts() {
  return getDisplayPosts();
}

export async function getPostBySlug(slug: string) {
  const posts = await getDisplayPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getPostsByCategory(categorySlug: CategorySlug) {
  const posts = await getDisplayPosts();
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export async function getPostsByType(articleType: ArticleType) {
  const posts = await getDisplayPosts();
  return posts.filter((post) => post.articleType === articleType);
}

export async function getLatestPosts(limit = 4) {
  const posts = await getDisplayPosts();
  return posts.slice(0, limit);
}

export async function getPopularPosts(limit = 4) {
  const posts = await getDisplayPosts();
  return [...posts]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, limit);
}

export async function getFeaturedPost() {
  const posts = await getDisplayPosts();
  return (
    [...posts]
      .filter((post) => post.featured)
      .sort((left, right) => right.popularity - left.popularity)[0] ?? posts[0] ?? emptyFeaturedPost
  );
}

export async function getFeaturedComparisonPost() {
  const posts = await getDisplayPosts();
  return [...posts]
    .filter((post) => post.articleType === "comparison")
    .sort((left, right) => right.popularity - left.popularity)[0];
}

export async function getFeaturedRankingPost() {
  const posts = await getDisplayPosts();
  return [...posts]
    .filter((post) => post.articleType === "ranking")
    .sort((left, right) => right.popularity - left.popularity)[0];
}

export async function getRelatedPosts(slug: string, limit = 3) {
  const posts = await getDisplayPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  return [...posts]
    .filter((post) => post.slug !== slug)
    .sort((left, right) => {
      const leftScore =
        (left.categorySlug === currentPost.categorySlug ? 2 : 0) +
        (left.articleType === currentPost.articleType ? 1 : 0) +
        left.popularity / 100;
      const rightScore =
        (right.categorySlug === currentPost.categorySlug ? 2 : 0) +
        (right.articleType === currentPost.articleType ? 1 : 0) +
        right.popularity / 100;

      return rightScore - leftScore;
    })
    .slice(0, limit);
}

export function getPostBodyText(post: Post) {
  if (post.body && post.body.length > 0) {
    return getPortableTextPlainText(post.body);
  }

  return post.sections.map((section) => `${section.heading}\n${section.body}`).join("\n\n");
}

export function getPostMetaDescription(post: Post) {
  return truncateText(post.seoDescription ?? post.description ?? post.excerpt ?? post.title, 140);
}

export async function getCategoryWithCounts() {
  const posts = await getDisplayPosts();

  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categorySlug === category.slug).length,
    articleCount: posts.filter((post) => post.categorySlug === category.slug).length,
  }));
}
