import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'

interface IProps {
  isPostingComment: Boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>,
  addComment: (e: React.FormEvent) => void,
  comments: IComment[]
}

interface IComment {
  comment: string,
  lenght?: number,
  _key: string,
  postedBy: { _ref: string; _id: string }
}
const Comments = ({ comment, setComment, comments, addComment, isPostingComment }: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-4 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll h-[550px]'>
        {comments?.length ? (
          comments.map((items, idx) => (
            <>
              {allUsers.map((user: IUser) => (
                user._id === (items.postedBy._id || items.postedBy._ref) && (
                  <div className='p-2 items-center' key={idx}>
                    <Link href={`/profile/${user._id}`}>
                      <div className='flex items-center gap-3 cursor-pointer'>
                        <div className='w-10 h-10'>
                          <Image
                            src={user.image}
                            alt='avatar'
                            width={42}
                            height={42}
                            layout='responsive'
                            className='rounded-full'
                          />
                        </div>
                        <p className='flex gap-1 items-center mt-[-14px] text-md font-bold text-primary lowercase'>
                          {user.userName.replaceAll(' ', '')}{` `}
                          <GoVerified className='text-blue-400' />
                        </p>
                      </div>
                    </Link>
                    <p className='pl-12 mr-2 mt-[-14px]'>{items.comment}</p>
                  </div>
                )
              ))}
            </>
          ))) : (
          <NoResults text='No comments yet' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-4 md:px-10'>
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Add comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[400px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'
            />
            <button className='teext-md text-gray-400' onClick={addComment}>
              {isPostingComment ? 'Sending' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments