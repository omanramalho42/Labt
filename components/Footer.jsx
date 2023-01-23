import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import PostCard from './PostCard'
import { motion } from 'framer-motion'
import { getPosts } from '../services'

const Footer = () => {
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
    <footer className="text-center text-black mt-14">

      <div className='flex flex-col'>
        {mobile.innerWidth < 1000 && (
          <div className='flex-col text-center'>
            <input
              placeholder='Pesquisa'
              className='search'
              style={{ borderRadius: '25px', border: '1px solid #c9c9c9' }} 
              value={search} 
              onChange={
                (event) => setSearch(event.target.value.toUpperCase())
              } 
            />
          </div>
        )}

        {search && mobile.innerWidth < 1000 && ( 
          <div className='grid grid-cols-1 gap-12 pb-16 mt-4'>
            {filterPost.obj?.map((i, idx) => (
              <motion.div
                initial={{ width: 0 }} 
                animate={{ width: '95%', margin: '10px' }} 
                transition={{ duration: .75, ease: "easeOut" }}
                exit={{ x: '100%', transition: { duration: 0.1 } }}
                className="col-span-1 sm:col-span-2"
                key={idx}
              >
                <Link href={'/post/'+i.slug}>
                  <PostCard post={i} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-6 pt-6">
        <div className='text-center mb-4'>
          <h3 className='font-bold text-3xl uppercase'>
            Contato
          </h3>
          <p>escrevapara@labtempo.com.br</p>
          <p>+55 (71) 9.9262.4841</p>
        </div>

        <div className="flex justify-center mb-1">
          <a 
            href="https://www.facebook.com/profile.php?id=100088693333749" 
            type="button" 
            className="rounded-full border-2 border-black text-black leading-normal text-center uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
          >
            <svg aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="facebook-f"
              className="w-2 h-full mx-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
            <path
              fill="currentColor"
              d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
            ></path>
            </svg>
          </a>

          <a href="www.instagram.com/labtempo" type="button" className="rounded-full border-2 border-black text-black leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
            <svg aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="instagram"
              className="w-3 h-full mx-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              ></path>
            </svg>
          </a>

          <a href="https://www.youtube.com/channel/UCB4cQUJz7NK3k5D_yGux1Pw" type="button" className="rounded-full border-2 border-black text-black leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-full mx-auto"
            viewBox="0 0 16 16"
          > 
            <path
              fill="currentColor" 
              d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" 
            ></path> 
          </svg>
          </a>
        </div>
      </div>

      <div className="text-center p-4">
        © 2022 Copyright:
        <a className="text-whitehite ml-1" href="https://tailwind-elements.com/"> 
          Oman Company with Konda Digital.  
        </a>
        <p>
          Todos os direitos reservados.
          Proibida reprodução sem autorização.
        </p>
      </div>
    </footer>
  )
}

export default Footer