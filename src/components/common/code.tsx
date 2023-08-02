import cn from 'clsx'
import type { ComponentProps, ReactElement } from 'react'

export const Code = ({
  children,
  className,
  ...props
}: ComponentProps<'code'>): ReactElement => {
  const hasLineNumbers = 'data-line-numbers' in props
  return (
    <code
 
 
      {...props}
    >
      {children}
    </code>
  )
}
