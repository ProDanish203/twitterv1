import Image from 'next/image'
import React from 'react'

export const Reply = () => {
  return (
    <div className="flex items-start gap-0 py-2 px-3 border-b-[1px] border-neutral-800">
        
    <div className="h-full w-[80px]">
        <div className="relative max-md:w-8 max-md:h-8 w-14 h-10 object-contain">
            <Image fill src="/images/logo.svg" alt="username"/>
        </div>
    </div>

    <div className="relative w-full">

        <textarea className="w-full text-text bg-transparent border-b-[1px] border-neutral-800 resize-none mb-1 outline-none"
        placeholder="What is happening?!"
        >

        </textarea>

        <div className="flex items-center justify-between gap-2">

        <div className="text-primary flex gap-5">
            <i className="far fa-image cursor-pointer"></i>
        </div>

        <button className="text-text bg-primary rounded-full px-5 py-1">Post</button>

        </div>

    </div>

    </div>
)
}
