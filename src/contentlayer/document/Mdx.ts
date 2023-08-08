import { defineDocumentType } from "contentlayer/source-files";


export const Mdx = defineDocumentType(() => ({
    name: 'Mdx',
    filePathPattern: `md/**/*.md`,
    contentType: 'markdown',
}))