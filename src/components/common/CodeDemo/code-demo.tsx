import { SandpackProvider, SandpackLayout, SandpackPreview } from '@codesandbox/sandpack-react'

import React, { useCallback, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

import { useInView } from 'framer-motion'
import { Button, Skeleton, Tabs } from '@arco-design/web-react'
import { LivePreview } from 'react-live'
import { SandpackCodeViewer } from './sandpack/code-viewer'

// import {useCodeDemo, UseCodeDemoProps} from "./use-code-demo";
// import WindowResizer, {WindowResizerProps} from "./window-resizer";

// import {GradientBoxProps} from "@/components/gradient-box";

const DynamicReactLiveDemo = dynamic(async () => await import('./react-live-demo').then((m) => m.ReactLiveDemo), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Skeleton className="w-full h-24 rounded-xl" />,
})

// const DynamicSandpack = dynamic(() => import("./sandpack").then((m) => m.Sandpack), {
//   ssr: false,
//   // eslint-disable-next-line react/display-name
//   loading: () => <Skeleton className="w-full h-32 rounded-xl" />,
// });

interface CodeDemoProps extends UseCodeDemoProps, WindowResizerProps {
  title?: string
  asIframe?: boolean
  showSandpackPreview?: boolean
  initialEditorOpen?: boolean
  enableResize?: boolean
  showTabs?: boolean
  showPreview?: boolean
  showOpenInCodeSandbox?: boolean
  isPreviewCentered?: boolean
  resizeEnabled?: boolean
  displayMode?: 'always' | 'visible'
  isGradientBox?: boolean
  gradientColor?: GradientBoxProps['color']
  defaultExpanded?: boolean
  previewHeight?: string | number
  overflow?: 'auto' | 'visible' | 'hidden'
  className?: string
}

export const CodeDemo: React.FC<CodeDemoProps> = ({
  files = {},
  title,
  showEditor = true,
  showPreview = true,
  asIframe = false,
  resizeEnabled = true,
  showSandpackPreview = false,
  isPreviewCentered = false,
  showOpenInCodeSandbox,
  isGradientBox = false,
  defaultExpanded = false,
  previewHeight = 'auto',
  overflow = 'visible',
  displayMode = 'always',
  showTabs = true,
  gradientColor,
  highlightedLines,
  iframeInitialWidth,
  iframeSrc,
  className,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '600px',
  })

  //   const {noInline, code} = useCodeDemo({
  //     files,
  //   });

  const renderContent = useCallback(
    (content: React.ReactNode) => {
      if (displayMode === 'always') {
        return content
      }
      if (displayMode === 'visible') {
        if (!isInView) {
          return <div style={{ height: previewHeight }} />
        }

        return content
      }
    },
    [displayMode, previewHeight, isInView],
  )

  const previewContent = useMemo(() => {
    if (!showPreview) {
      return null
    }

    return (
      <DynamicReactLiveDemo
        className={className}
        code={`    <Space size='large'>
    <Button style={{backgroundColor: 'red'}} type='primary'>Primary</Button>
    <Button type='secondary'>Secondary</Button>
    <Button type='dashed'>Dashed</Button>
    <Button type='outline'>Outline</Button>
    <Button type='text'>Text</Button>
  </Space>`}
        gradientColor={gradientColor}
        height={previewHeight}
        isCentered={isPreviewCentered}
        isGradientBox={isGradientBox}
        overflow={overflow}
      />
    )
  }, [displayMode, isGradientBox, gradientColor, previewHeight, asIframe, showPreview, isInView, className])

  const editorContent = useMemo(() => {
    if (!showEditor) {
      return null
    }

    const content = (
      <SandpackProvider>
        {' '}
        <SandpackCodeViewer></SandpackCodeViewer>
      </SandpackProvider>
    )

    return renderContent(content)
  }, [
    displayMode,
    showEditor,
    isInView,
    files,
    highlightedLines,
    defaultExpanded,
    showPreview,
    showSandpackPreview,
    showOpenInCodeSandbox,
  ])

  // const shouldRenderTabs = useMemo(() => {
  //   if (!showTabs) return false;
  //   if (!showPreview) return false;
  //   if (!showEditor) return false;

  //   return true;
  // }, [showTabs, showPreview, showEditor]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      {true ? (
        <Tabs aria-label="Code demo tabs">
          <Tabs.TabPane key="preview" title="Preview">
            {previewContent}
          </Tabs.TabPane>
          <Tabs.TabPane key="code" title="Code">
            {editorContent}
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <></>
      )}
    </div>
  )
}
