import { allCompos, Compo } from 'contentlayer/generated'
import { type MixedArray, toArray, uniq } from './js-utils'

export function getDocByType () {
  return allCompos.filter((doc) => doc.slug.startsWith('/components'))
}

function toCapitalized (str: string) {
  const result = str.charAt(0).toUpperCase() + str.slice(1)
  return result.replace(/-/g, ' ')
}

export function getGroupedComponents () {
  return getDocByType().reduce<Record<string, any[]>>((acc, doc) => {
    const category = doc.category
    if (!category) {return acc}
    acc[toCapitalized(category)] ??= []
    acc[toCapitalized(category)].push(doc)
    return acc
  }, {})
}

const getUsageDoc = (id: string) => allCompos.find((_doc) => _doc.id === id && _doc.scope === 'usage')

const getThemingDoc = (id: string) => allCompos.find((_doc) => _doc.id === id && _doc.scope === 'theming')

const getPropsDoc = (id: string) => allCompos.find((_doc) => _doc.id === id && _doc.scope === 'props')

export const getDocDoc = (slug: MixedArray): Doc | undefined => {
  const params = toArray(slug)
  const _slug = params.join('/')
  const doc = allCompos.find(
    (doc) => doc.slug.endsWith(_slug) || doc.slug.endsWith(`${_slug}/usage`)
  ) as Doc | undefined

  if (!doc) { return }

  const isThemingTab = doc.scope === 'theming'
  const isPropsTab = doc.scope === 'props'

  if (isThemingTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getThemingDoc(doc.id)?.frontMatter ?? {})
    }
  }

  if (isPropsTab) {
    doc.frontMatter = {
      ...doc.frontMatter,
      ...(getUsageDoc(doc.id)?.frontMatter ?? {}),
      ...(getPropsDoc(doc.id)?.frontMatter ?? {})
    }
  }

  return doc
}

// export type TabsData = ReturnType<typeof getComponentTabsData>

// export function getComponentTabsData(slug: MixedArray) {
//   const params = toArray(slug)
//   const _slug = params.join('/')

//   const getSlug = (id: string) => {
//     const res = uniq([...params, id])
//     if (res.length > 3) res.splice(2, 1)
//     return res
//   }

//   const usageSlug = getSlug('usage')
//   const propsSlug = getSlug('props')
//   const themingSlug = getSlug('theming')

//   const data = [
//     {
//       id: 'usage',
//       match: _slug.endsWith('/usage') || params.length === 2,
//       href: { query: { slug: usageSlug.slice(1) } },
//       label: 'Usage',
//       doc: getDocDoc(getSlug('usage')),
//     },
//     {
//       id: 'props',
//       match: _slug.endsWith('/props'),
//       href: { query: { slug: propsSlug.slice(1) } },
//       label: 'Props',
//       doc: getDocDoc(getSlug('props')),
//     },
//     {
//       id: 'theming',
//       match: _slug.endsWith('/theming'),
//       label: 'Theming',
//       href: { query: { slug: themingSlug.slice(1) } },
//       doc: getDocDoc(getSlug('theming')),
//     },
//   ]
//   return data.filter((item) => item.doc)
// }
