import React, { useState, useEffect } from 'react'

const FeaturedGallery = () => {
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
    <div style={{ height: '100%', marginBottom: '200px' }}>
      <div  
        style={{ 
          marginTop: '5em',
          backgroundColor: '#cc2020',
          padding: '2% 10%',
        }}
      >
        <h1 
          className='relative top-8 text-4xl uppercase font-bold text-center'
          style={{ 
            left: '2%',
            color: '#FFF',
            fontFamily: 'gotham-bold',
            letterSpacing: '35px', 
            zIndex: 21,
            marginBottom: '10px'
          }}
        >
          Banca
        </h1>
        <div 
          className='grid'
          style={{ 
            gridTemplateColumns: 
              mobile.innerWidth >= 1400 ? 
              'repeat(3,1fr)' 
              : mobile.innerWidth < 1400 && mobile.innerWidth >= 1200
              ? 'repeat(3,1fr)'
              : mobile.innerWidth < 1200 && mobile.innerWidth > 1000
              ? 'repeat(2,1fr)'
              : 'repeat(1,1fr)',
            gridColumnGap: '1em',
            gridRowGap: '10em',
          }}
        >
          {['1','2','3'].map((i,idx) => (
            <div 
              className='relative w-80 h-80'
              key={`${idx}`} 
              style={{ 
                top: '80px',
                boxShadow: '8px 12px 12px 6px rgba(0,0,0,0.3)',
                backgroundColor: '#FFF',
                borderRadius: '15px' 
              }}
            >
              <div className='relative flex flex-col text-center' style={{ top: '110%' }}>
                <p>Em breve</p>
                <strong className='text-2xl'>R$00,00</strong>
                <button className='w-40 h-10 mx-auto rounded-lg' style={{ backgroundColor: '#ffa012' }}>
                  <a href="" className='px-4 uppercase'>Comprar</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedGallery