import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { actions } from 'astro:actions'
import { Loader2 } from "lucide-react";
import { getRoute } from "@/lib/route";
import { PageType } from "payload-app/consts";
import type { PaginatedDocs } from "payload";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

interface INewsListProps {
  year: number
  page: number
  yearsWithNews: {
    count: number;
    year: number;
  }[]
}

interface INewsItem {
  id: string
  title?: string | null
  date?: string | null
}

const LIMIT = 5

const getDateText = (text: string) => {
  const d = new Date(text)
  return `${d.getFullYear()}年${d.getMonth()}月${d.getDay()}日`
}

export const NewsList = ({
  year: yearProps,
  page: pageProps,
  yearsWithNews,
}: INewsListProps) => {
  const [year, setYear] = useState(yearProps.toString())
  const [page, setPage] = useState(pageProps)
  const [list, setList] = useState<INewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const loadingTimerRef = useRef(0)
  const [paginationInfo ,setPaginationInfo] = useState<Omit<PaginatedDocs, 'docs'> | null>(null)

  useEffect(() => {
    loadingTimerRef.current = window.setTimeout(() => setLoading(true), 1000)

    const url = new URL(location.href)
    url.searchParams.set('page', page.toString())
    url.searchParams.set('year', year)
    history.replaceState(null, '', url.href)

    actions.news.query({
      year: Number(year),
      page,
      limit: LIMIT
    }).then((res) => {
      if (res.data) {
        const { docs, ...rest } = res.data
        setList(res.data.docs)
       setPaginationInfo(rest)
      }
    }).catch(err => {
      console.error(err)
      setPaginationInfo(null)
      setList([])
    }).finally(() => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current)
      }
      setLoading(false)
    })
  }, [year, page])

  return (
    <article className="px-25 py-30">
      <div className="flex items-center">
        <label className="text-teal">选择年份：</label>
        <Select value={year} onValueChange={(v) => {
          setYear(v)
          setPage(1)
        }}>
          <SelectTrigger >
            <SelectValue placeholder="年份">{year}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {yearsWithNews.map(({ year }) => (
                <SelectItem value={year.toString()} key={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <ul className="relative mt-12">
        {list.map((item) => (
          <li key={item.id}>
            <a
              className="border-b border-b-gray py-10 block hover:bg-linear-to-r from-transparent to-panel"
              href={getRoute(PageType.NewsDetail, { id: item.id })}
            >
              {item.date && <div className="text-2xl text-teal">{getDateText(item.date)}</div>}
              <h2 className="text-gray text-lg mt-6">{item.title}</h2>
            </a>
          </li>
        ))}
        {loading && <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 flex justify-center items-center">
          <Loader2 className="animate-spin size-5" />
        </div>}
      </ul>

      {paginationInfo && (
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              {paginationInfo.hasPrevPage && <PaginationItem>
                <PaginationPrevious
                  href="#"
                  className="[&>span]:hidden"
                  onClick={() =>setPage(p => p - 1)}
                />
              </PaginationItem>}
              {Array.from({ length: paginationInfo.totalPages }).map((v, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              {paginationInfo.hasNextPage && <PaginationItem>
                <PaginationNext
                  href="#"
                  className="[&>span]:hidden"
                  onClick={() =>setPage(p => p + 1)}
                />
              </PaginationItem>}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </article>
  )
}