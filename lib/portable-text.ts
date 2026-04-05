import type { PortableBodyNode, PortableTextBlockNode } from "@/lib/data/types";

export type PortableTextHeading = {
  _key?: string;
  id: string;
  title: string;
  level: 2 | 3 | 4;
};

export function getPortableTextBlockText(block: PortableTextBlockNode | null | undefined) {
  if (!block?.children?.length) {
    return "";
  }

  return block.children
    .filter((child) => child._type === "span")
    .map((child) => child.text)
    .join("")
    .trim();
}

export function slugifyHeading(text: string) {
  const normalized = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "section";
}

export function getPortableTextHeadings(body: PortableBodyNode[]) {
  const counts = new Map<string, number>();
  const headings: PortableTextHeading[] = [];

  for (const node of body) {
    if (node._type !== "block") {
      continue;
    }

    if (node.style !== "h2" && node.style !== "h3" && node.style !== "h4") {
      continue;
    }

    const title = getPortableTextBlockText(node);

    if (!title) {
      continue;
    }

    const baseId = slugifyHeading(title);
    const nextCount = (counts.get(baseId) ?? 0) + 1;
    counts.set(baseId, nextCount);

    headings.push({
      _key: node._key,
      id: nextCount === 1 ? baseId : `${baseId}-${nextCount}`,
      title,
      level: Number(node.style.slice(1)) as 2 | 3 | 4,
    });
  }

  return headings;
}

export function getPortableTextPlainText(body: PortableBodyNode[]) {
  return body
    .map((node) => {
      if (node._type === "block") {
        return getPortableTextBlockText(node);
      }

      if (node._type === "affiliateButtonBlock") {
        return [node.label, node.subcopy].filter(Boolean).join("\n");
      }

      if (node._type === "comparisonBoxBlock") {
        const itemText = (node.items ?? [])
          .map((item) => [item.label, item.value, item.emphasis].filter(Boolean).join(": "))
          .join("\n");

        return [node.title, node.intro, itemText, node.note].filter(Boolean).join("\n");
      }

      if (node._type === "image") {
        return [node.alt, node.caption].filter(Boolean).join("\n");
      }

      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
