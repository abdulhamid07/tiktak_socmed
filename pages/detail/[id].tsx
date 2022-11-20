import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'
import Comments from '../../components/Comments'
import LiketButton from '../../components/LiketButton'
import useAuthStore from '../../store/authStore'
import { Video } from '../../types'
import { BASE_URL, createOrGetUser } from '../../utils'


interface IProps {
  postDetails: Video
}
const Detail = ({ postDetails }: IProps) => {
  const router = useRouter()
  const [post, setPost] = useState(postDetails)
  const { addUser }: { addUser: any } = useAuthStore();
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [comment, setComment] = useState('')
  const [isPostingComment, setisPostingComment] = useState(false)
  const { userProfile }: any = useAuthStore()
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false)
    } else {
      videoRef?.current?.play();
      setPlaying(true)
    }
  }

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })
      setPost({ ...post, likes: data.likes })
    }
  }
  const addComment = async (e) => {
    e.preventDefault()

    if (userProfile && comment) {
      setisPostingComment(true)

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setisPostingComment(false)
    }
  }
  if (!post) return null

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted, videoRef])

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer'>
            <MdOutlineCancel className='text-white text-[35px]' onClick={() => router.back()} />
          </p>
        </div>
        <div className='relative '>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className='h-full cursor-pointer'
            >
            </video>
          </div>
          <div className='absolute top-[45%] left-[45%]'>
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>
      <div className='relative w-[1000px] md:w[900px] lg:w-[700px] px-4'>
        <div className='lg:mt-10 mt-10'>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-14 md:h-14 w-12 h-12'>
              <Link href='/'>
                <>
                  <Image
                    width={62}
                    height={62}
                    className='rounded-full'
                    src={post.postedBy.image}
                    alt='image post'
                    layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href='/'>
                <div className='flex flex-col gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName.replaceAll(' ', '')}{` `}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className='px-4 text-lg text-gray-600'>
            {post.caption}
          </p>
          <div className='mt-10 px-4'>
            {userProfile ? (
              <LiketButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            ) : (
              <div className='mb-4'>
                <GoogleLogin
                  onSuccess={(response) => createOrGetUser(response, addUser)}
                  onError={() => console.log('Error')}
                />
              </div>
            )}
          </div>
          <Comments
            comment={comment}
            setComment={setComment}
            comments={post.comments}
            addComment={addComment}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: {
      postDetails: data
    }
  }
}

export default Detail