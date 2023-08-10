
import { CopyToClipboard } from './CopyToClipboard'
import { useCallback, useRef } from 'react'
 
type PreProps = {
  children: React.ReactNode
  raw: string
}

export default function Pre({ children, raw, ...props }: PreProps) {
  if (props?.example) {
    return (
      <div className="relative"  >
      <pre      {...props}>{children}</pre>
      <CopyToClipboard text={raw} />
    </div>
    );
  } else {
  return (

    <div className="relative"  >
      <pre      {...props}>{children}</pre>
      <CopyToClipboard text={raw} />
    </div>
  );
  }
  // return (
  //   <Tabs defaultActiveTab="1">
  //     <TabPane key="1" title="Preview"></TabPane>

  //     <TabPane key="3" title="Code">
  //       {children}
  //     </TabPane>
  //   </Tabs>
  // )
}
