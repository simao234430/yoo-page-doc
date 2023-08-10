// TODO remove eslint-disable when fixed https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
import { makeSource } from '@contentlayer/source-files'
import highlight from 'rehype-highlight'
import remarkSlug from 'remark-slug'
import * as documentTypes from './src/contentlayer'
import { contentDirPath } from './src/contentlayer/utils'
import { validateDuplicateIds } from './src/utils/validate-duplicate-ids'
import rehypePrettyCode from 'rehype-pretty-code';
import { visit } from 'unist-util-visit';
import { includeMarkdown } from '@hashicorp/remark-plugins'
// import { partialimport } from 'remark-import-partial';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
// /** @type {import('rehype-pretty-code').Options} */
// const options = {
//   theme: 'one-dark-pro'
// };
import { type Options } from 'rehype-pretty-code';
import { remarkPlugins } from './src/contentlayer/mdx/remark'
  
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: 'monokai',
 
  onVisitHighlightedLine(node: any) {
    node.properties.className?.push('highlighted');
  },
 
};
// export const parseMeta =
//   ({ defaultShowCopyCode }) =>
//     (  tree: any) => {
//     visit(tree, ['pre'], preEl => {
//       const [codeEl] = preEl.children
//       // Add default language `text` for code-blocks without languages
//       codeEl.properties.className ||= ['language-text']
//       const meta = codeEl.data?.meta
//       preEl.__nextra_filename = meta?.match(CODE_BLOCK_FILENAME_REGEX)?.[1]

//       preEl.__nextra_hasCopyCode = meta
//         ? (defaultShowCopyCode && !/( |^)copy=false($| )/.test(meta)) ||
//           /( |^)copy($| )/.test(meta)
//         : defaultShowCopyCode
//     })
//   }

 

// const DEFAULT_REHYPE_PRETTY_CODE_OPTIONS: Options = {
 
//   theme: 'one-dark-pro',
//   onVisitLine(node: any) {
//     // Prevent lines from collapsing in `display: grid` mode, and
//     // allow empty lines to be copy/pasted
//     if (node.children.length === 0) {
//       node.children = [{ type: 'text', value: ' ' }]
//     }
//   },
//   // onVisitHighlightedLine(node: any) {
//   //   node.properties.className.push('highlighted')
//   // },
//   // onVisitHighlightedWord(node: any) {
//   //   node.properties.className = ['highlighted']
//   // },
//   // filterMetaString: (meta: string) =>
//   //   meta.replace(CODE_BLOCK_FILENAME_REGEX, '')
// }
export default makeSource({
  disableImportAliasWarning: true,
  contentDirPath,
  documentTypes,
  mdx: {
 
    remarkPlugins: [remarkSlug,[includeMarkdown, { resolveMdx: true }]],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }

            for (const child of node.children) {
              if (child.tagName === 'pre') {
                child.properties['raw'] = node.raw;
              }
            }
          }
        });
      },
      // [
      //   rehypeExternalLinks,
      //   {
      //     target: '_blank',
      //     rel: ['noopener', 'noreferrer', 'nofollow'],
      //   },
      // ],
    ],

  },
})
 

