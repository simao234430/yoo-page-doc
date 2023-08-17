import { getLastEditedDate, urlFromFilePath } from '../utils'
import { ComputedFields, defineDocumentType } from 'contentlayer/source-files'
import { bundleMDX } from 'mdx-bundler'
import type * as unified from 'unified'
import { toMarkdown } from 'mdast-util-to-markdown'
import { mdxToMarkdown } from 'mdast-util-mdx'
export interface DocHeading { level: 1 | 2 | 3, title: string }
// const computedFields: ComputedFields = {
//   slug: {
//     type: 'string',
//     resolve: (doc) => `/${doc._raw.flattenedPath}`,
//   },
// }

export const Compo = defineDocumentType(() => ({
  name: 'Compo',
  filePathPattern: 'components/**/*.mdx',
  contentType: 'mdx',
  fields: {
    id: { type: 'string' },
    scope: {
      type: 'enum',
      options: ['usage', 'theming', 'props'],
      default: 'usage'
    },
    category: { type: 'string' },
    package: { type: 'string' },
    description: { type: 'string' },
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav'
    },
    label: {
      type: 'string'
    },
    excerpt: {
      type: 'string',
      required: true
    },
    github_repo: {
      type: 'string',
      description: 'The string to use in stackblitz.embedGithubProject.',
      required: false
    },
    open_file: {
      type: 'string',
      description: 'The file to open in the stackblitz playground.',
      required: false
    }
  },
  computedFields: {
    frontMatter: {
      type: 'json',
      resolve: (doc) => ({
        title: doc.title,
        package: doc.package,
        description: doc.description,
        version: doc.version,
        slug: `/${doc._raw.flattenedPath}`,
        // editUrl: `${siteConfig.repo.editUrl}/${doc._id}`,
        headings: {
          type: 'json',
          resolve: async (doc) => {
            const headings: DocHeading[] = []

            await bundleMDX({
              source: doc.body.raw,
              mdxOptions: (opts) => {
                opts.remarkPlugins = [
                  ...(opts.remarkPlugins ?? []),
                  tocPlugin(headings)
                ]
                return opts
              }
            })

            return [{ level: 1, title: doc.title }, ...headings]
          }
        }
      })
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
              tocPlugin(headings)
            ]
            return opts
          }
        })

        return [{ level: 1, title: doc.title }, ...headings]
      }
    },

    slug: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath.substring(0, post._raw.flattenedPath.lastIndexOf('/'))}`
    },
    url_path: {
      type: 'string',
      description:
        'The URL path of this page relative to site root. For example, the site root page would be "/", and doc page would be "docs/getting-started/"',
      resolve: urlFromFilePath
    },
    pathSegments: {
      type: 'json',
      resolve: (doc) =>
        doc._raw.flattenedPath.substring(0, doc._raw.flattenedPath.lastIndexOf('/')).split('/')
          .map((dirName) => {
            const re = /^((\d+)-)?(.*)$/
            const [, , orderStr, pathName] = dirName.match(re) ?? []
            const order = orderStr ? parseInt(orderStr) : 0
            return { order, pathName }
          })
    },

    last_edited: { type: 'date', resolve: getLastEditedDate }
  },

  extensions: {}
}))

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
    () => (node: any) => {
      for (const element of node.children.filter(
        (_: any) => _.type === 'heading' || _.name === 'OptionsTable'
      )) {
        if (element.type === 'heading') {
          const title = toMarkdown(
            { type: 'paragraph', children: element.children },
            { extensions: [mdxToMarkdown()] }
          )
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
                    { extensions: [mdxToMarkdown()] }
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
    }
