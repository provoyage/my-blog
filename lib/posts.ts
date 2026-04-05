import { articleSeeds } from "@/lib/data/articles";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { rankingOrders } from "@/lib/data/rankings";
import type {
  ArticleType,
  CategorySlug,
  MediaCategory,
  Post,
  Product,
  RankingKey,
} from "@/lib/data/types";

export type {
  ArticleType,
  CategorySlug,
  ComparisonPoint,
  MediaCategory,
  Post,
  PostSection,
  Product,
  RankingKey,
} from "@/lib/data/types";

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

export function getAllPosts() {
  return [...allPosts].sort(
    (left, right) => Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
  );
}

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: CategorySlug) {
  return getAllPosts().filter((post) => post.categorySlug === categorySlug);
}

export function getPostsByType(articleType: ArticleType) {
  return getAllPosts().filter((post) => post.articleType === articleType);
}

export function getLatestPosts(limit = 4) {
  return getAllPosts().slice(0, limit);
}

export function getPopularPosts(limit = 4) {
  return [...allPosts]
    .sort((left, right) => right.popularity - left.popularity)
    .slice(0, limit);
}

export function getFeaturedPost() {
  return (
    [...allPosts]
      .filter((post) => post.featured)
      .sort((left, right) => right.popularity - left.popularity)[0] ?? getPopularPosts(1)[0]
  );
}

export function getFeaturedComparisonPost() {
  return [...allPosts]
    .filter((post) => post.articleType === "comparison")
    .sort((left, right) => right.popularity - left.popularity)[0];
}

export function getFeaturedRankingPost() {
  return [...allPosts]
    .filter((post) => post.articleType === "ranking")
    .sort((left, right) => right.popularity - left.popularity)[0];
}

export function getRelatedPosts(slug: string, limit = 3) {
  const currentPost = getPostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  return [...allPosts]
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
  return post.sections.map((section) => `${section.heading}\n${section.body}`).join("\n\n");
}

export function getCategoryWithCounts() {
  return categories.map((category) => ({
    ...category,
    productCount: products.filter((product) => product.categorySlug === category.slug).length,
    articleCount: allPosts.filter((post) => post.categorySlug === category.slug).length,
  }));
}
