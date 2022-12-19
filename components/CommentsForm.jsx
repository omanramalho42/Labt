import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast, Toaster } from 'react-hot-toast'
import { submitComment } from '../services'

const CommentsForm = ({ slug, color }) => {
  const[load, setLoad] = useState(false)
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false })

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
            }, 3000);
          }
        }).catch((error) => console.log(error));
    } catch(error) {
      throw error
    } finally {
      setLoad(false);
    }
  }

  return (
    <div className="bg-white rounded-lg lg:px-16 p-6 pb-12 mb-8">
      <h3 className="text-4xl font-bold">
        Deixe um comentário
      </h3>
      <p className='font-medium'>O seu endereço de e-mail não será publicado</p>
      <p className='font-medium'>Campos obrigatórios serão marcados com *</p>
      {!load ? (
        <>
          <div className="grid grid-cols-1 gap-4 mb-4 mt-4">
            <textarea 
              value={formData.comment || ''} 
              onChange={onInputChange} 
              className="p-4 outline-none w-full h-60 focus:ring-2 focus:ring-gray-200 border border-black placeholder:text-black" 
              name="comment"
              placeholder="Comentário" 
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 border border-black placeholder:text-black" placeholder="Nome *" name="name" />
            <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 border border-black placeholder:text-black" placeholder="Email *" name="email" />
          </div>
          {/* <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <input 
                checked={formData.storeData} 
                onChange={onInputChange} 
                type="checkbox" 
                id="storeData" 
                name="storeData" 
                value="true" 
              />
              <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData"> 
                Salve meu nome, email no navegador para um próximo comentário.
              </label>
            </div>
          </div> */}
          
          <Toaster position='top-center' />
          {error && <p className="text-xs text-red-500">
            Todos os campos são obrigatórios
          </p>}
          <div className="flex mt-8 justify-end">
            <button 
              type="button" 
              onClick={handlePostSubmission} 
              className="text-sm uppercase text-white text-center px-8 py-1 cursor-pointer"
              style={{
                backgroundColor: color,
                // height: '50px',
                // width: '200px'
              }}
            >
              <p style={{ width: '100px' }}>
                Publicar Comentário
              </p>
            </button>
          </div>
          {/* {showSuccessMessage && <span className="display-block text-xl float-right font-semibold mt-3 text-green-500">
            O comentário foi submetido a análise.
          </span>} */}
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