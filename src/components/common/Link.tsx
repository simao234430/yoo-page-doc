import { FC, ReactNode } from 'react'
import NextLink from 'next/link'
import { Icon } from './Icon'

export const Link: FC<{ href: string; children: ReactNode }> = ({ href, children }) => {
  const isExternalUrl = !(href.startsWith('/') || href.startsWith('#'))

  return (
    <NextLink 
      href={href}
      className="inline-flex items-center m-0 space-x-1"
      target={isExternalUrl ? undefined : undefined}
      // target={isExternalUrl ? '_blank' : undefined}
      rel={isExternalUrl ? 'noreferrer' : undefined}
       >

        <span>{children}</span>
        {isExternalUrl && (
          <span className="block w-4">
            <Icon name="external-link" />
          </span>
        )}

      </NextLink>
  );
}
