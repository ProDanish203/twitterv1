import { Header } from '@/components/Header';
import { ComposeXheader } from '@/components/forms/ComposeXheader';
import React from 'react'

const Compose = () => {
  return (
    <section className='w-full'>
        <div>
            <Header isBack={true} label="Compose"/>
        </div>
        <div className='max-xs:w-screen w-full'>
        <ComposeXheader btnTitle='post' placeholder='What is Happening?!'/>s
        </div>
    </section>
  )
}

export default Compose;