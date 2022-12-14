import { GoogleLogin, googleLogout } from '@react-oauth/google'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import useAuthStore from '../store/authStore'
import { createOrGetUser } from '../utils'
import Logo from '../utils/tiktak-logo.png'
import { AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { MdKeyboardBackspace } from 'react-icons/md'

const Navbar = ({ setShowSidebar, showSidebar }: { setShowSidebar: Dispatch<SetStateAction<boolean>>, showSidebar: boolean }) => {
  const router = useRouter();

  const { userProfile, addUser, removeUser }: { userProfile: any, addUser: any, removeUser: any } = useAuthStore();
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <div
        className='block md:hidden text-2xl'
        onClick={() => router.pathname === "/upload" ? setShowSidebar(false) : setShowSidebar((prev) => !prev)}
      >
        {router.pathname === "/upload" ? (
          <Link href={`/`} >
            <MdKeyboardBackspace className='cursor-pointer' />
          </Link>
        ) : (
          <>
            {showSidebar ?
              <ImCancelCircle />
              :
              <AiOutlineMenu />
            }
          </>
        )}
      </div>
      <Link href={'/'}>
        <div className='w-[100px] md:w-[130px]'>
          <Image
            src={Logo}
            alt='tiktak'
            layout='responsive'
            className='cursor-pointer'
          />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 left-20 bg-white'
        >
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search accounts and videos'
            className='bg-primary p-3 md:text-md font-normal border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-200 pl-4 text-2xl text-gray-400'
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 rounded-md'>
                <IoMdAdd className='text-xl' />{` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <Image
                  width={40}
                  height={40}
                  className='rounded-full cursor-pointer'
                  src={userProfile.image}
                  alt='image profile'
                />
              </Link>
            )}
            <button
              className='px-2'
              type='button'
              onClick={() => {
                googleLogout()
                removeUser()
              }
              }
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </div>
        ) : (
          <>
            <div className='md:hidden flex flex-row'>
              <GoogleLogin
                text='signin'
                type='icon'
                onSuccess={(response) => createOrGetUser(response, addUser)}
                onError={() => console.log('Error')}
              />
            </div>
            <div className='md:block hidden'>
              <GoogleLogin
                type='standard'
                onSuccess={(response) => createOrGetUser(response, addUser)}
                onError={() => console.log('Error')}
              />
            </div>
          </>
        )}
      </div>
    </div >
  )
}

export default Navbar