import { type FC } from 'react'
import Link from 'next/link'
import { Icon } from '../common/Icon'
import { format } from 'date-fns'
import { type Doc } from 'contentlayer/generated'

const githubBranch = 'main'
const githubBaseUrl = `https://github.com/contentlayerdev/website/blob/${githubBranch}/content/`

export const DocsFooter: FC<{ doc: Doc }> = ({ doc }) => (
  <>
    <hr />
    <div className="space-y-4 text-sm sm:flex sm:justify-between sm:space-y-0">
      <p className="m-0">
        Was this article helpful to you? <br />{' '}
        <Link
          href="https://github.com/contentlayerdev/contentlayer/issues"
          className="inline-flex items-center space-x-1"
          target="_blank"
          rel="noreferrer"
        >
          <span className="inline-block w-4">
            <Icon name="github" />
          </span>
          <span>Provide feedback</span>
        </Link>
      </p>
      <p className="m-0 text-right">
        Last edited on {format(new Date(doc.last_edited), 'MMMM dd, yyyy')}.<br />
        <Link
          href={githubBaseUrl + doc._raw.sourceFilePath}
          className="inline-flex items-center space-x-1"
          target="_blank"
          rel="noreferrer"
        >
          <span className="inline-block w-4">
            <Icon name="github" />
          </span>
          <span>Edit this page</span>
        </Link>
      </p>
    </div>
  </>
)
