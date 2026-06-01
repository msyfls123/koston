export enum RouteCategory {
  Home = 'home',
  Products = 'products',
  Industries = 'industries',
  Service = 'service',
  Advance = 'advance',
  Profile = 'profile'
}

export const RoutesMap = {
  [RouteCategory.Home]: '/',
  [RouteCategory.Products]: {
    LIST: '/product/',
    DETAIL: '/product/[id]',
    STARS: '/product/stars'
  },
  [RouteCategory.Industries]: {
    LIST: '/industry/',
    DETAIL: '/industry/[id]'
  },
  [RouteCategory.Service]: {
    SUPPORT: '/service/support',
    CONTACT: '/service/contact',
    PARTNER: '/service/partner',
    RESOURCES: '/service/resources',
  },
  [RouteCategory.Advance]: {
    INNOVATION: '/innovation',
    SUSTAINABLE: '/sustainable',
  },
  [RouteCategory.Profile]: {
    ABOUT: '/about',
    MERITS: '/merits',
    NEWS: {
      LIST: '/news',
      DETAIL: '/news/[id]'
    },
    CAREERS: '/careers'
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
