import { getPayload, type FileData, type UploadConfig, type UploadField, type UploadFieldClient } from "payload";
import { getCertainSizeImageName, getStaticUrl, MediaSubDir, type Banner, type BannerImage } from "payload-app";
import { PageType } from "payload-app/consts";
import { config } from 'payload-app'

export const getPayloadApp = () => getPayload({ config })

export const getBanner = (banners: Banner, pageType: PageType) => {
  // @ts-ignore
  const foundBanner = banners[pageType] as BannerImage
  if (!foundBanner || !foundBanner.filename) return null
  const normal = getStaticUrl(MediaSubDir.BannerImages, foundBanner.filename ?? '')
  const special = getStaticUrl(
    MediaSubDir.BannerImages,
    getCertainSizeImageName(foundBanner, pageType === PageType.Home ? 'home' : 'cropped')
  )
  return special ?? normal
}

export const getImageUrl = (fileData: any, subdir: MediaSubDir, sizeName: string) => {
  return (fileData && typeof fileData === 'object') ? getStaticUrl(subdir, getCertainSizeImageName(fileData, sizeName)) : ''
}