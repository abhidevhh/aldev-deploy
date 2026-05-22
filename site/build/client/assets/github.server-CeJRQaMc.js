import nodePath from "path";
import { throttling } from "@octokit/plugin-throttling";
import { Octokit as Octokit$1 } from "@octokit/rest";
import { g as getEnv } from "./env.server-DPCBxZtL.js";
const GITHUB_CONTENT_PATH = "services/site/content";
function getGitHubContentPath(relativePath) {
  return `${GITHUB_CONTENT_PATH}/${relativePath}`;
}
const ref = getEnv().GITHUB_REF;
const safePath = (s) => s.replace(/\\/g, "/");
const Octokit = Octokit$1.plugin(throttling);
const octokit = new Octokit({
  auth: getEnv().BOT_GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      const method = "method" in options ? options.method : "METHOD_UNKNOWN";
      const url = "url" in options ? options.url : "URL_UNKNOWN";
      console.warn(
        `Request quota exhausted for request ${method} ${url}. Retrying after ${retryAfter} seconds.`
      );
      return true;
    },
    onSecondaryRateLimit: (retryAfter, options) => {
      const method = "method" in options ? options.method : "METHOD_UNKNOWN";
      const url = "url" in options ? options.url : "URL_UNKNOWN";
      octokit.log.warn(`Abuse detected for request ${method} ${url}`);
    }
  }
});
async function downloadFirstMdxFile(list) {
  const filesOnly = list.filter(({ type }) => type === "file");
  for (const extension of [".mdx", ".md"]) {
    const file = filesOnly.find(({ name }) => name.endsWith(extension));
    if (file) return { file, content: await downloadFileBySha(file.sha) };
  }
  return null;
}
async function downloadMdxFileOrDirectory(relativeMdxFileOrDirectory) {
  const mdxFileOrDirectory = getGitHubContentPath(relativeMdxFileOrDirectory);
  const parentDir = nodePath.dirname(mdxFileOrDirectory);
  const dirList = await downloadDirList(parentDir);
  const basename = nodePath.basename(mdxFileOrDirectory);
  const mdxFileWithoutExt = nodePath.parse(mdxFileOrDirectory).name;
  const requestedExt = nodePath.extname(basename).toLowerCase();
  const isExplicitFileRequest = requestedExt === ".mdx" || requestedExt === ".md";
  let files = [];
  let entry = mdxFileOrDirectory;
  if (isExplicitFileRequest) {
    const exactFile = dirList.find(
      (item) => item.type === "file" && item.name === basename
    );
    if (exactFile) {
      const content = await downloadFileBySha(exactFile.sha);
      entry = exactFile.path;
      const virtualDirWithoutExt = nodePath.join(parentDir, mdxFileWithoutExt);
      files = [
        {
          path: safePath(nodePath.join(virtualDirWithoutExt, "index.mdx")),
          content
        },
        {
          path: safePath(nodePath.join(mdxFileOrDirectory, "index.mdx")),
          content
        }
      ];
    }
    return { entry, files };
  }
  const exactFiles = dirList.filter(
    (item) => item.type === "file" && nodePath.parse(item.name).name === mdxFileWithoutExt
  );
  const fileResult = await downloadFirstMdxFile(exactFiles);
  if (fileResult) {
    entry = fileResult.file.path;
    files = [
      {
        path: safePath(nodePath.join(mdxFileOrDirectory, "index.mdx")),
        content: fileResult.content
      }
    ];
  } else {
    const exactDir = dirList.find(
      (item) => item.type === "dir" && item.name === mdxFileWithoutExt
    );
    if (exactDir) {
      entry = exactDir.path;
      files = await downloadDirectory(exactDir.path);
    }
  }
  return { entry, files };
}
async function downloadDirectory(dir) {
  const dirList = await downloadDirList(dir);
  const result = await Promise.all(
    dirList.map(async ({ path: fileDir, type, sha }) => {
      switch (type) {
        case "file": {
          const content = await downloadFileBySha(sha);
          return { path: safePath(fileDir), content };
        }
        case "dir": {
          return downloadDirectory(fileDir);
        }
        default: {
          throw new Error(`Unexpected repo file type: ${type}`);
        }
      }
    })
  );
  return result.flat();
}
async function downloadFileBySha(sha) {
  const { data } = await octokit.git.getBlob({
    owner: "kentcdodds",
    repo: "kentcdodds.com",
    file_sha: sha
  });
  const encoding = data.encoding;
  return Buffer.from(data.content, encoding).toString();
}
async function downloadFile(path) {
  const { data } = await octokit.repos.getContent({
    owner: "kentcdodds",
    repo: "kentcdodds.com",
    path,
    ref
  });
  if ("content" in data && "encoding" in data) {
    const encoding = data.encoding;
    return Buffer.from(data.content, encoding).toString();
  }
  console.error(data);
  throw new Error(
    `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property`
  );
}
async function downloadDirList(path) {
  const resp = await octokit.repos.getContent({
    owner: "kentcdodds",
    repo: "kentcdodds.com",
    path,
    ref
  });
  const data = resp.data;
  if (!Array.isArray(data)) {
    throw new Error(
      `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`
    );
  }
  return data;
}
export {
  downloadMdxFileOrDirectory as a,
  downloadDirList as b,
  downloadFile as d,
  getGitHubContentPath as g
};
//# sourceMappingURL=github.server-CeJRQaMc.js.map
