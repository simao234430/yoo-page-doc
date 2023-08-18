import { useMDXComponent } from 'next-contentlayer/hooks'
import { Callout } from './common/Callout'
import { ChevronLink } from './common/ChevronLink'
import { Link } from './common/Link'
import { Label } from './common/Label'
// import { Button  } from 'antd';
import { View } from './common/View'

import { CodeDemo } from './common/CodeDemo/code-demo'
import { H1, H2, H3, H4 } from './common/Headings'
import Playground from './common/playground'
import { BulletList, BulletListItem } from './blog/BulletList'
import { Dashed } from './landing-page/Dashed'
import { Support } from './landing-page/Support'
import { BenchmarkResults } from './blog/BenchmarkResults'
import { ContentStack } from './blog/ContentStack'
import { TLDR } from './blog/TLDR'
import { Video } from './landing-page/Video'
import NextImage from 'next/image'
// import { Code } from './common/code';
import Pre from './common/Pre'

import { DocsCard as Card } from './docs/DocsCard'
import { Card as ChildCard } from './common/Card'
import { Button, Space, Tabs, Typography } from '@arco-design/web-react'
// import CodeBlock from './common/codeblock/codeblock';
import { JSX } from 'react'
import { InlineCode } from './common/inline-code'
import { Code } from './common/code'
const Image: FC<{ src: string; alt?: string; width?: number; height?: number; className?: string }> = ({
  src,
  alt,
  width,
  height,
  className,
}) => (
  <div className={`overflow-hidden rounded-lg ${className}`}>
    <div className="-mb-3">
      <NextImage src={src} alt={'test'} width={width ?? '1600'} height={height ?? '900'} placeholder="blur" blurDataURL={src} />
    </div>
  </div>
)

const P: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="mb-4">{children}</div>

// const Transform: React.FC<{ className?: string }> = ({ className }) => (
//   <div className={`mx-auto ${className}`}>
//     <DataTransformation from={dataTransformation.from} to={dataTransformation.to} />
//   </div>
// )

// import { Link } from '@/src/app/components/common/Link'
export const MDXComponents = {
  Callout,
  Card,
  Image,
  Link,
  ChevronLink,
  Label,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  p: P,
  img: Image,
  BulletList,
  BulletListItem,
  Video,
  TLDR,
  View,
  CodeDemo,
  Button,
  ContentStack,
  Support,
  Space,
  BenchmarkResults,
  Dashed,
  Tabs,
  Playground: Playground,
  TabPane: Tabs.TabPane,
  code: Code,
  pre: Pre,
}
