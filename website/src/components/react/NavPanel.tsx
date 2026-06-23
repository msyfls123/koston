import { Input } from "../ui/input"
import { MoveRight, Search } from 'lucide-react'
import { useNavData } from "../context/NavContext"
import { useCallback, useMemo, useRef, useState, type HTMLAttributes } from "react"
import { PageNameMap, PageType } from "payload-app/consts"
import { cn } from "@/lib/utils"
import { AllRoutes, getRoute } from "@/lib/route"

const ProductGroup = ({
  label,
  list,
  onHover,
  ...props
}: {
  label: string
  list: Array<{
    name: string
    url: string
    id: string
  }>
  onHover?: (id: string) => void
} & HTMLAttributes<HTMLElement>) => {
  return (
    <div {...props}>
      <h2 className="flex items-center text-text text-sm">{label}<MoveRight className="w-5 h-4 ml-2" /></h2>
      <ul className="grid grid-flow-col grid-rows-[repeat(5,auto)] gap-2 mt-3">
        {Array.from({ length: 1 }).flatMap(() => list).map(({ url, name, id }) => (
          <li key={url} className="leading-0" onPointerEnter={() => onHover?.(id)}>
            <a href={url} className="text-xs text-gray hover:text-text leading-5">{name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ProductsPanel = () => {
  const store = useNavData()
  const [starId, setStarId] = useState<string | null>(store.starProducts[0]?.id)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSearch = useCallback(() => {
    if (!inputRef.current) return
    const targetUrl = `${AllRoutes[PageType.ProductCategory]}?q=${inputRef.current.value}`
    location.href = targetUrl
  }, [])

  return <div>
    <div className="relative table border-[#c9caca] border mb-6">
      <Input ref={inputRef} placeholder="输入名称查找" className="border-none rounded-none" />
      <Search
        onClick={handleSearch}
        className="absolute right-1.5 top-1.5 cursor-pointer size-5"
      />
    </div>

    <div className="flex justify-between space-x-14">
      <ProductGroup label="按产品类别查找" list={store.productCategories.map(item => ({
        ...item,
        url: getRoute(PageType.ProductCategory) + `?category=${item.id}`,
      }))} />
      <ProductGroup label="按行业类别查找" list={store.industries.map(item => ({
        ...item,
        url: getRoute(PageType.IndustryDetail, { id: item.id }) + '#related-products',
        name: item.name
      }))} />
      <ProductGroup
        label="明星产品"
        list={store.starProducts.map(item => ({
          ...item,
          url: getRoute(PageType.ProductDetail, { id: item.productId }),
          name: item.name
        }))}
        className="ml-auto"
        onHover={setStarId}
      />
      <div className="w-50 h-27 flex-none ml-8 bg-cover" style={{
        backgroundImage: starId ? `url(${store.starProducts.find(({ id }) => id === starId)?.cover})` : undefined
      }} />
    </div>
  </div>
}

export const IndustriesPanel = () => {
  const store = useNavData()
  return (
    <div className="table">
      <h2 className="flex items-center text-text text-sm">重点行业<MoveRight className="w-5 h-4 ml-2" /></h2>
      <ul className="grid grid-cols-4 gap-4 mt-5">
        {store.industries.map(item => (
          <li key={item.id} className="w-33 h-20">
            <a href={getRoute(PageType.IndustryDetail, { id: item.id })} className="w-full h-full rounded bg-center bg-cover relative block hover-card" style={{
              backgroundImage: `url('${item.cover}')`
            }}>
              <span className="absolute bottom-2 left-2 text-white text-[10px]">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const AdvancePanel = () => {
  const { bannerMap } = useNavData()
  const sections = useMemo(() => [
    { pageType: PageType.Innovation, url: AllRoutes[PageType.Innovation], cover: bannerMap.innovation?.cropped },
    { pageType: PageType.Sustainable, url: AllRoutes[PageType.Sustainable], cover: bannerMap.sustainable?.cropped }
  ], [bannerMap])
  return (
    <div className="flex justify-between space-x-23">
      {sections.map((item) => (
        <a href={item.url} className="flex-1">
          <h2 className="flex items-center text-text text-sm">{PageNameMap[item.pageType].cnName}<MoveRight className="w-5 h-4 ml-2" /></h2>
          <div className="mt-5 max-w-128 h-49 bg-cover bg-center hover-card" style={{
            backgroundImage: `url('${item.cover}')`
          }} />

        </a>
      ))}
    </div>
  )
}

export const ServicePanel = () => {
  const { bannerMap } = useNavData()
  const sections = useMemo(() => [
    { pageType: PageType.OnlineSupport, url: AllRoutes[PageType.OnlineSupport], cover: bannerMap["online-support"]?.cropped },
    { pageType: PageType.OnlineService, url: AllRoutes[PageType.OnlineService], cover: bannerMap["online-service"]?.cropped },
    { pageType: PageType.Partnership, url: AllRoutes[PageType.Partnership], cover: bannerMap.partnership?.cropped },
    { pageType: PageType.Resources, url: AllRoutes[PageType.Resources], cover: bannerMap.resources?.cropped },
  ], [bannerMap])
  const [selectedPage, setSelectedPage] = useState(PageType.OnlineSupport)
  const selectedSection = useMemo(() => sections.find(({ pageType }) => pageType === selectedPage), [selectedPage])

  return (
    <div className="flex justify-between mt-3">
      <ul className="space-y-4">
        {sections.map((item) => (
          <li key={item.url} onPointerEnter={() => setSelectedPage(item.pageType)}>
            <a
              href={item.url}
              className={cn("flex items-center text-gray text-sm",
                selectedPage === item.pageType && 'text-text'
              )}
            >
              {PageNameMap[item.pageType].cnName}<MoveRight className="w-5 h-4 ml-2" />
            </a>
          </li>
        ))}
      </ul>
      <a
        href={selectedSection?.url}
        className="max-w-128 h-49 bg-cover bg-center flex-1"
        style={{
          backgroundImage: `url('${selectedSection?.cover}')`
        }}
      />
    </div>
  )
}

export const ProfilePanel = () => {
  const { bannerMap } = useNavData()
  const sections = useMemo(() => [
    { pageType: PageType.About, url: AllRoutes[PageType.About], cover: bannerMap.about?.cropped },
    { pageType: PageType.Merits, url: AllRoutes[PageType.Merits], cover: bannerMap.merits?.cropped },
    { pageType: PageType.NewsList, url: AllRoutes[PageType.NewsList], cover: bannerMap['news-list']?.cropped },
    { pageType: PageType.Careers, url: AllRoutes[PageType.Careers], cover: bannerMap.careers?.cropped },
  ], [bannerMap])
  const [selectedPage, setSelectedPage] = useState(PageType.About)
  const selectedSection = useMemo(() => sections.find(({ pageType }) => pageType === selectedPage), [selectedPage])

  return (
    <div className="flex justify-between mt-3">
      <ul className="space-y-4">
        {sections.map((item) => (
          <li key={item.url} onPointerEnter={() => setSelectedPage(item.pageType)}>
            <a
              href={item.url}
              className={cn("flex items-center text-gray text-sm",
                selectedPage === item.pageType && 'text-text'
              )}
            >
              {PageNameMap[item.pageType].cnName}<MoveRight className="w-5 h-4 ml-2" />
            </a>
          </li>
        ))}
      </ul>
      <a
        href={selectedSection?.url}
        className="max-w-128 h-49 bg-cover bg-center flex-1" style={{
          backgroundImage: `url('${selectedSection?.cover}')`
        }}
      />
    </div>
  )
}