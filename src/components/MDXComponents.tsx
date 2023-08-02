 
'use client'
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Callout } from './common/Callout';
import { Card } from './common/Card';
import { ChevronLink } from './common/ChevronLink';
import { Link } from './common/Link';
import { Label } from './common/Label';
import { H2,H3,H4 } from './common/Headings';
import { Playground } from './blog/Playground';
import { BulletList, BulletListItem } from './blog/BulletList';
import { Dashed } from './landing-page/Dashed';
import { Support } from './landing-page/Support';
import { BenchmarkResults } from './blog/BenchmarkResults';
import { ContentStack } from './blog/ContentStack';
import { TLDR } from './blog/TLDR';
import { Video } from './landing-page/Video';
import NextImage from 'next/image'
import { Code } from './common/Code';
import Pre from './common/Pre';

const Image: FC<{ src: string; alt?: string; width?: number; height?: number; className?: string }> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  return (
    <div className={`overflow-hidden rounded-lg ${className}`}>
      <div className="-mb-3">
        <NextImage src={src} alt={"test"} width={width ?? '1600'} height={height ?? '900'} placeholder="blur" blurDataURL={src} />
      </div>
    </div>
  )
}

const P: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <div className="mb-4">{children}</div>

// const Transform: React.FC<{ className?: string }> = ({ className }) => (
//   <div className={`mx-auto ${className}`}>
//     <DataTransformation from={dataTransformation.from} to={dataTransformation.to} />
//   </div>
// )


// import { Link } from '@/src/app/components/common/Link'
const components = {
  Callout,
  Card,
  Image,
  Link,
  ChevronLink,
  Label,
  h2: H2,
  h3: H3,
  h4: H4,
  a: Link,
  p: P,
  img: Image,
  Playground,
  BulletList,
  BulletListItem,
  Video,
  TLDR,
  ContentStack,
  Support,
  BenchmarkResults,
  Dashed,
  code: Code,
  pre: Pre,
};

 
export default function MarkdownContent({ code }: { code: string }) {
const MDXContent = useMDXComponent(code);

// @ts-ignore
return  <MDXContent components={components} />;
}
  