import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify/lib'
import rehypeMathjax from 'rehype-mathjax'
import rehypeRewrite from 'rehype-rewrite'
import { unified } from 'unified'
import { MdFileParserInterface } from './interfaces/mdFileParserInterface'
import styles from '../../../pages/posts/post.module.scss'
export class UnifiedMdFileParser implements MdFileParserInterface {
  constructor() {}

  parse = async (mdFileText: string) => {
    const parsedContentHtml = await unified()
      .use(remarkParse)
      .use(remarkMath)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeRewrite, {
        selector: 'h1',
        rewrite: (node) => {
          if (node && node.type === 'element') {
            node.properties!.className = styles.h1
          }
        }
      })
      .use(rehypeMathjax)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(mdFileText)
    return String(parsedContentHtml)
  }
}
