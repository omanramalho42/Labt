import React, { 
  useState, 
  useEffect, 
  Fragment 
} from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'

import PostCard from './PostCard'

import { getCategories } from '../services'
import { getPosts } from '../services/index'

import Skeleton from 'react-loading-skeleton'

const Header = () => {
  const [mobile, setMobile] = useState(0);  

  const [categories, setCategories] = useState([]);
  const [load ,setLoad] = useState(true);

  const [posts, setPosts] = useState(null);
  const [search, setSearch] = useState('');

  const [filterPost, setFilteredPost] = useState([{}]);
  const [headerNav] = useState([
    { name: 'Ser', slug: 'ser' },
    { name: 'Estar', slug: 'estar' },
    { name: 'Salvador', slug: 'salvador' },
    { name: 'Bahia', slug: 'bahia' }
  ]);

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerHeight, innerWidth };
  }

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

  useEffect(() => {
    try {
      getCategories()
        .then((newCategories) => setCategories(newCategories));
    } catch (error) {
       throw error;
    } finally {
      setLoad(false);
    }
  },[]);

  if(load) {
    return (
      <div className="mx-auto mb-12 container dark:bg-black dark:text-white">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton height={100} width={200} style={{ borderRadius: '25%', marginRight: 200 }} />
          <div style={{ display: 'flex' }}>
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
            <Skeleton height={32} width={22} style={{ marginRight: '1px' }} />
          </div>
        </div>
        <Skeleton count={1} />
      </div>
    )
  }

  return (
    <div className='mx-auto px-10 dark:bg-black pb-2'>
      {headerNav.map(({ name, slug }, idx) => (
        <div key={`${slug}-${idx}`}>
          <Link href={`/category/${slug}`}>
            <span className={
              `md: float-right mr-1 rounded-b-sm 
              ${name === 'Estar' 
              ? 'bg-yellow-500'
              : name === 'Salvador'
              ? 'bg-blue-600'
              : name === 'Bahia'
              ?  'bg-red-600'
              : name === 'Labt'
              ?  'bg-black-500'
              : 'bg-green-600'
              } w-6 h-8 p-1`}
            >
            </span>
          </Link>
        </div>
      ))}

      { mobile.innerWidth > 1000 && (
        <div className='flex-col items-center'>
          <input
            placeholder='Pesquisa'
            className='absolute search mx-auto lg:p-4 sm:p-1 text-center'
            style={{ borderRadius: '25px', border: '1px solid #c9c9c9' }} 
            value={search} onChange={(event) => setSearch(event.target.value.toUpperCase())} 
          />
        </div>
      )}

      <div 
        className="grid grid-cols-2 space-x-16 items-center"
      >
        <div className="md:float-left">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                default: {
                  duration: 0.3,
                  ease: [0, 0.71, 0.2, 1.01]
                },
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                }
              }}
            >
              <span className='cursor-pointer font-bold text-4xl text-black'>
                <img 
                  src='/logo.png' 
                  alt="logo labtempo" 
                  className='flex w-full h-full' 
                  style={{ 
                    maxWidth: 600,
                    width: mobile.innerWidth < 1000 ? 320 : '70%' 
                  }} 
                />
              </span>
            </motion.div>
          </Link>
        </div>
        
        <div className='w-full flex justify-between items-center'>
          <div className="hidden md:float-right md:contents items-center" style={{ fontFamily: 'Arlita' }}>
            <a
              href='/' 
              className='md:float-right flex items-center mt-2 text-black dark:text-white font-semibold cursor-pointer xl:text-3xl lg:text-2xl md:text-xl'
            >
              labT
            </a>
            <div style={{ borderRight: '2px solid black', height: '20px' }} className="mt-2 mx-2 h-full" />
            {headerNav.map((i, idx) => (
              <Fragment key={`${i.slug}-${idx}`}>
                <Link href={`/category/${i.slug}`}>
                  <span className="flex items-center md:float-right mt-2 align-middle text-black lowercase dark:text-white font-semibold cursor-pointer xl:text-3xl lg:text-2xl md:text-xl">
                    { i.name }
                  </span>
                </Link>
                <div style={{ borderRight: '2px solid black', height: '20px' }} className="mt-2 mx-2 h-full" />
              </Fragment>
            ))}
            <a 
              href='/#banca'
              className='md:float-right mt-2 disabled:opacity-25 text-black dark:text-white font-semibold cursor-pointer border-separate xl:text-3xl lg:text-2xl md:text-xl'
            >
              banca
            </a>
          </div>
        </div>
      
      </div>

      {search && ( 
        <div className='grid grid-cols-1 lg:grid-cols-9 gap-12 pb-16 mt-4'>
          {filterPost.obj?.map((i, idx) => (
            <motion.div
              initial={{ width: 0 }} 
              animate={{ width: '100%', margin: '10px' }} 
              transition={{ duration: .75, ease: "easeOut" }}
              exit={{ x: '100%', transition: { duration: 0.1 } }}
              className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3"
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
  )
}

export default Header