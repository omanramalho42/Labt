import React from 'react'

const NotFound = () => {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      }}
    >
      <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404" />
      <div className='absolute'>
        <h1 className='text-center text-3xl font-bold'> 
          <strong style={{ color: 'red' }}>404</strong> - Página não encontrada
        </h1>
        <a href="/" className='mt-4 font-semibold'>
          Voltar para página inicial.
        </a>
      </div>
    </div>
  )
}

export default NotFound;