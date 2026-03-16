export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function generateToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const headings: TocItem[] = [];

  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const text = match[2].replace(/\*\*/g, "").replace(/`/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-")
        .replace(/^-+|-+$/g, "");
      headings.push({
        level: match[1].length,
        text,
        id,
      });
    }
  }

  return headings;
}

export function addIdsToHtml(html: string): string {
  return html.replace(
    /<(h[23])>(.*?)<\/h[23]>/g,
    (_, tag, content) => {
      const text = content.replace(/<[^>]+>/g, "").replace(/\*\*/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\u3000-\u9fff\uff00-\uffef]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return `<${tag} id="${id}">${content}</${tag}>`;
    }
  );
}
