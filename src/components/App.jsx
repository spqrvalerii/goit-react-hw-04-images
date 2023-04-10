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
    if ({query, page, error}) {
      setIsLoading(true)
      setError(null)
      // this.setState({ isLoading: true, error: null });
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
          return (prevImages) => {
            return (setImages({...prevImages, ...imagesArray}),
              setTotalImages({totalImages: totalHits}))            
          };
        })
        .catch(error =>
          setError({error: error.message}))
        // this.setState({ error: error.message }))
        .finally(() =>
          setIsLoading(false)
          // this.setState({ isLoading: false })
        );
    }
}, [query, page, error])  
  
  const getSearchRequest = (query) => {
    setQuery('')
    setImages([])
    setPage(1)  
    // this.setState({ query, images: [], page: 1 });
  };

  const onNextFetch = () => {
    setPage(page + 1)
    // this.setState(({ page }) => ({ page: page + 1 }));
  };

  const openModal = ({ description, largeImage }) => {
    setShowModal(true)
    setCurrentImageUrl(largeImage)
    setCurrentImageDescription(description)
    // this.setState({
    //   showModal: true,
    //   currentImageUrl: largeImage,
    //   currentImageDescription: description,
    // });
  };
  
  const closeModal = () => {
    setShowModal(false)
    setCurrentImageUrl(null)
    setCurrentImageDescription(null)
    // this.setState({
    //   showModal: false,
    //   currentImageUrl: null,
    //   currentImageDescription: null,
    // });
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

// class OldApp extends Component {
//   state = {
//     query: '',
//     page: 1,
//     totalImages: 0,
//     isLoading: false,
//     showModal: false,
//     images: [],
//     error: null,
//     currentImageUrl: null,
//     currentImageDescription: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page, error } = this.state;

//     if (prevState.query !== query || prevState.page !== page) {
//     this.setState({ isLoading: true, error: null });
//     fetchImages(query, page)
//       .then(({ hits, totalHits }) => {
//         if (!hits.length) {
//           toast('Images not found');
//           return;
//         }
//         const imagesArray = hits.map(
//           ({ id, tags, webformatURL, largeImageURL }) => ({
//             id: id,
//             description: tags,
//             smallImage: webformatURL,
//             largeImage: largeImageURL,
//           })
//         );
//         return this.setState((prevState) => {
//           return {
//           images: [...prevState.images, ...imagesArray],
//           totalImages: totalHits,
//           }
//         });
//       })
//       .catch((error) => this.setState({ error: error.message }))
//       .finally(() => this.setState({ isLoading: false })
//       );
//     }
//     if (prevState.error !== error && error) {
//       toast.error(error)
//     }
//   }

//   getSearchRequest = (query) => {
//     this.setState({ query, images: [], page: 1 });
//   };

//   onNextFetch = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   openModal = ({ description, largeImage }) => {
//     this.setState({
//       showModal: true,
//       currentImageUrl: largeImage,
//       currentImageDescription: description,
//     });
//   };
  
//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       currentImageUrl: null,
//       currentImageDescription: null,
//     });
//   };

//   render() {
//     const {
//       images,
//       totalImages,
//       isLoading,
//       showModal,
//       currentImageUrl,
//       currentImageDescription,
//     } = this.state;

//     const { getSearchRequest, onNextFetch, openModal, closeModal } = this;

//     return (
//       <>
//         <Searchbar onSubmit={getSearchRequest} />

//         {images.length > 0 && (
//           <ImageGallery images={images} openModal={openModal} />
//         )}

//         {isLoading && <Loader />}

//         {!isLoading && totalImages !== images.length && (
//           <Button onNextFetch={onNextFetch} />
//         )}

//         {showModal && (
//           <Modal
//             onClose={closeModal}
//             currentImageUrl={currentImageUrl}
//             currentImageDescription={currentImageDescription}
//           />
//         )}

//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"        
//         />
//       </>
//     )
//   }
// };

// export { App };