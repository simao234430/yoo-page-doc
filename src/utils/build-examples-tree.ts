import { children } from 'cheerio/lib/api/traversing'
import { type Example, type Compo, type Tutorial } from 'contentlayer/generated'
import { type TreeNode } from 'types/TreeNode'

export const buildTutorialTree = (tutorials: Tutorial[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return tutorials
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((tutorial) => ({
      title: tutorial.title,

      excerpt: tutorial.excerpt ?? null,

      urlPath: '/' + tutorial.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildExamplesTree(
        tutorials,
        tutorial.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}

export const buildExamplesTree = (examples: Example[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return examples
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((example) => ({
      nav_title: example.nav_title ?? null,
      title: example.title,
      label: example.label ?? null,
      excerpt: example.excerpt ?? null,
      collapsible: false,
      collapsed: false,
      urlPath: '/' + example.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildExamplesTree(
        examples,
        example.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}

export const buildComposTree = (compos: Compo[], parentPathNames: string[] = []): TreeNode[] => {
  const level = parentPathNames.length

  return compos
    .filter(
      (_) =>
        _.pathSegments.length === level + 1 &&
        _.pathSegments
          .map((_: PathSegment) => _.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((compo) => ({
      nav_title: compo.nav_title ?? null,
      title: compo.title,
      label: compo.label ?? null,
      excerpt: compo.excerpt ?? null,
      collapsible: false,
      collapsed: false,
      urlPath: '/' + compo.pathSegments.map((_: PathSegment) => _.pathName).join('/'),
      children: buildComposTree(
        compos,
        compo.pathSegments.map((_: PathSegment) => _.pathName),
      ),
    }))
}
