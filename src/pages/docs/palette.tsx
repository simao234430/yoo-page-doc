import React, { useState, useContext } from 'react'
import Card from './card'
import { join } from 'path'
import { includeMarkdown } from '@hashicorp/remark-plugins'
import fs from 'fs'
// import { MDXRemote } from 'next-mdx-remote'
import { Layout, Grid, Radio } from '@arco-design/web-react'
import ReactMarkdown from 'react-markdown'
import { generate, getPresetColors } from '@arco-design/color'
import MarkdownContent from '@/src/components/MarkdownContent'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

// export async function getStaticProps() {
//   // Imagine "included-file.mdx" has <CustomComponent /> in it...
//   // it will render as expected, since the @include extension
//   // is .mdx and resolveMdx is true.
//   const source = 'Some **mdx** text.\n\n@include "included-file.mdx"'
//   const mdxSource = await serialize(source, {
//     mdxOptions: {
//       remarkPlugins: [[includeMarkdown, { resolveMdx: true }]],
//     },
//   })
//   return { props: { source: mdxSource } }
// }

export async function getStaticProps () {
  // Imagine "included-file.mdx" has <CustomComponent /> in it...
  // it will render as expected, since the @include extension
  // is .mdx and resolveMdx is true.

  const postFilePath = join('/Users/simao/my_code/yoo-page-doc/src/pages/docs', 'my-file.mdx')
  const content = fs.readFileSync(postFilePath)

  // const {  content } = matter(fileContents);


  const mdxSource = await serialize(content, {
    mdxOptions: {

    }
  })
  return { props: { source: mdxSource } }
}

const presetColors = getPresetColors()

const prefixCls = 'page-dark'
const locale = {
  'zh-CN': {
    light: '亮色模式',
    dark: '暗黑模式',
    red: 'Red / 浪漫红',
    'orange-red': 'Orange Red / 晚秋红',
    orange: 'Orange / 活力橙',
    gold: 'Gold / 黄昏',
    yellow: 'Yellow / 柠檬黄',
    lime: 'Lime / 新生绿',
    green: 'Green / 仙野绿',
    cyan: 'Cyan / 碧涛青',
    blue: 'Blue / 海蔚蓝',
    'arco-blue': 'Arco Blue / 极致蓝',
    purple: 'Purple / 暗夜紫',
    'pink-purple': 'Pink Purple / 青春紫',
    magenta: 'Magenta / 品红',
    gray: 'Gray / 中性灰'
  },
  'en-US': {
    light: 'Light',
    dark: 'Dark',
    red: 'Red',
    'orange-red': 'Orange Red',
    orange: 'Orange',
    gold: 'Gold',
    yellow: 'Yellow',
    lime: 'Lime',
    green: 'Green',
    cyan: 'Cyan',
    blue: 'Blue',
    'arco-blue': 'Arco Blue',
    purple: 'Purple',
    'pink-purple': 'Pink Purple',
    magenta: 'Magenta',
    gray: 'Gray'
  }
}
export default function TestPage ({ source }) {

  const realTheme = 'light'
  const { Content } = Layout
  const { Row, Col } = Grid
  const t = locale['zh-CN']
  const grayColorList =
    realTheme === 'light' ? presetColors.gray.light : presetColors.gray.dark
  const [format, setFormat] = useState('hex')
  const COLORS = {
    red: {
      value: '#f53f3f',
      title: t.red
    },
    orangered: {
      value: '#F77234',
      title: t['orange-red']
    },
    orange: {
      value: '#ff7d00',
      title: t.orange
    },
    gold: {
      value: '#F7BA1E',
      title: t.gold
    },
    yellow: {
      value: '#FADC19',
      title: t.yellow
    },
    lime: {
      value: '#9FDB1D',
      title: t.lime
    },
    green: {
      value: '#00b42a',
      title: t.green
    },
    cyan: {
      value: '#14C9C9',
      title: t.cyan
    },
    blue: {
      value: '#3491FA',
      title: t.blue
    },
    arcoblue: {
      value: '#165dff',
      title: t['arco-blue']
    },
    purple: {
      value: '#722ed1',
      title: t.purple
    },
    pinkpurple: {
      value: '#D91AD9',
      title: t['pink-purple']
    },
    magenta: {
      value: '#F5319D',
      title: t.magenta
    }
  }

  const COLORS_PURE = (() => {
    const obj = {}
    // @ts-expect-error
    Object.keys(COLORS).forEach((name: sring) => {
      // @ts-expect-error
      obj[name] = COLORS[name].value
    })
    return obj
  })()
  const colorList = COLORS_PURE


  return (
    <div>
      <div className="wrapper">
        <MDXRemote {...source} />
      </div>

      <div className={`${prefixCls}-btn-wrapper`}>
        <Radio.Group
          type="button"
          options={[
            { label: 'light', value: 'light' },
            { label: 'dark', value: 'dark' }
          ]}
          style={{ marginRight: 20 }}
        />
        <Radio.Group
          onChange={(value) => {setFormat(value.toLowerCase()) }}
          type="button"
          value={format.toUpperCase()}
          options={['HEX', 'RGB', 'HSL']}
        />
      </div>
      <Content
        style={{
          marginTop: 20,
          padding: '0 10px',
          borderRadius: 6
        }}
      >
        <Row gutter={20}>
          {Object.keys(COLORS).map((colorName) =>
          // function generate(arg0: any, arg1: { list: boolean; dark: boolean; }): any {
          //   throw new Error('Function not implemented.');
          // }

            (
              <Col
                key={colorName}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                xxl={{ span: 6 }}
              >
                <Card
                  format={format}
                  // @ts-expect-error
                  colors={generate(colorList[colorName], {
                    list: true,
                    dark: false
                  })}
                  name={colorName}
                  // @ts-expect-error
                  title={COLORS[colorName].title}
                />
              </Col>
            )
          )}
          <Col
            sm={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 8 }}
            xxl={{ span: 6 }}
          >
            <Card
              format={format}
              colors={grayColorList}
              name="gray"
              title={t.gray}
            />
          </Col>
        </Row>
      </Content>
    </div>
  )
}
