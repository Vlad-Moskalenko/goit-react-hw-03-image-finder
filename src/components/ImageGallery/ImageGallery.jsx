import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components';

export const ImageGallery = ({ images, onClick }) => (
  <ul className={css.gallery}>
    {images.length > 0 &&
      images.map(({ id, ...imageData }) => (
        <ImageGalleryItem key={id} imageData={imageData} onClick={onClick} />
      ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
