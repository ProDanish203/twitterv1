"use client"
import React from 'react'

interface Props{
    placeholder: string;
    value: string;
    onChange: any;
    label: string;
}

const Input = ({onChange, placeholder, value, label}: Props) => {
  return (
    <div className='mb-3 flex justify-center flex-col gap-1'>
        <label htmlFor="" className='text-neutral-400 ml-1'>{label}</label>
        <input type="text" 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='text-text bg-transparent outline-none border-[1px] border-neutral-500 px-2 py-2 rounded-md max-w-[500px] w-full'
        />
    </div>
  )
}

export default Input