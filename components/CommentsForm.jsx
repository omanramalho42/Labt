import React, { useState, useEffect } from 'react'

import { AiOutlineLoading } from 'react-icons/ai'

import Skeleton from 'react-loading-skeleton'
import { toast, Toaster } from 'react-hot-toast'
import { submitComment } from '../services'
import { IoMdAddCircleOutline } from 'react-icons/io';

const CommentsForm = ({ slug, color }) => {
  const[load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false })

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    }
    setFormData(initalFormData)
  }, []);

  useEffect(() => {
    return () => {
      setLoad(false);
    }
  },[]);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setLoad(true);
    setLoading(true);
    
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      setLoad(false);
      toast.error("Os campos nome e email são obrigatórios");
      return;
    }

    setError(false);
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    try {
      submitComment(commentObj)
        .then((res) => {
          if (res.createComment) {
            if (!storeData) {
              formData.name = '';
              formData.email = '';
            }
            formData.comment = '';
            setFormData((prevState) => ({
              ...prevState,
              ...formData,
            }));
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
              toast.success("Seu comentário foi submetido a análise");
              setLoading(false);
            }, 3000);
          }
        }).catch((error) => console.log(error));
    } catch(error) {
      throw error
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => { console.log('laod', loading) },[loading])

  return (
    <div className="flex-col bg-white dark:bg-[#121212] rounded-lg lg:px-16 p-6 pb-12 mb-8">
      <h3 className="text-4xl font-bold dark:text-white" style={{ fontFamily: 'gotham-bold' }}>
        Deixe um comentário
      </h3>
      <p className='font-medium dark:text-white'>O seu endereço de e-mail não será publicado</p>
      <p className='font-medium dark:text-white'>Campos obrigatórios serão marcados com *</p>
      {!load ? (
        <>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
            <textarea 
              value={formData.comment || ''} 
              onChange={onInputChange} 
              className="p-4 outline-none w-full dark:bg-[#202020] dark:placeholder:text-white dark:text-white h-60 focus:ring-2 focus:ring-gray-200 border border-black z-10 placeholder:text-black" 
              name="comment"
              placeholder="Comentário" 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              value={formData.name} 
              onChange={onInputChange} 
              className="py-2 z-10 px-4 dark:bg-[#202020] dark:text-white dark:placeholder:text-white outline-none w-full focus:ring-2 focus:ring-gray-200 border border-black placeholder:text-black" 
              placeholder="Nome *" 
              name="name" 
            />
            <input 
              type="email" 
              value={formData.email} 
              onChange={onInputChange} 
              className="py-2 z-10 dark:bg-[#202020] dark:text-white dark:placeholder:text-white px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 border border-black placeholder:text-black" 
              placeholder="Email *" 
              name="email" 
            />
          </div>        
          <Toaster position='top-center' />
          {error && <p className="text-xs text-red-500">
            Todos os campos são obrigatórios
          </p>}
          <div className="flex mt-8 justify-end">
            <button 
              type="button" 
              onClick={!loading ? handlePostSubmission : () => {}} 
              className="text-sm uppercase z-10 text-white text-center px-8 py-1 cursor-pointer"
              style={{
                backgroundColor: color,
                opacity: loading ? '75%' : '100%'
              }}
            >
              {loading ? (
                <div className='flex w-[100px] h-[40px] justify-center items-center'>
                  <p className='spinner'>
                    <AiOutlineLoading size={26} />
                  </p>
                </div>
              ) : (
                <p style={{ width: '100px' }}>
                  Publicar Comentário
                </p>
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <Skeleton height={100} />
          <Skeleton height={10} style={{ marginTop: 10 }} />
          <Skeleton count={1} />
          <Skeleton height={60} width={200} style={{ borderRadius: '25px' }} />
        </>
      )}
    </div>
  );
};

export default CommentsForm;