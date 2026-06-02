export enum PageType {
  ProductDetail = 'product-detail',
  ProductCategory = 'product-category',
  IndustryDetail = 'industry-detail',
  IndustryCategory = 'industry-category',
  StarProducts = 'star-products',
  Innovation = 'innovation',
  Sustainable = 'sustainable',
  About = 'about',
  Careers = 'careers',
  NewsList = 'news-list',
  NewsDetail = 'news-detail',
  Merits = 'merits',
  OnlineSupport = 'online-support',
  OnlineService = 'online-service',
  Partnership = 'partnership',
  Resources = 'resources',
  Home = 'home',
}

export const PageNameMap: Record<PageType, {
  cnName: string;
  enName: string;
}> = {
  [PageType.ProductDetail]: { cnName: '产品详情', enName: 'Product Detail' },
  [PageType.ProductCategory]: { cnName: '产品分类', enName: 'Product Category' },
  [PageType.IndustryDetail]: { cnName: '行业详情', enName: 'Industry Detail' },
  [PageType.IndustryCategory]: { cnName: '行业分类', enName: 'Industry Category' },
  [PageType.StarProducts]: { cnName: '明星产品', enName: 'Star Products' },
  [PageType.Innovation]: { cnName: '技术与创新', enName: 'Innovation' },
  [PageType.Sustainable]: { cnName: '绿色可持续', enName: 'Sustainable' },
  [PageType.About]: { cnName: '关于壳盾', enName: 'About' },
  [PageType.Careers]: { cnName: '招聘', enName: 'Careers' },
  [PageType.NewsList]: { cnName: '新闻与信息', enName: 'News and Information' },
  [PageType.NewsDetail]: { cnName: '新闻与信息', enName: 'News and Information' },
  [PageType.Merits]: { cnName: '荣誉与资质', enName: 'Honors and Qualifications' },
  [PageType.OnlineSupport]: { cnName: '在线客服', enName: 'Online Support' },
  [PageType.OnlineService]: { cnName: '热线咨询', enName: 'Online Service' },
  [PageType.Partnership]: { cnName: '加盟合作', enName: 'Partnership' },
  [PageType.Resources]: { cnName: '资源下载', enName: 'Resources' },
  [PageType.Home]: { cnName: '首页', enName: 'Home' },
}

export const BannerPages = [
  PageType.ProductCategory,
  PageType.IndustryCategory,
  PageType.StarProducts,
  PageType.Innovation,
  PageType.Sustainable,
  PageType.About,
  PageType.Careers,
  PageType.NewsList,
  PageType.Merits,
  PageType.OnlineService,
  PageType.OnlineSupport,
  PageType.Partnership,
  PageType.Resources,
]