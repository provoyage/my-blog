import { defineArrayMember, defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "白髪・頭皮", value: "gray-hair-scalp" },
  { title: "乾燥・くすみ", value: "dry-skin-dullness" },
  { title: "ニオイケア", value: "odor-care" },
  { title: "美容サプリ", value: "beauty-supplement" },
];

const articleTypeOptions = [
  { title: "比較", value: "comparison" },
  { title: "ランキング", value: "ranking" },
  { title: "レビュー", value: "review" },
  { title: "悩み解決", value: "concern" },
];

export const postType = defineType({
  name: "post",
  title: "記事",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required().min(8).max(120),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "説明文",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20).max(220),
    }),
    defineField({
      name: "excerpt",
      title: "カード用要約",
      type: "text",
      rows: 3,
      description: "一覧カードで使う短い要約です。未入力でも description で代替できます。",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO説明文",
      type: "text",
      rows: 3,
      description: "未入力なら description / excerpt から自動生成されます。",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "mainImage",
      title: "メイン画像",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: categoryOptions,
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "articleType",
      title: "記事タイプ",
      type: "string",
      options: {
        list: articleTypeOptions,
        layout: "radio",
      },
      initialValue: "concern",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "targetConcern",
      title: "悩みタグ",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "rankingRank",
      title: "ランキング順位",
      type: "number",
      description: "入力するとカードに王冠アイコン付きで順位が表示されます。",
      validation: (rule) => rule.integer().min(1).max(100),
    }),
    defineField({
      name: "affiliateUrl",
      title: "アフィリエイトURL",
      type: "url",
      description: "入力するとカードと記事内に外部ボタンが表示されます。",
      validation: (rule) => rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "affiliateLabel",
      title: "アフィリエイトボタン文言",
      type: "string",
      initialValue: "公式サイトを見る",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "publishedAt",
      title: "公開日",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      };
    },
  },
});
