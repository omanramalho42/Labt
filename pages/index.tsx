import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { 
  PostCard, 
  PostWidget, 
  Categories,
  Footer
} from '../components'

import { 
  FeaturedPosts, 
  FeaturedLastPost, 
  FeaturedMeet 
} from '../sections'

import { getPosts } from '../services'

const Home: NextPage = ({ posts }: any) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    try {
      if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
  
      // Whenever the user explicitly chooses light mode
      localStorage.theme = 'light'
  
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = 'dark'
  
      // Whenever the user explicitly chooses to respect the OS preference
      localStorage.removeItem('theme');
    } catch (error) {
      throw error;
    } finally { }

    return () => {
      setDark(true);
    }
  },[]);
  
  return (
   <div className='mx-auto px-10 mb-8 dark:bg-black dark:text-white'>
      <Head>
        <title>Laboratório Temp</title>
        <link rel="stylesheet" href="/icon.png" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <FeaturedLastPost />
      
      <FeaturedPosts />
      <div className='mt-14'>
        <FeaturedMeet />
      </div>

      {/* <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-12 col-span-1'>
          { posts?.map((i: any, idx: number) => (
            <div key={idx}>
              <PostCard post={i.node} key={i.title} />
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={posts} slug="" />
            <Categories />
          </div>
        </div>
      </div> */}

      <Footer />
      
   </div>
  )
}

export const getStaticProps =  async () => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}

export default Home
