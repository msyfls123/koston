import { Input } from "../ui/input"
import { MoveRight, Search } from 'lucide-react'
import { useNavData } from "../context/NavContext"
import { useState, type HTMLAttributes } from "react"

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
      <ul className="grid grid-flow-col grid-rows-[repeat(5,auto)] gap-1 mt-3">
        {Array.from({ length: 1 }).flatMap(() => list).map(({ url, name, id }) => (
          <li key={url} className="leading-0" onPointerEnter={() => onHover?.(id)}>
            <a href={url} className="text-xs text-gray">{name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ProductsPanel = () => {
  const store = useNavData()
  const [starId, setStarId] = useState<string | null>(null)

  return <div>
    <div className="relative table border-[#c9caca] border mb-6">
      <Input placeholder="输入名称查找" className="border-none rounded-none" />
    <Search className="absolute right-1.5 top-1.5 cursor-pointer size-5" />
    </div>

    <div className="flex justify-between space-x-14">
      <ProductGroup label="按产品类别查找" list={store.productCategories.map(item => ({
        ...item,
        url: item.id,
      }))}/>
      <ProductGroup label="按行业类别查找" list={store.industries.map(item => ({
        ...item,
        url: item.id,
        name: item.name
      }))} />
      <ProductGroup
        label="明星产品"
        list={store.starProducts.map(item => ({
          ...item,
          url: item.id,
          name: item.name
        }))}
        className="ml-auto"
        onHover={setStarId}
      />
      <div className="w-50 h-27 flex-none ml-8 bg-cover" style={{
        backgroundImage: starId ? `url(${store.starProducts.find(({ id }) => id === starId)?.cover})` : undefined
      }}/>
    </div>
  </div>
}