import { cn } from "@/lib/utils"
import { ListRestart, Loader2, Users } from "lucide-react"
import type { Support as ISupport } from "payload-app"
import { SupportTarget } from "payload-app/consts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { compareDates, getSupportId, saveSupportId } from '@/lib/support'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { actions } from "astro:actions"

const THIRTY_SECONDS = 30 * 1000
const TEN_MINUTES  = 10 * 60 * 1000

interface ISupportProps {
  hotline: string
}

export const Support = ({ hotline }: ISupportProps) => {
  const [id, setId] = useState<string | null>(null)
  const [support, setSupport] = useState<ISupport | null>(null)
  const listWithMock = useMemo(() => [
    {
      sender: SupportTarget.Staff,
      content: '欢迎来到壳盾，我们为您提供颠覆性 100% 纯水性技术，为客户解决环保与性能难以两全的行业难题。请问需要了解哪方面？',
      time: support?.createdAt ?? new Date().toLocaleString(),
      id: '0'
    },
    ...(support?.dialogue ?? [])
  ], [support])

  const inputEl = useRef<HTMLInputElement>(null)
  const listEl = useRef<HTMLUListElement>(null)
  const [loading, setLoading] = useState(false)
  const loadingTimerRef = useRef(0)
  const pollTimerRef = useRef(0)

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

  const reset = useCallback(() => {
    saveSupportId('')
    setId(null)
    setSupport(null)
    if (inputEl.current) inputEl.current.value = ''
    window.clearTimeout(pollTimerRef.current)
  }, [])

  const pollSupport = useCallback(() => {
    const idFromLocalStorage = getSupportId()
    if (!idFromLocalStorage) return
    loadingTimerRef.current = window.setTimeout(() => setLoading(true), 1000)

    actions.support.find({ id: idFromLocalStorage }).then((res) => {
      if (res.data) {
        setSupport(res.data)
      }
    }).finally(() => {
      if (loadingTimerRef.current) {
        window.clearTimeout(loadingTimerRef.current)
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!support) return

    setTimeout(() => listEl.current?.scrollTo?.({
      behavior: 'smooth',
      top: 9999
    }), 100)
  
    window.clearTimeout(pollTimerRef.current)
    const diffs = compareDates(new Date(), new Date(support.updatedAt))
    // const lastSenderIsConsumer = support.dialogue?.at(-1)?.sender === SupportTarget.Customer

    if (!diffs.overOneDay) {
      pollTimerRef.current = window.setTimeout(pollSupport, diffs.over10Minutes ? TEN_MINUTES : THIRTY_SECONDS)
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
    <div className="mt-32 mx-auto max-w-185 rounded-2xl overflow-hidden bg-white">
      <div className="h-18 px-8 text-3xl bg-text text-white flex items-center font-light flex">
        <Users className="mr-4 rounded-full bg-footer text-teal p-0.5 size-9"/>
        <h2>在线咨询</h2>
        <Button
          variant="ghost"
          onClick={() => {
            if (window.confirm('确认要重置对话？对话记录将无法恢复')) {
              reset()
            }
          }}
          title="重置对话"
          className="ml-auto rounded-full size-8 cursor-pointer"
        ><ListRestart /></Button>
      </div>
      <div className="relative">
        <ul className="px-11 pt-10 pb-20 space-y-14 max-h-100 overflow-y-auto" ref={listEl}>
          {listWithMock?.map((message) => (
            <li
              key={message.id}
              className={cn(
                'flex flex-col',
                message.sender === SupportTarget.Staff ? 'items-start' : 'items-end'
              )}
            >
              <div className="text-gray">
                <span className="text-xl mr-2">{message.sender === SupportTarget.Staff ? '在线客服' : '我'}</span>
                <span className="text-sm text-wall">{message.time && new Date(message.time).toLocaleString()}</span>
              </div>
              <div className="rounded-2xl bg-panel px-5 py-4 mt-4 tracking-wider text-gray">{message.content}</div>
            </li>
          ))}
          
        </ul>
        {loading && <div className="absolute top-0 left-0 w-full h-full bg-gray/80 flex justify-center items-center">
          <Loader2 className="animate-spin size-5" />
        </div>}
      </div>

      <div className="border-t border-t-border px-12 py-4 flex-col w-full">
        <Input
          ref={inputEl}
          type="text"
          placeholder="请输入内容"
          className="border-none text-xl! ring-0! px-0"
          autoFocus
        ></Input>
        <div className="flex justify-between items-center">
          <p className="text-xs text-wall">
            <sup className="mr-0.5">*</sup>客服尽快回复中，也可致电咨询热线：{hotline}。
            {id && <>
              <span>如未收到新消息，可尝试</span>
              <Button variant="link" className="text-teal cursor-pointer" onClick={pollSupport}>手动刷新</Button>
            </>}
          </p>
          <Button className="ml-auto text-white px-4 h-9 cursor-pointer bg-pale hover:bg-pale hover:brightness-85" variant="secondary" onClick={handleCreateOrReply}>发送</Button>
        </div>
      </div>
    </div>
  )
}