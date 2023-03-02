import Head from 'next/head'

import { Fragment, lazy, Suspense, useEffect, useState } from 'react'

import CookieConsent from "react-cookie-consent"

import { motion } from 'framer-motion'

import {
  Footer, TagCategorieWidget, WidgetNavToTop
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

import useDarkSide from '../hooks/useDarkSide'

const Home = () => {
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

      <Fragment>
        {mobile.innerWidth > 1000 ? (
          <div className='px-10 mb-4'>
            <Suspense fallback={<Skeleton />}>
              <FeaturedLastPost />
            </Suspense>
          </div>
        ) : (
          <Fragment>
            <TagCategorieWidget name="Home" />
            <Suspense fallback={<Skeleton />}>
              <FeaturedLastPostMobile />
            </Suspense> 
          </Fragment>
        )}
        
        <div className='px-0 mb-0 lg:px-8 lg:mb-4'>
          <FeaturedPosts />
        </div>
        
        <div 
          className='relative'
        >
          <FeaturedMeet />
        </div>
      </Fragment>
    
      {/* <div
        style={{ 
          position: 'relative',
          marginBottom: '20%', 
          marginTop: '5%', 
          zIndex: 2
        }} 
        id="banca"
      >
        <FeaturedGallery />
      </div> */}

      <WidgetNavToTop />

      <div className='fixed-bottom z-30 md:mt-32'>
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
