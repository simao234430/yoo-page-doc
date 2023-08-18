import MarkdownContent from '@/src/components/MarkdownContent'
import { type GetStaticPaths, type GetStaticProps, type InferGetStaticPropsType } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { getDocByType, getDocDoc } from '../../utils/contentlayer-utils'
import { uniq } from '../../utils/js-utils'
import { defineStaticProps, toParams } from '../../utils/next'
import { allCompos } from 'contentlayer/generated'
import { Container } from '@/src/components/common/Container'
import { buildComposTree } from '@/src/utils/build-examples-tree'
import { DocsNavigation } from '@/src/components/docs/DocsNavigation'
import { PageNavigation } from '@/src/components/common/PageNavigation'
import { DocsHeader } from '@/src/components/docs/DocsHeader'

export default function Page({ doc, tree, params, slugs, breadcrumbs }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container title={doc.title + ' – Contentlayer'} description={doc?.excerpt}>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>
        <div className="relative w-full grow">
          <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={doc.title} />
          <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            {/* {MDXContent && <MDXContent components={mdxComponents as any} />} */}

            <MarkdownContent code={doc?.body?.code} />
          </div>
        </div>
        <div
          style={{ maxHeight: 'calc(100vh - 128px)' }}
          className="sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8  1.5xl:block"
        >
          <PageNavigation headings={doc.headings} />
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>
      </div>
    </Container>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = allCompos
//     .map((_) =>
//       _.pathSegments
//         .map((_: PathSegment) => _.pathName)
//         .slice(1)
//         .join('/'),
//     )
//     .map(toParams)
//   return { paths, fallback: false }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = uniq(getDocByType().flatMap((doc) => [doc.slug, `/${doc._raw.sourceFileDir}`]))
  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const doc = getDocDoc(['components', context.params?.slug])

  const params = context.params as any

  let breadcrumbs: any = []
  let slugs = params.slug ? [...params.slug] : []
  breadcrumbs.push({ path: '/components', title: 'Components' })
  let path = '/components'
  for (const slug of slugs) {
    path += `/${slug}`
    const breadcrumbDoc = allCompos.find((post) => post._raw.flattenedPath === params?.slug)
    breadcrumbs.push({ path: breadcrumbDoc?.slug, title: breadcrumbDoc?.title })
  }
  const tree = buildComposTree(allCompos)
  return {
    props: {
      doc: doc,
      tree: tree,

      params,
      slugs,
      breadcrumbs: breadcrumbs,
    },
  }
}
