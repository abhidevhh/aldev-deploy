import { toString } from "hast-util-to-string";
import doc from "rehype-document";
import format from "rehype-format";
import parseHtml from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import parseMarkdown from "remark-parse";
import remark2rehype from "remark-rehype";
import { unified } from "unified";
async function markdownToHtml(markdownString) {
  const result = await unified().use(parseMarkdown).use(remark2rehype).use(rehypeStringify).process(markdownString);
  return result.value.toString();
}
async function markdownToHtmlUnwrapped(markdownString) {
  const wrapped = await markdownToHtml(markdownString);
  return wrapped.replace(/(^<p>|<\/p>$)/g, "");
}
async function markdownToHtmlDocument(markdownString) {
  const result = await unified().use(parseMarkdown).use(remark2rehype).use(doc).use(format).use(rehypeStringify).process(markdownString);
  return result.value.toString();
}
async function stripHtml(htmlString) {
  const result = unified().use(parseHtml).parse(htmlString);
  return toString(result);
}
export {
  markdownToHtmlUnwrapped as a,
  markdownToHtmlDocument as b,
  markdownToHtml as m,
  stripHtml as s
};
//# sourceMappingURL=markdown.server-C6vYtRmU.js.map
