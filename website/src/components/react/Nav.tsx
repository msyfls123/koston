
import { findRouteCategory, HeaderNavs, RouteCategory } from '@/lib/route'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdvancePanel, IndustriesPanel, ProductsPanel, ServicePanel, ProfilePanel } from './NavPanel'

interface INavProps {
  routePattern: string
}

const NavPanelMap: Record<RouteCategory, React.ComponentType> = {
  [RouteCategory.Home]: () => null,
  [RouteCategory.Products]: ProductsPanel,
  [RouteCategory.Industries]: IndustriesPanel,
  [RouteCategory.Service]: ServicePanel,
  [RouteCategory.Advance]: AdvancePanel,
  [RouteCategory.Profile]: ProfilePanel,
}

export const Nav = ({ routePattern }: INavProps) => {
  const foundCategory = useMemo(() => findRouteCategory(routePattern), [routePattern])
  const [selectedNav, setSelectedNav] = useState<RouteCategory | null>(null)
  const openTimerRef = useRef(0)
  const closeTimerRef = useRef(0)
  const isPointerDownOnContentRef = useRef(false)
  const PanelComp = useMemo(() => selectedNav && NavPanelMap[selectedNav], [selectedNav])

  const handleOpen = useCallback((nav: RouteCategory) => {
    clearTimeout(closeTimerRef.current)
    openTimerRef.current = window.setTimeout(() => {
      setSelectedNav(nav)
    }, 300)
  }, [])

  const handleClose = useCallback(() => {
    clearTimeout(openTimerRef.current)
    if (!isPointerDownOnContentRef.current) {
      closeTimerRef.current = window.setTimeout(() => setSelectedNav(null), 300)
    }
  }, [])

  useEffect(() => {
    const handlePointerUp = () => {
      isPointerDownOnContentRef.current = false
    }
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointerup', handlePointerUp)
    }
  })

  return <header className='relative'>
    <div
      className={cn(
        'fixed top-0 bottom-0 left-0 right-0 bg-none transition-all duration-200 z-[-1]',
        {
          'z-auto bg-slate-800/50': selectedNav
        }
      )}
    />
    <div className="relative z-1 bg-white">
      <div className='mx-auto max-w-320 flex justify-between items-center h-22 px-20'>
        <div className='flex items-center'>
          <img src="/logo.png" className='size-16' />
        </div>
        <div className='flex justify-between space-x-6 h-full'>
          {HeaderNavs.map((nav) => (
            <nav
              key={nav.category}
              className={cn('cursor-pointer flex justify-center items-center h-full', {
                'text-[#c90018]': foundCategory === nav.category
              })}
              onPointerEnter={() => {
                if (nav.category === RouteCategory.Home) return
                handleOpen(nav.category)
              }}
              onPointerLeave={() => {
                handleClose()
              }}
            >
              <span className='text-base leading-none'>{nav.name}</span>
            </nav>
          ))}
        </div>
      </div>
    </div>
    <div className='relative z-1 border-b-4 border-b-[#c90018]' />
    
    {selectedNav && <>
      <div
        className='absolute top-23 bg-white w-full pt-7 pb-16'
        onPointerEnter={() => {
          handleOpen(selectedNav)
        }}
        onPointerLeave={() => {
          handleClose()
        }}
        onPointerDown={() => {
          isPointerDownOnContentRef.current = true
        }}
      >
        <div className='mx-auto max-w-320 px-20'>
          {PanelComp && <PanelComp />}
        </div>
      </div>
    </>}

  </header>
}