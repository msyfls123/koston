import { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { ChevronDown, Download, Loader2, Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { getRoute } from "@/lib/route"
import { PageType } from "payload-app/consts"
import { actions } from 'astro:actions'
import type { Product, Resource } from "payload-app"
import { Button } from "../ui/button"
import type { PaginatedDocs } from "payload"

interface IResourceCategoryProps {
  searchQuery: string
  categoryQuery?: string
  categories: Array<{
    name?: string | null
    id: string
    resources: {
      content: string;
      id: string;
      title?: string | null;
    }[]
  }>
}

type ResourceResult = Pick<Resource, 'title' | 'id' | 'content'>

const LIMIT = 10

const getDownloadName = (url: string, title: string) => {
  const filename = url.split('/').at(-1)
  const ext = filename?.split('.').at(-1)
  return `${title}.${ext}`
}

export const Resources = ({ categories, searchQuery, categoryQuery }: IResourceCategoryProps) => {
  const [query, setQuery] = useState(searchQuery)
  const [category, setCategory] = useState<string | undefined>(categoryQuery)
  const [docs, setDocs] = useState<ResourceResult[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const loadingTimerRef = useRef(0)
  const [paginationInfo ,setPaginationInfo] = useState<Omit<PaginatedDocs, 'docs'> | null>(null)

  const handleSetCategory = useCallback((cat: string) => {
    setQuery('')
    if (inputRef.current) inputRef.current.value = ''
    setCategory(cat)
    setPage(1)
  }, [])

  const handleSetQuery = useCallback((q: string) => {
    setQuery(q)
    setCategory(undefined)
    setPage(1)
  }, [])

  useEffect(() => {
    const newUrl = new URL(location.href)
    loadingTimerRef.current = window.setTimeout(() => setLoading(true), 1000)

    const finalize = () => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current)
      }
      setLoading(false)
    }

    const handleData = (res: PaginatedDocs<Pick<Resource, 'title' | 'content' | 'id'>> | undefined) => {
      if (res) {
        const { docs, ...rest } = res

        setDocs(currentDocs => {
          const currentIndex = (rest.page! - 1) * rest.limit!
          const newDocs = Array.from({ length: currentIndex + docs.length }).map((v, i) => {
            return (i >= currentIndex && i < currentIndex + rest.limit!) ? docs[i - currentIndex] : currentDocs[i]
          })
          return newDocs
        })
        setPaginationInfo(rest)
      }
    }
  
    if (query.length) {
      newUrl.searchParams.delete('category')
      newUrl.searchParams.set('q', query)
      history.pushState(null, '', newUrl.href)
      actions.resource.queryByText({ text: query, page, limit: LIMIT }).then((res) => handleData(res.data)).finally(finalize)
    } else if (category) {
      newUrl.searchParams.delete('q')
      newUrl.searchParams.set('category', category)
      history.pushState(null, '', newUrl.href)
      actions.resource.queryByCategory({ categoryId: category, page, limit: LIMIT }).then((res) => handleData(res.data)).finally(finalize)
    } else {
      newUrl.searchParams.delete('q')
      newUrl.searchParams.delete('category')
      history.pushState(null, '', newUrl.href)
      actions.resource.queryByAll({ page, limit: LIMIT }).then((res) => handleData(res.data)).finally(finalize)
    }

  }, [query, category, page])

  return (
    <div className="flex pt-35 px-25 pb-45 text-text">
      <aside className="w-42 lg:w-53 flex-none mr-24 lg:mr-[25%]">
        <div className="text-teal mb-15">
          <h2 className="text-4xl">下载资源</h2>
          <p>Download</p>
        </div>
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

        <Accordion value={category} type="single" onValueChange={(handleSetCategory)} className="border-t border-t-card">
          {categories.map((catItem) => (
            <AccordionItem value={catItem.id} key={catItem.id} className="border-b-card">
              <AccordionTrigger className="hover:no-underline cursor-pointer text-base font-normal items-center">
                {catItem.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {catItem.resources?.slice(0, 5).map((resource) => (
                    <li key={resource.id}>
                      <a
                        className="text-gray no-underline! text-xs"
                        href={resource.content}
                        download={getDownloadName(resource.content, resource.title ?? '')}
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                  {catItem.resources?.length > 5 && <li className="text-wall">…</li>}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <article className="max-w-225 flex-1 relative">
        <ul className="w-full flex flex-col space-y-7">
          {docs.map((doc) => (
            <li key={doc.id} className="">
              <div
                className="flex justify-between items-center"
              >
                <h3 className="flex-1 mr-14 text-lg text-teal font-medium bg-panel h-13 leading-13 px-9">{doc.title}</h3>
                {typeof doc.content === 'string' && doc.title && <Button asChild variant="ghost" className="text-wall font-light text-base">
                  <a
                    href={doc.content}
                    download={getDownloadName(doc.content, doc.title)}
                  >
                    点击下载
                    <Download />
                  </a>
                </Button>}
              </div>
            </li>
          ))}
          </ul>
          {loading && <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 flex justify-center items-center">
            <Loader2 className="animate-spin size-5" />
          </div>}
          {paginationInfo?.hasNextPage && (
            <Button
              variant="outline"
              onClick={() => setPage(p => p + 1)}
              className="rounded-none text-teal hover:text-teal-950 cursor-pointer border-teal mt-10"
            >查看更多 <ChevronDown></ChevronDown>
            </Button>
          )}
      </article>
    </div>
  )
}