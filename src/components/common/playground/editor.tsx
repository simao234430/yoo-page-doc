import React, { useState } from 'react'
import { LiveEditor } from 'react-live'
import CodeContainer from './code-container'
import Highlight from './highlight'
// import {   useClipboard } from 'components'

import { IconCopy } from '@arco-design/web-react/icon';
import Copy from '@geist-ui/icons/copy'
import RightIcon from '@geist-ui/icons/chevronRight'

interface Props {
  code: string
}

const Editor: React.FC<Props> = ({ code }) => {
  // const { copy } = useClipboard()
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
    // copy(code)
    // setToast({ text:   'code copied.' })
  }

  return (
    //   <div className="relative"  >
    //   <pre      {...props}>{code}</pre>
    //   {/* <CopyToClipboard text={raw} /> */}
    // </div>
    <div className="editor">
      <details open={visible}>
        <summary onClick={clickHandler}>
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
                  <IconCopy style={{ fontSize: 18}}  />
                
                </span>

                // <span color="#FFFFFF"  title="Copy Code"
                //  >
                //   <svg fill="none" stroke="currentColor" stroke-linecap="round"
                //   stroke-linejoin="round" stroke-width="1.5"
                //   shape-rendering="geometricPrecision" viewBox="0 0 24 24"
                //    height="18" width="18" style="color: currentcolor;"
                //    ><path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z">
                //     </path></svg></span>
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
