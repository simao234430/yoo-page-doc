var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// contentlayer.config.ts
import { makeSource } from "@contentlayer/source-files";
import highlight from "rehype-highlight";

// src/contentlayer/index.ts
var contentlayer_exports = {};
__export(contentlayer_exports, {
  Doc: () => Doc,
  Example: () => Example,
  GlobalConfig: () => GlobalConfig,
  Post: () => Post
});

// src/contentlayer/document/Doc.ts
import { defineDocumentType } from "@contentlayer/source-files";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxToMarkdown } from "mdast-util-mdx";
import { bundleMDX } from "mdx-bundler";

// src/contentlayer/utils.ts
import * as fs from "node:fs/promises";
import path from "node:path";
var contentDirPath = "content";
var urlFromFilePath = (doc) => {
  let urlPath = doc._raw.flattenedPath.replace(/^pages\/?/, "/");
  if (!urlPath.startsWith("/"))
    urlPath = `/${urlPath}`;
  if ("global_id" in doc)
    urlPath += `-${doc.global_id}`;
  urlPath = urlPath.split("/").map((segment) => segment.replace(/^\d\d\d\-/, "")).join("/");
  return urlPath;
};
var getLastEditedDate = async (doc) => {
  const stats = await fs.stat(path.join(contentDirPath, doc._raw.sourceFilePath));
  return stats.mtime;
};

// src/contentlayer/document/Doc.ts
var Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    global_id: {
      type: "string",
      description: "Random ID to uniquely identify this doc, even after it moves",
      required: true
    },
    title: {
      type: "string",
      description: "The title of the page",
      required: true
    },
    nav_title: {
      type: "string",
      description: "Override the title for display in nav"
    },
    label: {
      type: "string"
    },
    excerpt: {
      type: "string",
      required: true
    },
    show_child_cards: {
      type: "boolean",
      default: false
    },
    collapsible: {
      type: "boolean",
      required: false,
      default: false
    },
    collapsed: {
      type: "boolean",
      required: false,
      default: false
    }
    // seo: { type: 'nested', of: SEO },
  },
  computedFields: {
    url_path: {
      type: "string",
      description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: (doc) => {
        if (doc._id.startsWith("docs/index.md"))
          return "/docs";
        return urlFromFilePath(doc);
      }
    },
    url_path_without_id: {
      type: "string",
      description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: (doc) => urlFromFilePath(doc).replace(new RegExp(`-${doc.global_id}$`), "")
    },
    pathSegments: {
      type: "json",
      resolve: (doc) => urlFromFilePath(doc).split("/").slice(2).map((dirName) => {
        const re = /^((\d+)-)?(.*)$/;
        const [, , orderStr, pathName] = dirName.match(re) ?? [];
        const order = orderStr ? parseInt(orderStr) : 0;
        return { order, pathName };
      })
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings = [];
        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [...opts.remarkPlugins ?? [], tocPlugin(headings)];
            return opts;
          }
        });
        return [{ level: 1, title: doc.title }, ...headings];
      }
    },
    last_edited: { type: "date", resolve: getLastEditedDate }
  },
  extensions: {}
}));
var tocPlugin = (headings) => () => {
  return (node) => {
    for (const element of node.children.filter((_) => _.type === "heading" || _.name === "OptionsTable")) {
      if (element.type === "heading") {
        const title = toMarkdown({ type: "paragraph", children: element.children }, { extensions: [mdxToMarkdown()] }).trim().replace(/<.*$/g, "").replace(/\\/g, "").trim();
        headings.push({ level: element.depth, title });
      } else if (element.name === "OptionsTable") {
        element.children.filter((_) => _.name === "OptionTitle").forEach((optionTitle) => {
          optionTitle.children.filter((_) => _.type === "heading").forEach((heading) => {
            const title = toMarkdown(
              { type: "paragraph", children: heading.children },
              { extensions: [mdxToMarkdown()] }
            ).trim().replace(/<.*$/g, "").replace(/\\/g, "").trim();
            headings.push({ level: heading.depth, title });
          });
        });
      }
    }
  };
};

