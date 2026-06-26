
import { findRouteCategory, HeaderNavs, RouteCategory } from '@/lib/route'
import { cn } from '@/lib/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdvancePanel, IndustriesPanel, ProductsPanel, ServicePanel, ProfilePanel } from './NavPanel'

interface INavProps {
  routePattern: string
  logoSrc: string
}

const NavPanelMap: Record<RouteCategory, React.ComponentType> = {
  [RouteCategory.Home]: () => null,
  [RouteCategory.Products]: ProductsPanel,
  [RouteCategory.Industries]: IndustriesPanel,
  [RouteCategory.Service]: ServicePanel,
  [RouteCategory.Advance]: AdvancePanel,
  [RouteCategory.Profile]: ProfilePanel,
}

export const Nav = ({ routePattern, logoSrc }: INavProps) => {
  const foundCategory = useMemo(() => findRouteCategory(routePattern), [routePattern])
  const [selectedNav, setSelectedNav] = useState<RouteCategory | null>(null)
  const forceOpen = useRef(false)
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

  const handleClose = useCallback((instant = false) => {
    clearTimeout(openTimerRef.current)
    if (!isPointerDownOnContentRef.current && !forceOpen.current) {
      closeTimerRef.current = window.setTimeout(() => setSelectedNav(null), instant ? 0 : 300)
    }
  }, [])

  useEffect(() => {
    const handlePointerUp = () => {
      if (!isPointerDownOnContentRef.current && forceOpen.current) {
        forceOpen.current = false
        handleClose(true)
      }
      isPointerDownOnContentRef.current = false
    }
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointerup', handlePointerUp)
    }
  })

  return <>
    <div
      className={cn(
        'fixed top-0 bottom-0 left-0 right-0 bg-none transition-all duration-200 z-[-1]',
        {
          'z-1 bg-slate-800/70': selectedNav
        }
      )}
    />
    <header className='sticky top-0 z-50'>
      <div className="relative z-1 bg-panel">
        <div className='mx-auto max-w-320 flex justify-between items-center h-22 px-20'>
          <a className='flex items-center' href="/">
            <img src={logoSrc} className='w-24 h-12' />
          </a>
          <div className='flex justify-between space-x-5 h-full'>
            {HeaderNavs.map((nav) => (
              <nav
                key={nav.category}
                className={cn('cursor-pointer flex justify-center items-end h-full px-1 hover:font-semibold', {
                  'text-[#c90018] font-semibold': foundCategory === nav.category
                })}
                onPointerEnter={() => {
                  if (nav.category === RouteCategory.Home) return
                  handleOpen(nav.category)
                }}
                onPointerLeave={() => {
                  handleClose()
                }}
                onPointerDown={() => {
                  forceOpen.current = true
                  isPointerDownOnContentRef.current = true
                  if (nav.category === RouteCategory.Home) return
                  handleOpen(nav.category)
                }}
                onClick={() => {
                  if (nav.category === RouteCategory.Home) location.href = '/'
                }}
              >
                <span className='text-lg leading-17'>{nav.name}</span>
              </nav>
            ))}
          </div>
        </div>
      </div>
      <div className='relative z-1 border-b-4 border-b-[#c90018]' />

      {selectedNav && <>
        <div
          className='absolute top-22.5 bg-white w-full pt-7 pb-16'
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
  </>
}