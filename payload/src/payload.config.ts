import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor, EXPERIMENTAL_TableFeature, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { zh } from '@payloadcms/translations/languages/zh'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Industries } from './collections/Industries'

import { IndustryImages, RichTextImages } from './collections/media/index'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'zh',
    supportedLanguages: {
      en,
      zh,
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Industries,
    IndustryImages,
    RichTextImages,
    {
      slug: 'posts',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  editor: lexicalEditor({
    'features': ({ defaultFeatures }) => ([
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      UploadFeature({
        enabledCollections: ['richtext-images'],
      })
    ])
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  async onInit(payload) {
    const { totalDocs: postsCount } = await payload.count({ collection: 'posts' })

    if (!postsCount) {
      await payload.create({ collection: 'posts', data: { title: 'Post 1' } })
    }
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
