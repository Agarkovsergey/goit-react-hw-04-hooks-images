import React, { useState } from 'react';
import Loader from "react-loader-spinner";

import { search } from './api/pixabay'

import Header from './components/Header/Header';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreButton from './components/LoadMoreButton/LoadMoreButton';
import Modal from './components/Modal/Modal';


import './App.css';


const App = () => {
  const [state, setState] = useState({
    images: [],
    showModal: false,
    query: '',
    page: 1,
    loading: false,
    imageId: null,
  });

  const handleSearch = (query) => {
    setState({
      ...state,
      loading: true,
    })

    search(query, 1)
      .then(response => setState({
        ...state,
        images: response.data.hits,
        page: 2,
        query,
        loading: false,
      })
    );
  }

  const handleLoadMore = () => {
    setState({
      ...state,
      loading: true,
    })
    search(state.query, state.page)
      .then(response => {
        setState({
          ...state,
          images: [...state.images, ...response.data.hits],
          page: state.page + 1,
          loading: false,
        })
        
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    );
  }

  const openModal = (imageId) => () => {
    setState({
      ...state,
      showModal: true,
      imageId,
    })
  }

  const closeModal = () => {
    setState({
      ...state,
      showModal: false,
      imageId: null,
    })
  }

  const { images, showModal, imageId } = state;
  const image = images.find(image => image.id === imageId);
  
  return(
    <div>        
      {showModal && (<Modal onClose={closeModal} image={image}></Modal>
      )}
      <Header search={handleSearch}/>
      <ImageGallery images={images} onClick={openModal} />
      {
        state.loading === true && (
          <div className='loader'>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
              />
          </div>
        )
      }
      {
        state.images.length !== 0 && (
          <LoadMoreButton handleLoadMore={handleLoadMore} disabled={state.loading} />
        )
      }
    </div>
  )
}

export default App;