// src/contentlayer/document/GlobalConfig.ts
import { defineDocumentType as defineDocumentType2 } from "@contentlayer/source-files";
var GlobalConfig = defineDocumentType2(() => ({
  name: "GlobalConfig",
  filePathPattern: `config/global.yaml`,
  isSingleton: true,
  fields: {
    title: {
      type: "string",
      description: "The title of the site",
      required: true
    }
  },
  extensions: {}
}));

// src/contentlayer/document/Post.ts
import { defineDocumentType as defineDocumentType3, defineNestedType as defineNestedType2 } from "@contentlayer/source-files";
import { mdxToMarkdown as mdxToMarkdown2 } from "mdast-util-mdx";
import { toMarkdown as toMarkdown2 } from "mdast-util-to-markdown";
import { bundleMDX as bundleMDX2 } from "mdx-bundler";

// src/contentlayer/nested/SEO.ts
import { defineNestedType } from "contentlayer/source-files";
var SEO = defineNestedType(() => ({
  name: "SEO",
  fields: {
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    imagePath: {
      type: "string",
      required: true
    }
  },
  extensions: {}
}));

// src/contentlayer/document/Post.ts
var RelatedPost = defineNestedType2(() => ({
  name: "RelatedPost",
  fields: {
    slug: { type: "string", required: true }
  }
}));
var CoverImage = defineNestedType2(() => ({
  name: "CoverImage",
  fields: {
    url: { type: "string", required: true },
    alt: { type: "string", required: true },
    width: { type: "number", required: true },
    height: { type: "number", required: true }
  }
}));
var Author = defineNestedType2(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    handle: { type: "string", required: true },
    avatar: { type: "string", required: true }
  }
}));
var Post = defineDocumentType3(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    cover_image: {
      type: "nested",
      of: CoverImage,
      required: true
    },
    excerpt: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    authors: {
      type: "list",
      of: Author,
      required: true
    },
    related_posts: {
      type: "list",
      of: RelatedPost,
      required: false
    },
    seo: {
      type: "nested",
      of: SEO,
      required: true
    }
  },
  computedFields: {
    url_path: {
      type: "string",
      description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath
    },
    slug: {
      type: "string",
      resolve: (post) => urlFromFilePath(post).replace(/^\/blog\//, "")
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings = [];
        await bundleMDX2({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [...opts.remarkPlugins ?? [], tocPlugin2(headings)];
            return opts;
          }
        });
        return [{ level: 1, title: doc.title }, ...headings];
      }
    }
  },
  extensions: {}
}));
var tocPlugin2 = (headings) => () => {
  return (node) => {
    node.children.filter((_) => _.type === "heading").forEach((heading) => {
      const title = toMarkdown2({ type: "paragraph", children: heading.children }, { extensions: [mdxToMarkdown2()] }).trim().replace(/<.*$/g, "").replace(/\\/g, "").trim();
      return headings.push({ level: heading.depth, title });
    });
  };
};

// src/contentlayer/document/Example.ts
import { defineDocumentType as defineDocumentType4 } from "@contentlayer/source-files";
var Example = defineDocumentType4(() => ({
  name: "Example",
  filePathPattern: `examples/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the page",
      required: true
    },
    nav_title: {
      type: "string",
      description: "Override the title for display in nav"
    },
    label: {
      type: "string"
    },
    excerpt: {
      type: "string",
      required: true
    },
    github_repo: {
      type: "string",
      description: "The string to use in stackblitz.embedGithubProject.",
      required: false
    },
    open_file: {
      type: "string",
      description: "The file to open in the stackblitz playground.",
      required: false
    }
  },
  computedFields: {
    url_path: {
      type: "string",
      description: 'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath
    },
    pathSegments: {
      type: "json",
      resolve: (doc) => doc._raw.flattenedPath.split("/").map((dirName) => {
        const re = /^((\d+)-)?(.*)$/;
        const [, , orderStr, pathName] = dirName.match(re) ?? [];
        const order = orderStr ? parseInt(orderStr) : 0;
        return { order, pathName };
      })
    },
    last_edited: { type: "date", resolve: getLastEditedDate }
  },
  extensions: {}
}));

// contentlayer.config.ts
var contentlayer_config_default = makeSource({
  contentDirPath,
  documentTypes: contentlayer_exports,
  mdx: { rehypePlugins: [highlight] }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-EXVYIDUG.mjs.map
