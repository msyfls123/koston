import type { PageType } from 'payload-app/consts';
import { getDataContext } from './DataContext';

export interface INavContext {
  productCategories: Array<{id: string, name: string}>
  industries: Array<{id: string, name: string, cover: string}>
  starProducts: Array<{id: string, name: string, cover: string, productId: string}>
  bannerMap: Partial<Record<PageType, { normal: string, cropped: string } | null>>
}

const { Comp: NavProvider, useFn: useNavData } = getDataContext<INavContext>({
  productCategories: [],
  industries: [],
  starProducts: [],
  bannerMap: {},
})

export { 
  NavProvider,
  useNavData
}