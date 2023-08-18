import { Card, CardBody, Skeleton, Tab, Tabs } from '@nextui-org/react'
import React, { useCallback, useMemo, useRef } from 'react'
import { LivePreview, LiveProvider, LiveError, LiveEditor } from 'react-live'
import dynamic from 'next/dynamic'
import Editor from './editor'
export interface Props {
  code: string
  scope: Record<string, any>
}

const DynamicReactLiveDemo = dynamic(async () => await import('./react-live-demo').then((m) => m.ReactLiveDemo), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Skeleton className="w-full h-24 rounded-xl" />,
})
export const CodeDemo: React.FC<Props> = ({ code, scope }) => (
  <LiveProvider code={code} scope={scope}>
    <div className="wrapper">
      <LivePreview />
      <LiveError className="live-error" />
    </div>
    <Editor code={code} />
  </LiveProvider>
)
