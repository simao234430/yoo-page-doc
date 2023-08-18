import MarkdownContent from '@/src/components/MarkdownContent'

export default function Page({ doc }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <MarkdownContent code={doc.body.code} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    doc: getDocDoc(['components', ctx.params.slug]),
  },
})
