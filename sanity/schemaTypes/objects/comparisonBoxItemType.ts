import { defineField, defineType } from "sanity";

export const comparisonBoxItemType = defineType({
  name: "comparisonBoxItem",
  title: "比較項目",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "見出し",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "value",
      title: "内容",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "emphasis",
      title: "補足ラベル",
      type: "string",
      description: "任意で小さな強調ラベルを表示します。",
      validation: (rule) => rule.max(24),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "value",
    },
  },
});
