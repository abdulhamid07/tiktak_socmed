import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { GoogleOAuthProvider } from '@react-oauth/google'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false)
  useEffect(() => {
    setIsSSR(false);
  }, [])

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-scroll md:overflow-hidden xl:hover:overflow-auto'>
            <Sidebar showSidebar={showSidebar}/>
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}
export default MyApp