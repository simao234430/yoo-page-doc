// import type { InferGetStaticPropsType } from 'next'


import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks'
import { type FC, useEffect, useRef, useState } from 'react'

import { allTutorials } from 'contentlayer/generated'
import { Container } from '../../components/common/Container'
import { defineStaticProps, toParams } from '../../utils/next'
import { DocsNavigation } from '../../components/docs/DocsNavigation'

import { DocsHeader } from '../../components/docs/DocsHeader'

import { buildTutorialTree } from '../../utils/build-examples-tree'


import { Button } from '../../components/common/Button'
import MarkdownContent from '@/src/components/MarkdownContent'
import { DocsFooter } from '@/src/components/docs/DocsFooter'
import { PageNavigation } from '@/src/components/common/PageNavigation'
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
  // const paths = allTutorials.map((post) => ({
  //   params: { slug: post.slug },
  // }))
  const paths = allTutorials.map((post) => post.slug)
  return { paths, fallback: false }
}

export const getStaticProps = defineStaticProps(async ({ params }: DocPageProps) => {
  // const {
  //   asPath,        // the value: "/question/how-do-you-get-the-current-url-in-nextjs/"
  //   pathname,   // the value: "/question/[slug]"
  // } = useRouter();
  // console.log(context.params)
  // const pagePath = params.slug ? ['examples', params.slug].join('/') : 'examples'
  const pagePath = params.slug ? ['tutorials', ...params.slug].join('/') : 'tutorials'
  const tutorial = allTutorials.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === pagePath)!

  // const tutorial = allTutorials.find((_) => _.pathSegments.filter(  )
  // .map((_: PathSegment) => _.pathName).join('/') === params?.slug)!
  // const tutorial = allTutorials.find((tutorial) => tutorial.slug === params?.slug)
<<<<<<< HEAD

  let slugs = params?.slug ? ['', ...params?.slug] : []
  let path = 'tutorials'
  let breadcrumbs: any = []
  for (const slug of slugs) {
    path += slug ? '/' + slug : ''
=======
 
    const slugs = params?.slug ? ['', ...params?.slug] : []
    let path = 'tutorials'
    const breadcrumbs: any = []
    for (const slug of slugs) {
      path += slug ? '/' + slug : ''
>>>>>>> adcc866 (eslint lint 1st and works)
    //   const navTitle = allTutorials.find(
    //     (_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    //   )?.nav_title
    const title = allTutorials.find((_) => _.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path)?.title
    breadcrumbs.push({ path: '/' + path, slug, title: title })
  }
  const tree = buildTutorialTree(allTutorials)
  return { props: { breadcrumbs, tree, tutorial } }
})


const Page: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ breadcrumbs, tutorial, tree }) => {
  useLiveReload()
  // const MDXContent = useMDXComponent(example.body.code || '')
  const ref = useRef<HTMLDivElement>(null)
  const [vm, setVm] = useState<VM | undefined>(undefined)
  const [fullScreen, setFullScreen] = useState<boolean>(false)


  const {
    asPath, // the value: "/question/how-do-you-get-the-current-url-in-nextjs/"
    pathname // the value: "/question/[slug]"
  } = useRouter()
  // console.log(context.params)


  // useEffect(() => {
  //   if (example.github_repo && ref.current) {
  //     stackblitz
  //       .embedGithubProject(ref.current, 'contentlayerdev/next-contentlayer-example', {
  //         openFile: example.open_file,
  //         showSidebar: true,
  //       })
  //       .then((_) => setVm(_))
  //   }
  // }, [ref, example.open_file, example.github_repo])

  // useEffect(() => {
  //   if (vm && fullScreen) {
  //     vm.editor.showSidebar()
  //   }
  // }, [vm, fullScreen])

  return (
    <Container title={tutorial.title + ' – Contentlayer'} description={tutorial.excerpt}>
      <div className="relative w-full mx-8  max-w-screen-2xl  lg:flex   lg:items-start">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky hidden border-r border-gray-200 top-16 shrink-0 dark:border-gray-800 lg:block"
        >
          <div className="h-full p-4 pl-8 -ml-3 overflow-y-scroll">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>

        <div className="relative w-full max-w-800  grow">
          <DocsHeader tree={tree} breadcrumbs={breadcrumbs} title={tutorial.title} />
          <div className="w-full max-w-3xl p-4 pb-8 mx-auto mb-4 prose docs prose-slate prose-violet shrink prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            {/* {MDXContent && <MDXContent components={mdxComponents as any} />} */}

            <MarkdownContent code={tutorial.body.code} />


          </div>
        </div>
        <div
          style={{ maxHeight: 'calc(100vh - 128px)' }}
          className="sticky top-32 hidden w-80 shrink-0 overflow-y-scroll p-8  1.5xl:block"
        >
          <PageNavigation headings={tutorial.headings} />
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>
      </div>

    </Container>
  )
}

export default Page
