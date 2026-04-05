import { defineArrayMember, defineField, defineType } from "sanity";

const categoryOptions = [
  { title: "白髪・頭皮ケア", value: "gray-hair-scalp" },
  { title: "乾燥・くすみ", value: "dry-skin-dullness" },
  { title: "ニオイケア", value: "odor-care" },
  { title: "美容サプリ", value: "beauty-supplement" },
];

const articleTypeOptions = [
  { title: "比較", value: "comparison" },
  { title: "ランキング", value: "ranking" },
  { title: "レビュー", value: "review" },
  { title: "悩み解説", value: "concern" },
];

const textColorOptions = [
  { title: "チャコール", value: "#243041" },
  { title: "ローズ", value: "#b45367" },
  { title: "アンバー", value: "#b66a1e" },
  { title: "モスグリーン", value: "#4d6b57" },
  { title: "ネイビー", value: "#34516f" },
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
      title: "カード要約",
      type: "text",
      rows: 3,
      description:
        "一覧カードや記事冒頭で使う短い要約です。未入力の場合は description を流用します。",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO説明文",
      type: "text",
      rows: 3,
      description: "未入力の場合は description / excerpt から自動生成されます。",
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
      name: "body",
      title: "本文",
      type: "array",
      description: "見出し、画像、比較ボックス、アフィリエイトボタンを差し込みできます。",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "通常", value: "normal" },
            { title: "見出し 2", value: "h2" },
            { title: "見出し 3", value: "h3" },
            { title: "見出し 4", value: "h4" },
          ],
          lists: [
            { title: "箇条書き", value: "bullet" },
            { title: "番号付き", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "太字", value: "strong" },
              { title: "下線", value: "underline" },
              { title: "マーカー", value: "highlight" },
            ],
            annotations: [
              defineArrayMember({
                name: "textColor",
                title: "文字色",
                type: "object",
                fields: [
                  defineField({
                    name: "color",
                    title: "カラー",
                    type: "string",
                    options: {
                      list: textColorOptions,
                      layout: "dropdown",
                    },
                    validation: (rule) => rule.required(),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "代替テキスト",
              type: "string",
              validation: (rule) => rule.max(120),
            }),
            defineField({
              name: "caption",
              title: "キャプション",
              type: "string",
              validation: (rule) => rule.max(160),
            }),
          ],
        }),
        defineArrayMember({ type: "affiliateButtonBlock" }),
        defineArrayMember({ type: "comparisonBoxBlock" }),
      ],
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
      description: "入力するとカードや記事導線に順位が表示されます。",
      validation: (rule) => rule.integer().min(1).max(100),
    }),
    defineField({
      name: "affiliateUrl",
      title: "アフィリエイト URL",
      type: "url",
      description: "入力するとカードと記事導線に購入ボタンが表示されます。",
      validation: (rule) => rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "affiliateLabel",
      title: "アフィリエイト文言",
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
  },
});
