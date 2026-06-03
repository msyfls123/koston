import { PageType } from "payload-app/consts"

export enum RouteCategory {
  Home = 'home',
  Products = 'products',
  Industries = 'industries',
  Service = 'service',
  Advance = 'advance',
  Profile = 'profile'
}

export const AllRoutes = {
  [PageType.ProductCategory]: '/product/',
  [PageType.ProductDetail]: '/product/[id]',
  [PageType.IndustryCategory]: '/industry/',
  [PageType.IndustryDetail]: '/industry/[id]',
  [PageType.StarProducts]: '/product/stars',
  [PageType.OnlineSupport]: '/service/support',
  [PageType.OnlineService]: '/service/contact',
  [PageType.Partnership]: '/service/partner',
  [PageType.Resources]: '/service/resources',
  [PageType.Innovation]: '/innovation',
  [PageType.Sustainable]: '/sustainable',
  [PageType.About]: '/about',
  [PageType.Merits]: '/merits',
  [PageType.NewsList]: '/news',
  [PageType.NewsDetail]: '/news/[id]',
  [PageType.Careers]: '/careers',
  [PageType.Home]: '/'
}

export const RoutesMap = {
  [RouteCategory.Home]: AllRoutes[PageType.Home],
  [RouteCategory.Products]: {
    LIST: AllRoutes[PageType.ProductCategory],
    DETAIL: AllRoutes[PageType.ProductDetail],
    STARS: AllRoutes[PageType.StarProducts]
  },
  [RouteCategory.Industries]: {
    LIST: AllRoutes[PageType.IndustryCategory],
    DETAIL: AllRoutes[PageType.IndustryDetail]
  },
  [RouteCategory.Service]: {
    SUPPORT: AllRoutes[PageType.OnlineSupport],
    CONTACT: AllRoutes[PageType.OnlineService],
    PARTNER: AllRoutes[PageType.Partnership],
    RESOURCES: AllRoutes[PageType.Resources],
  },
  [RouteCategory.Advance]: {
    INNOVATION: AllRoutes[PageType.Innovation],
    SUSTAINABLE: AllRoutes[PageType.Sustainable],
  },
  [RouteCategory.Profile]: {
    ABOUT: AllRoutes[PageType.About],
    MERITS: AllRoutes[PageType.Merits],
    NEWS: {
      LIST: AllRoutes[PageType.NewsList],
      DETAIL: AllRoutes[PageType.NewsDetail]
    },
    CAREERS: AllRoutes[PageType.Careers]
  }
}

interface IRouteMap {
  [k: string]: IRouteMap | string
}

export const findRouteCategory = (routePattern: string, map: IRouteMap = RoutesMap): string | undefined => {
  return Object.entries(map).find(([, data]) => {
    if (typeof data === 'object') {
      return findRouteCategory(routePattern, data)
    } else {
      return routePattern === data
    }
  })?.[0]
}

export const getRoute = (pageType: PageType, payload?: Record<string, string | number>) => {
  const pattern = AllRoutes[pageType]
  const route = payload ? Object
    .entries(payload)
    .reduce((acc, [key, value]) => acc.replace(`[${key}]`, value.toString()), pattern)
    : pattern
  return route
}

export const HeaderNavs: Array<{
  category: RouteCategory;
  name: string;
}> = [
  {
    category: RouteCategory.Home,
    name: '首页',
  },
  {
    category: RouteCategory.Products,
    name: '产品方案',
  },
  {
    category: RouteCategory.Industries,
    name: '重点行业',
  },
  {
    category: RouteCategory.Service,
    name: '服务与支持',
  },
  {
    category: RouteCategory.Advance,
    name: '创新可持续',
  },
  {
    category: RouteCategory.Profile,
    name: '关于壳盾',
  },
]
