import { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { getRoute } from "@/lib/route"
import { PageType } from "payload-app/consts"
import { actions } from 'astro:actions'
import type { Product } from "payload-app"
import { Button } from "../ui/button"

interface IProductCategoryProps {
  searchQuery: string
  categoryQuery?: string
  categories: Array<{
    name?: string | null
    id: string
    products?: Array<{
      name?: string | null
      id: string
    }>
  }>
}

type ProductResult = Pick<Product, 'name' | 'id' | 'engName' | 'cover'>

export const ProductCategory = ({ categories, searchQuery, categoryQuery }: IProductCategoryProps) => {
  const [query, setQuery] = useState(searchQuery)
  const [category, setCategory] = useState<string | undefined>(categoryQuery)
  const [docs, setDocs] = useState<ProductResult[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSetCategory = useCallback((cat: string) => {
    setQuery('')
    if (inputRef.current) inputRef.current.value = ''
    setCategory(cat)
  }, [])

  const handleSetQuery = useCallback((q: string) => {
    setQuery(q)
    setCategory(undefined)
  }, [])

  useEffect(() => {
    const newUrl = new URL(location.href)
    if (query.length) {
      newUrl.searchParams.delete('category')
      newUrl.searchParams.set('q', query)
      history.pushState(null, '', newUrl.href)
      actions.product.queryByText({ text: query }).then((res) => {
        if (res.data) setDocs(res.data.docs)
      })
    } else if (category) {
      newUrl.searchParams.delete('q')
      newUrl.searchParams.set('category', category)
      history.pushState(null, '', newUrl.href)
      actions.product.queryByCategory({ categoryId: category }).then((res) => {
        if (res.data) setDocs(res.data.docs)
      })
    } else {
      newUrl.searchParams.delete('q')
      newUrl.searchParams.delete('category')
      history.pushState(null, '', newUrl.href)
      actions.product.queryAll().then((res) => {
        if (res.data) setDocs(res.data.docs)
      })
    }

  }, [query, category])

  return (
    <div className="flex pt-13 px-25 pb-45 text-text">
      <aside className="w-42 lg:w-53 flex-none mr-12 lg:mr-[15%]">
        <label className="text-2xl">按产品类别查找</label>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (inputRef.current) handleSetQuery(inputRef.current.value)
          }}
          className="relative w-full border-[#c9caca] border mt-5 mb-6 rounded-lg"
        >
          <Input className="border-none rounded-lg" placeholder="输入产品关键词" defaultValue={query} ref={inputRef}/>
          <Button variant="ghost" className="absolute right-0 top-0 px-2 cursor-pointer" type="submit">
            <Search className="size-5" />
          </Button>
        </form>

        <Accordion value={category} type="single" onValueChange={(handleSetCategory)}>
          {categories.map((catItem) => (
            <AccordionItem value={catItem.id} key={catItem.id}>
              <AccordionTrigger className="hover:no-underline cursor-pointer text-lg items-center">
                {catItem.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {catItem.products?.map((product) => (
                    <li key={product.id}>
                      <a
                        className="text-gray no-underline! text-xs"
                        href={getRoute(PageType.ProductDetail, { id: product.id })}
                      >
                        {product.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <article className="max-w-225 flex-1 ">
        <ul className="w-full grid grid-cols-2 gap-8">
          {docs.map((doc) => (
            <li key={doc.id} className="bg-white">
              <a
                className="flex-1/2"
                href={getRoute(PageType.ProductDetail, { id: doc.id })}
              >
                <div className="h-43 bg-cover bg-center" style={{
                  backgroundImage: `url('${doc.cover}')`
                }} />
                <div className="flex flex-col items-center py-8">
                  <h3>{doc.name}</h3>
                  <p className="text-xs">{doc.engName}</p>
                </div>
              </a>
            </li>
          ))}
          </ul>
      </article>
    </div>
  )
}