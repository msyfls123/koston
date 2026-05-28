import {
  convertLexicalToHTML, type HTMLConvertersFunction,
} from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type {
  DefaultNodeTypes,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical'
import { getStaticUrl, MediaSubDir } from '../collections/media/base'
import type { FileData, FileSize, TypeWithID } from 'payload'

type NodeTypes =
  | DefaultNodeTypes

const htmlConverters: HTMLConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: ({ node, ...args }) => {
    const uploadDoc = node.value as unknown as (FileData & TypeWithID)
    const fileName = (uploadDoc.url?? '').split('/').at(-1) as string
    const normalizedUrl = getStaticUrl(MediaSubDir.RichTextImages, fileName)
    const proxiedUploadDoc = new Proxy(uploadDoc, {
      get(target, key, receiver) {
        if (key === 'url') return normalizedUrl
        return Reflect.get(target, key, receiver)
      }
    })
    return typeof defaultConverters.upload === 'function' ? defaultConverters.upload({
      ...args,
      node: {
        ...node,
        value: proxiedUploadDoc,
      } as SerializedUploadNode,
    }) : ''
  }
})


export const convertRichText = (data: SerializedEditorState) => convertLexicalToHTML({
  data,
  converters: htmlConverters,
})