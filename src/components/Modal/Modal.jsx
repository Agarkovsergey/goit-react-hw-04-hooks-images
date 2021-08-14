import React, { useEffect } from 'react';


const Modal = ({ image, onClose }) => { 
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // returned function will be called on component unmount 
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}

export default Modal;