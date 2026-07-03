import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(value?: string) {
  if (!value) return "";

  return marked.parse(value, {
    async: false,
  }) as string;
}