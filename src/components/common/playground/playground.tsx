import React from 'react'
import dynamic from 'next/dynamic'
// import { useTheme, Loading } from 'components'

import Title from './title'

const DynamicLive = dynamic(async () => await import('./dynamic-live'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '20pt 0' }}>
      {/* <Loading /> */}
    </div>
  )
})

export interface PlaygroundProps {
  title?: React.ReactNode | string
  desc?: React.ReactNode | string
  code: string
  scope: Record<string, any>
}

const defaultProps = {
  desc: '',
  code: '',
  bindings: {}
}

const Playground: React.FC<PlaygroundProps> = React.memo(
  ({
    title: inputTitle,
    code: inputCode,
    desc,
    scope
  }: PlaygroundProps & typeof defaultProps) => {
    // const theme = useTheme()
    // const { isChinese } = useConfigs()
    const isChinese = false
    const code = inputCode.trim()
    const title = inputTitle || (isChinese ? '基础的' : 'General')

    return (
      <>
        <Title title={title} desc={desc} />
        <div className="playground">
          <DynamicLive code={code} scope={scope} />
          <style jsx>{`
            .playground {
              width: 100%;

          `}</style>
        </div>
      </>
    )
  }
)

Playground.defaultProps = defaultProps
Playground.displayName = 'GeistPlayground'
export default Playground
