import Head from 'next/head'

import { useEffect, useState } from 'react'

import Link from 'next/link'

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
  FeaturedGallery,
  FeaturedLastPostMobile
} from '../sections'

import { getPosts } from '../services'

const Home = () => {
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
  
  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState('');
  const [filterPost, setFilteredPost] = useState([{}]);

  const autoFetchDataPosts = async () => {
    let success = false;
    
    try {
      await getPosts()
        .then((res) => { 
            setPosts(res.map(({ node }, idx) => ({ node }) )), 
            success = true
          }).catch(
            (error) => {
              console.log('Ocorreu um erro: ' + error) 
              throw error;
            }
          );
    } catch(error) {
      success = false;
      throw error;
    }
  }

  const handleFilterPosts = (title) => {
    if(search != "") {
      let obj = [];
      posts?.map(
        (i) => {
          i.node.title.toLowerCase().trim().includes(title)
          &&
          obj.push(i.node)
          setFilteredPost(rest => { 
            return {
              ...rest, 
              obj
            } 
          }
        )}
      );
    }
  }

  useEffect(() => {
    autoFetchDataPosts();
  },[]);

  useEffect(() => {
    handleFilterPosts(search.toLowerCase());
  }, [search]);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerHeight, innerWidth };
  }

  const [mobile, setMobile] = useState(0);  

  useEffect(() => {
    const handleWindowResize = () => {
      setMobile(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  },[]);

  useEffect(() => {
    if(document.documentElement.clientWidth !== undefined ) {
      setMobile({ innerWidth: 
        document.documentElement.clientWidth
      });
    }
  },[]);
  
  return (
   <motion.div
      className='mx-auto mb-8 dark:bg-black dark:text-white'
    >
      <Head>
        <title>Laboratório Temp</title>
        <link rel="stylesheet" href="/icon.png" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        {mobile.innerWidth > 1000 ? (
          <div className='px-10 mb-4'>
            <FeaturedLastPost />
          </div>
        ) : (
          <div>
            <span className='mb-8 mx-10 mt-5' style={{ display: 'flex', borderBottom: '1px solid black' }} />
            <div 
              className='relative' 
              style={{ 
                top: '-50px', 
                left: mobile.innerWidth < 580 ? '38%' : '45%',
                backgroundColor: '#000', 
                width: '100px', 
                padding: '10px', 
                borderRadius: '50%' 
              }}
            >
              <Link href="/">
                <p style={{ color: '#FFF', textAlign: 'center' }}>
                  Home
                </p>
              </Link>
            </div>
            <FeaturedLastPostMobile />
          </div>
        )}
        
        <div className='px-8 mb-4'>
          <FeaturedPosts />
        </div>
        
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
