import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor, EXPERIMENTAL_TableFeature, UploadFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { zh } from '@payloadcms/translations/languages/zh'

import { Users } from './collections/Users'
import { Products } from './collections/Products'
import { Industries } from './collections/Industries'

import { AwardImages, BannerImages, HomeSectionImages, HonorBanner, IndustryImages, NewsImages, ProductImages, ResourceFiles, RichTextImages, StarProductImages, WechatImage } from './collections/media/index'
import { StaticPages } from './globals/StaticPages'
import { TimelineImages } from './collections/media/TimelineImages'
import { StaticConfigs } from './globals/StaticConfigs'
import { News } from './collections/News'
import { Partners } from './collections/Partners'
import { Resources } from './collections/Resources'
import { Supports } from './collections/Supports'
import { label } from './libs/utils'
import { StarProducts } from './collections/StarProducts'
import { ProductCategories } from './collections/ProductCategories'
import { ResourceCategories } from './collections/ResourceCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    timezones: {
      defaultTimezone: 'Asia/Shanghai',
    },
    components: {
      graphics: {
        Logo: '@/components/Logo.tsx',
      },
    },
  },
  i18n: {
    fallbackLanguage: 'zh',
    supportedLanguages: {
      en,
      zh,
    },
  },
  globals: [
    ...StaticPages,
    ...StaticConfigs,
  ],
  collections: [
    Users,
    /** collections **/
    Products,
    Industries,
    News,
    Supports,
    Partners,
    Resources,
    StarProducts,
    ProductCategories,
    ResourceCategories,
    /** images **/
    IndustryImages,
    RichTextImages,
    BannerImages,
    TimelineImages,
    HonorBanner,
    AwardImages,
    StarProductImages,
    HomeSectionImages,
    NewsImages,
    ProductImages,
    WechatImage,
    /** files **/
    ResourceFiles,
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
    //
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
