 
'use client'

import {MDXComponents} from "./MDXComponents";
import { useMDXComponent } from 'next-contentlayer/hooks';
interface MDXContentProps {
  code: string;
}

 
export default function MarkdownContent({code}: MDXContentProps)  {
const MDXContent = useMDXComponent(code);

// @ts-ignore
return  <MDXContent components={MDXComponents as MDXComponentsType} />;
}
  