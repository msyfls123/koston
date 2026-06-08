// about.jpg careers.jpg home.jpg honors.jpg industry-category.jpg innovation.jpg merits.jpg news.jpg online-service.jpg online-support.jpg partnership.jpg product-category.jpg resources.jpg star-products.jpg sustainable.jpg
import About from '@/assets/banners/about.jpg'
import Careers from '@/assets/banners/careers.jpg'
import Home from '@/assets/banners/home.jpg'
import IndustryCategory from '@/assets/banners/industry-category.jpg'
import Innovation from '@/assets/banners/innovation.jpg'
import Merits from '@/assets/banners/merits.jpg'
import News from '@/assets/banners/news.jpg'
import OnlineService from '@/assets/banners/online-service.jpg'
import OnlineSupport from '@/assets/banners/online-support.jpg'
import Partnership from '@/assets/banners/partnership.jpg'
import ProductCategory from '@/assets/banners/product-category.jpg'
import Resources from '@/assets/banners/resources.jpg'
import StarProducts from '@/assets/banners/star-products.jpg'
import Sustainable from '@/assets/banners/sustainable.jpg'

import { PageType } from 'payload-app/consts'

export const BannerImages: Partial<Record<PageType, ImageMetadata>> = {
  [PageType.Home]: Home,
  [PageType.ProductCategory]: ProductCategory,
  [PageType.IndustryCategory]: IndustryCategory,
  [PageType.StarProducts]: StarProducts,
  [PageType.Innovation]: Innovation,
  [PageType.Sustainable]: Sustainable,
  [PageType.About]: About,
  [PageType.Careers]: Careers,
  [PageType.NewsList]: News,
  [PageType.Merits]: Merits,
  [PageType.OnlineService]: OnlineService,
  [PageType.OnlineSupport]: OnlineSupport,
  [PageType.Partnership]: Partnership,
  [PageType.Resources]: Resources,
}