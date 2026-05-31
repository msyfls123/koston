
import { findRouteCategory, HeaderNavs } from '@/lib/route'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface INavProps {
  routePattern: string
}

export const Nav = ({ routePattern }: INavProps) => {
  const foundCategory = useMemo(() => findRouteCategory(routePattern), [routePattern])

  return <div className='relative'>
    <div className="h-22 border-b-2 border-b-[#c90018] flex justify-between align-middle px-20">
      <div>LOGO</div>
      <div className='flex justify-between space-x-6'>
        {HeaderNavs.map((nav) => (
          <nav className={cn(' flex justify-center items-center', {
            'text-[#c90018]': foundCategory === nav.category
          })}>
            <span className='text-base leading-none'>{nav.name}</span>
          </nav>
        ))}
      </div>
    </div>
  </div>
}