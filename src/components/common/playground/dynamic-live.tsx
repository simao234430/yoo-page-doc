import React from 'react'
import { LivePreview, LiveProvider, LiveError } from 'react-live'
// import { useTheme } from 'components'

import Editor from './editor'
// import Highlight, { defaultProps } from "prism-react-renderer";
import github from 'prism-react-renderer/themes/github'

export interface Props {
  code: string
  scope: Record<string, any>
}

const DynamicLive: React.FC<Props> = ({ code, scope }) => (
  // const theme = useTheme()

  <LiveProvider code={code} scope={scope} theme={github}>
    {/* <div className="wrapper">
        <LivePreview />
        <LiveError className="live-error" />
      </div> */}
    <div className="bg-grid bg-neutral-50 rounded flex flex-wrap justify-center items-center gap-x-2 gap-y-6 p-5 overflow-auto">
      <LivePreview />
      <LiveError className="live-error" />
    </div>

    <Editor code={code} />

    <style jsx>{`
      .wrapper {
        width: 100%;
        padding: 16pt;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .wrapper > :global(div) {
        width: 100%;
        background-color: transparent;
      }
      .wrapper > :global(.live-error) {
        padding: 10px 12px 0 12px;
        margin-bottom: 0;
        border: 2px #e00 dotted;
        border-radius: 10px;
        color: #ff1a1a;
        font-size: 13px;
      }
    `}</style>
  </LiveProvider>
)

export default DynamicLive
