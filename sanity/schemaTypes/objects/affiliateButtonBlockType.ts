import { defineField, defineType } from "sanity";

const toneOptions = [
  { title: "ダーク", value: "dark" },
  { title: "ライト", value: "light" },
];

export const affiliateButtonBlockType = defineType({
  name: "affiliateButtonBlock",
  title: "アフィリエイトボタン",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "ボタン文言",
      type: "string",
      initialValue: "公式サイトを見る",
      validation: (rule) => rule.required().max(32),
    }),
    defineField({
      name: "url",
      title: "リンク URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "subcopy",
      title: "補足テキスト",
      type: "string",
      description: "ボタン下に表示する短い補足文です。",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "tone",
      title: "表示トーン",
      type: "string",
      initialValue: "dark",
      options: {
        list: toneOptions,
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "url",
    },
    prepare(selection) {
      return {
        title: selection.title || "アフィリエイトボタン",
        subtitle: selection.subtitle || "URL を設定してください",
      };
    },
  },
});
