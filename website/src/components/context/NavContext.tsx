import { getDataContext } from './DataContext';

export interface INavContext {
  productCategories: Array<{id: string, name: string}>
  industries: Array<{id: string, name: string}>
  starProducts: Array<{id: string, name: string, cover: string}>
}

const { Comp: NavProvider, useFn: useNavData } = getDataContext<INavContext>({
  productCategories: [],
  industries: [],
  starProducts: []
})

export { 
  NavProvider,
  useNavData
}