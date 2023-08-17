import React, { useState } from 'react'
import { LiveEditor } from 'react-live'
import CodeContainer from './code-container'
import Highlight from './highlight'
// import {   useClipboard } from 'components'
import { Notification, Icon } from '@arco-design/web-react'

// const IconFont = Icon.addFromIconFontCn({
//   src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js',
// });
import { IconCopy, IconSuccess } from '@arco-design/web-react/icon'

import RightIcon from '@geist-ui/icons/chevronRight'
import { useClipboard } from '@chakra-ui/react'

interface Props {
  code: string
}

const Editor: React.FC<Props> = ({ code }) => {
  const { hasCopied, onCopy } = useClipboard(code)
  // const { isChinese } = useConfigs()
  const [visible, setVisible] = useState(false)

  const clickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setVisible(!visible)
  }

  const copyHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    onCopy()
    Notification.success({
      // eslint-disable-next-line react/jsx-no-undef
      icon: IconSuccess,
      title: 'copy Success',
      content: ''
    })
    // setToast({ text:   'code copied.' })
  }

  return (
    //   <div className="relative"  >
    //   <pre      {...props}>{code}</pre>
    //   {/* <CopyToClipboard text={raw} /> */}
    // </div>
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler} >
          <div className="summary-safari">
            <div className="action">
              <span className="arrow">
                <RightIcon size={16} />
              </span>
              <span>{'Show Code'}</span>
            </div>
            <div className="action">
              {visible && (
                <span
                  color='rgb(29, 33, 41)'
                  className="copy"
                  onClick={copyHandler}
                  title={'Copy Code'}
                >
                  <IconCopy style={{ fontSize: 18, fill: 'none' }} />

                </span>

              )}
            </div>
          </div>
        </summary>
        <div className="area">
          {/* <CodeContainer px='0' overflow='hidden'>
      <Highlight
          codeString={code}
          language={"tsx"}
          theme={github}


        />
      </CodeContainer> */}
          <LiveEditor />
        </div>
      </details>

      <style jsx>{`
        #test {
          color: #fff;
        }
        .editor {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        details {
          transition: all 0.2s ease;
          overflow: hidden;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        details summary::-webkit-details-marker {
          display: none;
        }

        summary {
          background-color: #f2f3f5;
          box-sizing: border-box;
          border-top: 1px solid #eaeaea;
          color: #666;
          width: 100%;
          list-style: none;
          user-select: none;
          outline: none;
        }

        .summary-safari {
          background-color: #f2f3f5;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 2.875rem;
          padding: 0 16pt;
        }

        summary :global(svg) {
          cursor: pointer;
        }

        .action {
          width: auto;
          display: flex;
          align-items: center;
          font-size: 0.8rem;
        }

        .area {
          position: relative;
          box-sizing: border-box;
          white-space: pre;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          color: #000;
          background-color: #fff;
          font-size: 1em;
          overflow: hidden;
          border-top: 1px solid #eaeaea;
        }

        .arrow {
          transition: all 0.2s ease;
          transform: rotate(${visible ? 90 : 0}deg);
          display: inline-flex;
          align-items: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .copy {
          display: inline-flex;
          align-items: center;
          color: #888;
          transition: color 0.2s ease;
        }

        .copy:hover {
          color: #444;
        }
      `}</style>
    </div>
  )
}

export default Editor
