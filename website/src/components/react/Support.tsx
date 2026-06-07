import { cn } from "@/lib/utils"
import { Users } from "lucide-react"
import type { Support as ISupport } from "payload-app"
import { SupportTarget } from "payload-app/consts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { compareDates, getSupportId, saveSupportId } from '@/lib/support'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { actions } from "astro:actions"

const THIRTY_SECONDS = 5 * 1000
const TEN_MINUTES  = 10 * 60 * 1000

export const Support = () => {
  const [id, setId] = useState<string | null>(null)
  const [support, setSupport] = useState<ISupport | null>(null)
  const inputEl = useRef<HTMLInputElement>(null)
  const pollTimerRef = useRef(0)
  const listWithMock = useMemo(() => [
    {
      sender: SupportTarget.Staff,
      content: '欢迎来到壳盾，我们为您提供颠覆性 100% 纯水性技术，为客户解决环保与性能难以两全的行业难题。请问需要了解哪方面？',
      time: support?.createdAt ?? new Date().toLocaleString(),
      id: '0'
    },
    ...(support?.dialogue ?? [])
  ], [support])

  useEffect(() => {
    const idFromLocalStorage = getSupportId()
    if (idFromLocalStorage) {
      setId(idFromLocalStorage)
      actions.support.find({ id: idFromLocalStorage }).then((res) => {
        if (res.data) {
          setSupport(res.data)
        }
      })
    }
  }, [])

  useEffect(() => {
    const idFromLocalStorage = getSupportId()
    if (!support || !idFromLocalStorage) return
  
    window.clearTimeout(pollTimerRef.current)
    const diffs = compareDates(new Date(), new Date(support.updatedAt))
    const lastSenderIsConsumer = support.dialogue?.at(-1)?.sender === SupportTarget.Customer
    console.log(diffs, support)

    if (!diffs.overOneDay && lastSenderIsConsumer) {
      pollTimerRef.current = window.setTimeout(() => {
        actions.support.find({ id: idFromLocalStorage }).then((res) => {
          if (res.data) {
            setSupport(res.data)
          }
        })
      }, diffs.over10Minutes ? TEN_MINUTES : THIRTY_SECONDS)
    }
  }, [support])

  const handleCreateOrReply = useCallback(() => {
    const message = inputEl.current?.value
    if (!message) return

    const finalize = () => {
      if (inputEl.current) inputEl.current.value = ''
    }

    if (id) {
      actions.support.reply({
        id,
        text: message
      }).then((res) => {
        if (res.data) {
          setSupport(res.data)
        }
      }).finally(finalize)
    } else {
      actions.support.create({
        text: message
      }).then((res) => {
        if (res.data) {
          setSupport(res.data)
          setId(res.data.id)
          saveSupportId(res.data.id)
        }
      }).finally(finalize)
    }
  }, [id])

  return (
    <div className="my-32 mx-auto max-w-185 rounded-2xl overflow-hidden bg-white">
      <div className="h-18 px-8 text-3xl bg-text text-white flex items-center font-light">
        <Users className="mr-2"/> 在线咨询
      </div>
      <ul className="px-11 pt-10 pb-20 space-y-14 max-h-100 overflow-y-auto">
        {listWithMock?.map((message) => (
          <li
            key={message.id}
            className={cn(
              'flex flex-col',
              message.sender === SupportTarget.Staff ? 'items-start' : 'items-end'
            )}
          >
            <div className="text-xl text-gray">
              <span className="mr-1">{message.sender === SupportTarget.Staff ? '在线客服' : '我'}</span>
              {message.time && new Date(message.time).toLocaleString()}
            </div>
            <div className="rounded-2xl bg-panel px-5 py-4 mt-4 tracking-wider text-gray">{message.content}</div>
          </li>
        ))}
      </ul>

      <div className="border-t border-t-border px-12 py-4 flex-col w-full">
        <Input ref={inputEl} type="text" placeholder="请输入内容" className="border-none text-xl! ring-0!"></Input>
        <div className="ml-auto table">
          <Button className="ml-auto text-white px-4 h-9 cursor-pointer bg-pale hover:bg-pale hover:brightness-85" variant="secondary" onClick={handleCreateOrReply}>发送</Button>
        </div>
        
      </div>
    </div>
  )
}