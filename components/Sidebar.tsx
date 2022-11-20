import Link from 'next/link'
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import Discover from './Discover'
import Footer from './Footer'
import SuggestedAccount from './SuggestedAccount'

const Sidebar = ({ showSidebar }: { showSidebar: boolean }) => {
  const normalLink = 'flex items-center justify-center gap-3 hover:bg-primary py-3 xl:justify-start font-semibold text-[#F51997] rounded cursor-pointer'

  const MenuComp = () => (
    <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
      <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
        <Link href='/'>
          <div className={normalLink}>
            <p className='font-bold text-2xl'><AiFillHome /></p>
            <span className='text-xl hidden xl:block'>For You</span>
          </div>
        </Link>

      </div>
      <Discover />
      <SuggestedAccount />
      <Footer />
    </div>
  )
  return (
    <div>
      <div className='block md:hidden'>
        {showSidebar && (
          <MenuComp />
        )}
      </div>
      <div className='md:block hidden'>
        <MenuComp />
      </div>
    </div>
  )
}

export default Sidebar