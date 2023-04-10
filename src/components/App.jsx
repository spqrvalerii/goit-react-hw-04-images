import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from './api/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react'

const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalImages, setTotalImages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [currentImageUrl, setCurrentImageUrl] = useState(null)
  const [currentImageDescription, setCurrentImageDescription] = useState(null)
  
  useEffect(() => {
    if (!query)
      return;    
      setIsLoading(true)
      setError(null)
      fetchImages(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            toast('Images not found');
            return;
          }
          const imagesArray = hits.map(
            ({ id, tags, webformatURL, largeImageURL }) => ({
              id: id,
              description: tags,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );
          setImages(prevImages => [...prevImages, ...imagesArray]);
          setTotalImages(totalHits)
        })
        .catch(error =>
          setError({error: error.message}))
        .finally(() =>
          setIsLoading(false)
        );    
}, [query, page, error])  
  
  const getSearchRequest = (query) => {
    setQuery(query)
    setImages([])
    setPage(1)  
  };

  const onNextFetch = () => {
    setPage(prevPage => prevPage + 1)
  };

  const openModal = ({ description, largeImage }) => {
    setShowModal(true)
    setCurrentImageUrl(largeImage)
    setCurrentImageDescription(description)
  };
  
  const closeModal = () => {
    setShowModal(false)
    setCurrentImageUrl(null)
    setCurrentImageDescription(null)
  };
  
  return (
    <>
      <Searchbar onSubmit={getSearchRequest} />
      
      {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}

        {isLoading && <Loader />}

        {!isLoading && totalImages !== images.length && (
          <Button onNextFetch={onNextFetch} />
        )}

        {showModal && (
          <Modal
            onClose={closeModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"        
        />
      </>
  )
}

export { App };