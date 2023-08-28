import { Sidebar } from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { RightSidebar } from '@/components/RightSidebar'

export const metadata: Metadata = {
  title: 'Home | Twitter',
  description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className='h-screen bg-black'>
        <div className='container h-screen w-screen mx-auto'>

        <div className='relative max-w-7xl flex mx-auto w-full min-h-[200vh]'>
          <div className='max-xs:hidden'>
            <Sidebar/>
          </div>
          <div className='relative md:flex-1'>
            <div className='pt-28'>
              {children}
            </div>
          </div>
          <div className='max-lg:hidden'>
            <RightSidebar/>
          </div>
        </div>

        </div>
      </body>
    </html>
  )
}
