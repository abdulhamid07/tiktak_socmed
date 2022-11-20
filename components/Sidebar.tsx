import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { useState } from 'react'
import Discover from './Discover'
import SuggestedAccount from './SuggestedAccount'
import Footer from './Footer'

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const normalLink = 'flex items-center justify-center gap-3 hover:bg-primary py-3 xl:justify-start font-semibold text-[#F51997] rounded cursor-pointer'

  return (
    <div>
      <div
        className='block xl:hidden ml-6 mt-3 text-2xl'
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ?
          <ImCancelCircle />
          :
          <AiOutlineMenu />
        }
      </div>
      {showSidebar && (
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
      )}
    </div>
  )
}

export default Sidebar