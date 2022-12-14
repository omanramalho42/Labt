import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { 
  PostCard, 
  PostWidget, 
  Categories,
  Footer
} from '../components'

import { 
  FeaturedPosts, 
  FeaturedLastPost, 
  FeaturedMeet,
  FeaturedGallery 
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
   <motion.div
      initial={{ width: 0 }} 
      animate={{ width: '100%' }} 
      transition={{ duration: .75, ease: "easeOut" }}
      exit={{ x: '100%', transition: { duration: 0.1 } }}  
      className='mx-auto mb-8 dark:bg-black dark:text-white'
    >
      <Head>
        <title>Laboratório Temp</title>
        <link rel="stylesheet" href="/icon.png" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className='px-10 mb-5'>
        <FeaturedLastPost />
        
        <FeaturedPosts />
        <div 
          className='relative'
        >
          <FeaturedMeet />
        </div>
      </div>
      
      <div
        style={{ 
          position: 'relative',
          marginBottom: '20%', 
          marginTop: '5%', 
          zIndex: 2
        }} 
        id="banca"
      >
        <FeaturedGallery />
      </div>

      <div className='fixed-bottom'>
        <Footer />
      </div>
      
   </motion.div>
  )
}

export const getStaticProps =  async () => {
  const posts = (await getPosts()) || [];

  return {
    props: { posts }
  }
}

export default Home
