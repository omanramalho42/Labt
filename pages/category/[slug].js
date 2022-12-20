import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    toast.success(`Categoria selecionada: 
      ${posts[0].node.categories[0].name}`
    );
  },[posts]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    return () => {
      console.log(search);
    }
  },[search]);

  return (
    <motion.div
      initial={{ width: 0 }} 
      animate={{ width: '100%' }} 
      transition={{ duration: 1.25, ease: "easeOut" }}
      exit={{ x: '100%', transition: { duration: 0.1 } }} 
      className="mx-auto px-10"
    >
      <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <span 
          className='text-3xl mr-4 font-medium uppercase'
          style={{
            color: 
              posts[0].node.categories[0].name === 'Salvador' 
              ? '#2563EB' 
              : posts[0].node.categories[0].name === 'Bahia' 
              ? '#DC2626' 
              : posts[0].node.categories[0].name === 'Ser' 
              ? '#16A34A' 
              : '#EAB308',
              fontFamily: 'Luam-Regular'       
          }}
        >
          {posts[0].node.categories[0].name}
        </span>

        <div 
          className='flex-1 rounded-md mb-8 p-1'
          style={{
            margin: 'auto',
            backgroundColor: 
              posts[0].node.categories[0].name === 'Salvador' 
              ? '#2563EB' 
              : posts[0].node.categories[0].name === 'Bahia' 
              ? '#DC2626' 
              : posts[0].node.categories[0].name === 'Ser' 
              ? '#16A34A' 
              : '#EAB308'
          }}
        />
      </div>
    
      <Toaster 
        position='top-center'
        reverseOrder={false}
      />

      {/* <div className='flex flex-col m-5 items-center'>
        <label className='uppercase'>pesquisar</label>
        <input
          className='mx-auto border-blue-50 border-2 rounded-lg' 
          value={search} onChange={(event) => setSearch(event.target.value)} 
        />
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12">
          {posts.map((post, index) => (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-3" key={index}>
              <a href={`/post/${post.node.slug}`}>
                <PostCard key={index} post={post.node} />
              </a>
            </div>
          ))}
          {/* <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div> */}
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