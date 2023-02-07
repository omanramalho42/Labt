import Head from 'next/head'

import { lazy, Suspense, useEffect, useState } from 'react'

import Link from 'next/link'

import CookieConsent from "react-cookie-consent"

import { motion } from 'framer-motion'

import {
  Footer, TagCategorieWidget
} from '../components'

import { 
  FeaturedPosts, 
  FeaturedMeet,
  FeaturedGallery,
} from '../sections'

const FeaturedLastPost = lazy(() => import('../sections/FeaturedLastPost'));
const FeaturedLastPostMobile = lazy(() => import('../sections/FeaturedLastPostMobile'));

import { getPosts } from '../services'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-hot-toast'

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
      <CookieConsent
        location="bottom"
        buttonText="Aceitar!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "rgb(24, 24, 24)" }}
        buttonStyle={{ 
          color: "#454545", 
          fontSize: "1em",
          padding: '10px',
          borderRadius: 5,
          fontWeight: 600
        }}
        expires={150}
        enableDeclineButton
        declineButtonText="Recusar"
        declineButtonStyle={{ 
          padding: '10px', 
          borderRadius: 5,
          fontWeight: 600 
        }}
        onDecline={() => {
          toast.error("Recusado!");
        }}
        onAccept={(acceptedByScrolling) => {
          if (acceptedByScrolling) {
            // triggered if user scrolls past threshold
            toast.success("Cookies Aceitos com sucesso!");
          } else {
            toast.error("Cookies negados");
          }
        }}
      >
        Este site vai usar os cookies para melhorar a performance de usuabilidade do site.{" "}
      </CookieConsent>

      <Head>
        <title>Laboratório Tempo</title>
        <link rel="stylesheet" href="/icon.png" />
        <meta desc="Página inicial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        {mobile.innerWidth > 1000 ? (
          <div className='px-10 mb-4'>
            <Suspense fallback={<Skeleton />}>
              <FeaturedLastPost />
            </Suspense>
          </div>
        ) : (
          <div>
            <div className='my-2 mb-6'>
              <TagCategorieWidget 
                name="Home" 
                color={"#000"}
                textColor="#FFF"
              />
            </div>
            <Suspense fallback={<Skeleton />}>
              <FeaturedLastPostMobile />
            </Suspense>
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
