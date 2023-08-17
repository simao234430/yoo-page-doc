import classNames from 'classnames'
import { type FC, type ReactNode } from 'react'

export const Paragraph: FC<{ children: ReactNode, className?: string }> = ({ children, className }) => <p className={classNames('leading-relaxed', className)}>{children}</p>
