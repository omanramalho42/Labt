import React, { useEffect, useState, useMemo } from 'react'

import { Helmet } from 'react-helmet'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Toaster, toast } from 'react-hot-toast'

import { getCategories, getCategoryPost } from '../../services'
import { PostCard, Categories, Loader, Footer } from '../../components'

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  const [color, setColor] = useState("");
  useEffect(() => {
    if(posts[0].node.categories[0].name === 'Salvador') {
      setColor('#2f53a1');
    } else if (posts[0].node.categories[0].name === 'Bahia') {
      setColor('#DC2626');
    } else if (posts[0].node.categories[0].name === 'Ser') {
      setColor('#3fbb5a')
    } else {
      setColor('#d5b035')
    }
  },[posts]);

  useEffect(() => {
    toast.success(`Categoria selecionada: 
      ${posts[0].node.categories[0].name}`
    );
  },[posts]);

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

  const [categorieName, setCategorieName] = useState("");
  useMemo(() => {
    if(posts) {
      setCategorieName(posts[0].node.categories[0].name);
    }
  },[posts]);

  return (
    <motion.div
      className="mx-auto px-10"
      style={{ 
        background: mobile.innerWidth < 1000 && `linear-gradient(
          to bottom,
          white 0%,
          white 15%,
          ${color} 15%,
          ${color} 100%
        )`
      }}
    >
      <Helmet>
        <title>Categorias: {categorieName || ''}</title>
        <meta charSet='utf-8'/>
      </Helmet>

      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20, marginTop: 20 }} >
        {mobile.innerWidth < 1000 ? (
          <>
            <div 
              className='absolute tag__categorie' 
              style={{ 
                zIndex: 2,
                // top: 
                //   mobile.innerWidth < 450
                //   ? '17.5%'
                //   : mobile.innerWidth < 800 
                //   ? '19.5%'
                //   : mobile.innerWidth >= 800 && mobile.innerWidth <= 830 
                //   ? '18%'
                //   : mobile.innerWidth > 830 && mobile.innerWidth < 880 
                //   ? '21.5%'
                //   : mobile.innerWidth > 880 && mobile.innerWidth < 920 
                //   ? '21.5%'
                //   : '26%',
                // left: 
                //   mobile.innerWidth < 450 
                //   ? '37%' 
                //   : mobile.innerWidth < 600 
                //   ? '40%' 
                //   : mobile.innerWidth > 1600 
                //   ? '35%' 
                //   : '45%',
                backgroundColor: '#000', 
                width: '100px', 
                padding: '10px', 
                borderRadius: '50%',
                backgroundColor: color,
              }}
            >
              <Link href="/">
                <p style={{ 
                    color: '#000',
                    textTransform: 'lowercase', 
                    textAlign: 'center',
                    fontFamily: 'Arlita',
                    letterSpacing: '1px'
                  }}
                >
                  { posts[0].node.categories[0].name }
                </p>
              </Link>
            </div>
            <span 
              className='relative mx-10' 
              style={{ 
                flex: 1, 
                top: '-20px', 
                borderBottom: `2px solid black` 
              }} 
            />
          </>
        ) : (
        <>
          <span 
            className='text-3xl mr-4 font-medium uppercase'
            style={{
              color: color,
              fontFamily: 'Luam-Regular'       
            }}
          >
            {posts[0].node.categories[0].name}
          </span>

            <div 
              className='flex-1 rounded-md mb-8 p-1'
              style={{
                margin: 'auto',
                backgroundColor: color
              }}
            />
          </>
          )}
      </div>
    
      <Toaster 
        position='top-center'
        reverseOrder={false}
      />

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12">
        {posts.map((post, index) => (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3" key={index}>
            <a href={`/post/${post.node.slug}`}>
              <PostCard key={index} post={post.node} />
            </a>
          </div>
        ))}
      </div>

      <Footer />
    </motion.div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}