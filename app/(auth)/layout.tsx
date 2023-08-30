import { Provider } from '@/components/Provider'
import '../globals.css'
import type { Metadata } from 'next'
import { getServerSession } from "next-auth";
import { GET } from '../api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Home | Twitter',
  description: 'From breaking news and entertainment to sports and politics, get the full story with all the live commentary.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(GET)
  // @ts-ignore
  if(session?.user) redirect("/")

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className='h-screen bg-black'>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
