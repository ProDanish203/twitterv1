import Link from 'next/link'
import React from 'react'

export const ComposeBtn = () => {
  return (
    <Link href="/composeTweet" className='fixed bottom-20 right-5'>
    <button className='bg-primary text-text p-2 rounded-full w-12 h-12 shadow-lg'>
        <i className='fas fa-feather'></i>
    </button>
    </Link>
  )
}
