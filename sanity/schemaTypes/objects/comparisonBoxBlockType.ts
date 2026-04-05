import { defineArrayMember, defineField, defineType } from "sanity";

export const comparisonBoxBlockType = defineType({
  name: "comparisonBoxBlock",
  title: "比較ボックス",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "intro",
      title: "導入文",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "items",
      title: "比較項目",
      type: "array",
      of: [defineArrayMember({ type: "comparisonBoxItem" })],
      validation: (rule) => rule.required().min(2).max(6),
    }),
    defineField({
      name: "note",
      title: "補足",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "intro",
    },
    prepare(selection) {
      return {
        title: selection.title || "比較ボックス",
        subtitle: selection.subtitle || "比較項目を入力してください",
      };
    },
  },
});
