import Image from 'next/legacy/image'
import { Inter } from 'next/font/google'
import { Container } from '@/src/components/common/Container'
import { Hero } from '@/src/components/landing-page/Hero'
import { Support } from '@/src/components/landing-page/Support'
import { Testimonials } from '../components/landing-page/Testimonials'
import { defineStaticProps } from '../utils/next'
import { Features } from '@/src/components/landing-page/Features'
import { Playground } from '@/src/components/landing-page/Playground'
import { Tweets } from '@/src/components/landing-page/Tweets'
import { FAQ } from '@/src/components/landing-page/FAQ'
import { mapObjectValues, promiseAllProperties } from '@/utils/object'
import { ColorScheme, snippetToHtml } from '@/utils/syntax-highlighting'
import { codeSnippets, HowItWorks, type CodeSnippets } from '../components/landing-page/HowItWorks'
import { GetStaticProps, type InferGetStaticPropsType, NextPage } from 'next'
import { useColorScheme } from '@/src/components/ColorSchemeContext'
import React, { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = defineStaticProps(async (_context) => {
  const { usedByCount } = { usedByCount: 888 }
  console.time('getStaticProps /')

  // const { preprocessedCodeSnippets } = await promiseAllProperties({
  //   preprocessedCodeSnippets: promiseAllProperties<PreprocessedCodeSnippets>({
  //     light: htmlForCodeSnippets('light'),
  //     dark: htmlForCodeSnippets('dark'),
  //   }),

  // })
  // const docs = buildDocsTree(allDocs)
  // const examples = buildExamplesTree(allExamples)
  // const posts = allPosts

  console.timeEnd('getStaticProps /')

  return { props: { usedByCount } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ usedByCount }) => {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (preferredColorScheme === 'system') {
      setColorScheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } else {
      setColorScheme(preferredColorScheme)
    }
  }, [preferredColorScheme])

  return (
    <Container>
      <Hero />
      <Support />
      <Testimonials usedByCount={999} />
      <Features />
      {/* <HowItWorks codeSnippets={preprocessedCodeSnippets[colorScheme]} /> */}
      <Playground />
      <FAQ />
      <Tweets />
    </Container>
  )
}
export default Page

// export type PreprocessedCodeSnippets = Record<ColorScheme, CodeSnippets>

// export const htmlForCodeSnippets = (colorScheme: ColorScheme): Promise<CodeSnippets> =>
//   promiseAllProperties(
//     mapObjectValues(
//       codeSnippets,
//       (_key, snippets) =>
//         Promise.all(
//           snippets.map(({ content, file, lines }) =>
//             snippetToHtml(content, colorScheme).then((_) => ({ file, lines, content: _ })),
//           ),
//         ) as any, // TODO: fix type
//     ),
//   )
