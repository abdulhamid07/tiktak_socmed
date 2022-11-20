import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '../../components/VideoCard'
import NoResults from '../../components/NoResults'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useAuthStore from '../../store/authStore'

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(true)
  const { allUsers } = useAuthStore()
  const router = useRouter()
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400'
  const { searchTerm }: any = router.query
  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mt-8 border-b-2 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}>
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}>
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div>
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={idx}>
                <div className='flex gap-3 cursor-pointer border-b-2 border-gray-200 py-3'>
                  <div className='w-10 h-10'>
                    <Image
                      src={user.image}
                      alt='avatar'
                      width={34}
                      height={34}
                      layout='responsive'
                      className='rounded-full'
                    />
                  </div>
                  <div>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                      {user.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : <NoResults text={`No accounts results for ${searchTerm}`} />}
        </div>
      ) : (
        <div className='flex flex-wrap gap-6 md:justify-start'>
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : <NoResults text={`No video results for ${searchTerm}`} />}
        </div>
      )
      }
    </div >
  )
}

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

  return {
    props: {
      videos: res.data
    }
  }
}

export default Search