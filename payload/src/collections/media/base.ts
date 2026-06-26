import path from 'path'
import { CollectionConfig } from 'payload'

type ImageWithSizes = {
  filename?: string | null
  sizes?: Record<string, { filename?: string | null } | undefined> | null
}

export const UPLOAD_BASE_DIR = path.join('upload')

export const getUploadDir = (subdir: string) => path.join(UPLOAD_BASE_DIR, subdir)

export enum MediaSubDir {
    IndustryImages = 'industry-images',
    RichTextImages = 'richtext-images',
    BannerImages = 'banner-images',
    TimelineImages = 'timeline-images',
    HonorBanner = 'honor-banner',
    AwardImages = 'award-images',
    ResourceFiles = 'resource-files',
    StarProductImages = 'star-product-images',
    HomeSectionImages = 'home-section-images',
    NewsImages = 'news-images',
    ProductImages = 'product-images',
    WechatImage = 'wechat-image'
}

const normalize = (url: string) => url.replace(/\\/g, '/')

export const getStaticPath = (subdir: string, fileName: string) =>
    normalize(path.join('upload', subdir, fileName))

export const getStaticUrl = (subdir: string, fileName: string) => {
    const staticPath = getStaticPath(subdir, fileName)
    return normalize(
        process.env.IN_DOCKER ? path.join('/', staticPath)
                              : new URL(`/api/${subdir}/file/${fileName}`, 'http://localhost:3000').href
    )
}

export const getCertainSizeImageName = (fileData: ImageWithSizes | null | undefined, sizeName: string) => {
  if (!fileData) return ''
  const targetSize = fileData.sizes?.[sizeName]
  if (targetSize?.filename) return targetSize.filename
  return fileData.filename ?? ''
}

export const BaseImageConfig: Partial<CollectionConfig> = {
  access: {
    read: () => true,
  }
}