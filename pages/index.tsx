import type { NextPage } from 'next'
import Head from 'next/head'

import { 
  PostCard, 
  PostWidget, 
  Categories 
} from '../components'

const posts = [
  { title: 'Primeiro Post', excerpt: 'Lorem ipsum dollar sign' },
  { title: 'Segundo Post', excerpt: 'Lorem ipsum dollar sign' },
];

const Home: NextPage = () => {
  return (
   <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Laboratório Temporal</title>
        <link rel="stylesheet" href="favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          { posts?.map((i, idx) => (
            <div key={idx}>
              <PostCard post={i} key={i.title} />
            </div>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
        </div>
      </div>
   </div>
  )
}

export default Home
