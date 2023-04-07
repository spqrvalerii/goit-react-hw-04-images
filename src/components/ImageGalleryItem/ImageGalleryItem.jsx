import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
  return (
    <li className={css.item} onClick={() => openModal({ description, largeImage })}>
      <img src={smallImage} alt={description} />
    </li>
  );
}

ImageGalleryItem.propTypes = {  
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export { ImageGalleryItem };