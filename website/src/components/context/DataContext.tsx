import { useStore } from '@nanostores/react'
import { map } from 'nanostores'
import { useEffect, type ReactNode } from 'react'

export const getDataContext = <T extends object>(initialStore: T) => {
  const store = map(initialStore)

  const DataComp = ({ children, ...props}: T & { children: ReactNode }) => {
    useEffect(() => {
      store.set(props as T)
    }, [props])
    return children
  }

  return {
    Comp: DataComp,
    store,
    useFn: () => useStore(store)
  }
}