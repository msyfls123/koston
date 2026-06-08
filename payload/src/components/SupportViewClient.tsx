'use client'
import { Support } from "@/payload-types";
import { SupportTarget } from "@/consts";
import { useCallback, useRef, useState } from "react";

const updateDialogue = (id: string, payload: Partial<Support>) => {
  return fetch(`/api/supports/${id}`, {
    method: "PATCH", 
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}

const findSupport = (id: string) => fetch(`/api/supports/${id}`).then(res => res.json())
const formatTime = (text: string) => {
  return new Date(text).toLocaleString()
}

interface ISupportViewClientProps {
  doc: Support
}

export const SupportViewClient = ({ doc }: ISupportViewClientProps) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [support, setSupport] = useState<Support>(doc)

  const reload = useCallback(() => {
    findSupport(doc.id).then(res => {
      setSupport(res)
    })
  }, [doc])

  const handleDeleteMessage = useCallback((mid?: string | null) => {
    if (!window.confirm('确认删除？')) return
    updateDialogue(doc.id, {
      dialogue: support.dialogue?.filter((msg) => msg.id !== mid)
    }).then((res) => setSupport(res.doc))
  }, [doc])

  const handleSendMessage = useCallback(() => {
    const text = inputEl.current?.value
    if (!text) return
    updateDialogue(doc.id, {
      dialogue: [
        ...(support.dialogue ?? []),
        { content: text, sender: SupportTarget.Staff }
      ]
    }).then((res) => setSupport(res.doc))
  }, [])

  const handleMarkFinished = useCallback((flag: boolean) => {
    updateDialogue(doc.id, {
      finished: flag
    }).then((res) => setSupport(res.doc))
  }, [doc])

  return (
    <div>
      <div className="flex justify-between items-center">
        {!support.finished && <button
          onClick={() => handleMarkFinished(true)}
          className="px-4 h-12 text-lg rounded-2xl cursor-pointer border-slate-400 hover:bg-slate-600 hover:text-white"
        >
          标记为已完成
        </button>}
        {support.finished && <div className="py-6 text-xl text-red-600 font-medium flex items-center">
          ✅️ 已完成
          <button
            onClick={() => handleMarkFinished(false)}
            className="bg-slate-300 ml-2 border-0 text-slate-100 rounded-full text-sm hover:bg-slate-500 cursor-pointer"
          >撤销</button>
        </div>}
        <div className="text-lg space-y-2 text-slate-600 text-right">
          <p>创建时间：{formatTime(doc.createdAt)}</p>
          <p>最后回复时间：{formatTime(doc.updatedAt)}</p>
        </div>
      </div>
      <ul className="mt-10 p-12 space-y-5 max-h-200 overflow-y-auto border border-slate-200 bg-slate-200">
        {support.dialogue?.map((message) => (
          <li
            key={message.id}
            className={'flex flex-col ' + (message.sender === SupportTarget.Customer ? 'items-start' : 'items-end')}
          >
            <div className="text-slate-500">
              <span className="text-xl mr-2">{message.sender === SupportTarget.Staff ? '客服' : '用户'}</span>
              <span className="text-sm text-slate-400">{message.time && new Date(message.time).toLocaleString()}</span>
            </div>
            <div
              className={
                "relative rounded-2xl text-xl bg-green-500 px-5 py-4 mt-4 tracking-wider text-gray "
                + (message.sender === SupportTarget.Customer && 'bg-slate-50')
              }
            >
              {message.content}
              {message.sender === SupportTarget.Staff && (
                <button
                  className="absolute -right-10 bottom-4 size-8 rounded-full cursor-pointer flex items-center bg-slate-100 hover:opacity-100 opacity-10"
                  onClick={() => handleDeleteMessage(message.id)}
                >×</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="bg-slate-100 p-4 flex-col w-full">
        <input
          ref={inputEl}
          type="text"
          placeholder="请输入内容"
          className="text-slate-800 p-3 rounded-xl w-full text-xl focus-visible:outline-none focus-visible:border-emerald-500"
          autoFocus
        ></input>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-slate-500">
            <sup className="mr-0.5">*</sup>注意回复内容需官方准确并保证语气尊重。
          </p>
          <button
            onClick={handleSendMessage}
            className="ml-auto text-white px-8 text-xl h-12 cursor-pointer bg-red-600 hover:bg-red-800 border-0 rounded-xl tracking-wider"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  )
}