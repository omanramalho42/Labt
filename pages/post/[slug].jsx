import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Helmet } from 'react-helmet'

import { motion } from 'framer-motion'

import { 
  PostDetail, 
  Categories, 
  PostWidget, 
  Author, 
  Comments, 
  CommentsForm, 
  Loader, 
  Footer
} from '../../components'

import { getPosts, getPostDetails } from '../../services'
import { AdjacentPosts } from '../../sections'

const PostDetails = ({ post }) => {
  const router = useRouter();
  
  const [color,setColor] = useState('');
  useEffect(() => {
    if(post.categories[0].name === 'Bahia') {
      setColor('#DC2626');
      return;
    } else if(post.categories[0].name === 'Salvador') {
      setColor('#2f53a1');
      return;
    } else if (post.categories[0].name === 'Ser') {
      setColor('#3fbb5a');
      return;
    } else  {
      setColor('#d5b035');
      return;
    }
  },[post]);
  
  if (router.isFallback) {
    return <Loader />;
  }

  useEffect(() => {
    console.log(post);
  },[post]);
  
  return (
    <motion.div>
      <Helmet>
        <title>Postagem: {post.title || ''}</title>
        <meta charSet='utf-8'/>
        <meta desc={post.title} />
      </Helmet>
      <div className="mx-auto mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-12">
            <PostDetail post={post} />
            {/* <Author author={post.author} /> */}
            <CommentsForm slug={post.slug} color={color} />
            <Comments slug={post.slug} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} color={color} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              {/* <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} /> */}
              {/* <Categories /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}