import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { Video } from '../types'


interface IProps {
  post: Video
}
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false)
    } else {
      videoRef?.current?.play();
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted])
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-14 md:h-14 w-10 h-10'>
            <Link href={`/profile/${post.postedBy._id}`}>
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
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className='flex items-center gap-2'>
                <b className='flex gap-2 items-center md:text-md font-bold text-primary lowercase'>
                  {post.postedBy.userName.replaceAll(' ', '')}{` `}
                </b>{` `}
                <GoVerified className='text-blue-400 text-md' />
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
            <p className='md:block hidden text-md font-normal'>
              {post.caption}
            </p>
          </div>
        </div>
        <p className='md:hidden block text-md font-normal pl-14 mr-2 mt-[-20px] mb-4'>
          {post.caption}
        </p>
      </div>
      <div className='lg:ml-20 gap-4 relative'>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[95%] rounded-2xl cursor-pointer bg-gray-100 items-center'
            >

            </video>
          </Link>
          {isHover && (
            <div className='absolute bottom-[43%] cursor-pointer md:left-[38%] xl:left-[35%] lg:left-[27%] sm:left-[39%] left-[32%] flex gap-10'>
              {playing ? (
                <button onClick={onVideoPress} className="bg-white/20 p-2 rounded-lg">
                  <BsFillPauseFill className='text-whit text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={onVideoPress} className="bg-white/20 p-2 rounded-lg">
                  <BsFillPlayFill className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)} className="bg-white/20 p-2 rounded-lg">
                  <HiVolumeOff className='text-white text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)} className="bg-white/20 p-2 rounded-lg">
                  <HiVolumeUp className='text-white text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoCard