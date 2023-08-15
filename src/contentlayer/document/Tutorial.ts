import { getLastEditedDate, urlFromFilePath } from '../utils'
import { ComputedFields, defineDocumentType } from 'contentlayer/source-files'
import { bundleMDX } from 'mdx-bundler'
import type * as unified from 'unified'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
 
export type DocHeading = { level: 1 | 2 | 3; title: string }
export const Tutorial = defineDocumentType(() => ({
    name: 'Tutorial',
    filePathPattern: `tutorials/**/*.md*`,
    contentType: 'mdx',
    fields: {
        
        excerpt: {
            type: 'string',
            required: true,
          },
        title: {
            type: 'string',
            description: 'The title of the page',
            required: true,
          },
    },
    computedFields: {
        url: {
            type: "string",
            resolve: (post) => `/${post._raw.flattenedPath}`
          },
        slug: {
            type: 'string',
            resolve: (post) => `/${post._raw.flattenedPath}`
          },
        pathSegments: {
            type: 'json',
            resolve: (doc) =>
              doc._raw.flattenedPath
              .split('/').map((dirName) => {
                const re = /^((\d+)-)?(.*)$/
                const [, , orderStr, pathName] = dirName.match(re) ?? []
                const order = orderStr ? parseInt(orderStr) : 0
                return { order, pathName }
              }),
          },
        headings: {
            type: 'json',
            resolve: async (doc) => {
              const headings: DocHeading[] = []
      
              await bundleMDX({
                source: doc.body.raw,
                mdxOptions: (opts) => {
                  opts.remarkPlugins = [
                    ...(opts.remarkPlugins ?? []),
                    tocPlugin(headings),
                  ]
                  return opts
                },
              })
      
              return [ ...headings]
              // return [{ level: 1, title: doc.title }, ...headings]
            },
          },
    }
})
)
const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter((_: any) => _.type === 'heading' || _.name === 'OptionsTable')) {
        if (element.type === 'heading') {
          const title = toMarkdown({ type: 'paragraph', children: element.children }, { extensions: [mdxToMarkdown()] })
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim()
          headings.push({ level: element.depth, title })
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((_: any) => _.name === 'OptionTitle')
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === 'heading')
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] },
                  )
                    .trim()
                    .replace(/<.*$/g, '')
                    .replace(/\\/g, '')
                    .trim()
                  headings.push({ level: heading.depth, title })
                })
            })
        }
      }
    };
  }
