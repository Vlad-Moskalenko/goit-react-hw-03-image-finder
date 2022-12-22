import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  onClick,
  imageData: { webformatURL, largeImageURL, tags },
}) => (
  <li onClick={() => onClick(largeImageURL)} className={css.galleryItem}>
    <img className={css.galleryItemImage} src={webformatURL} alt={tags} />
  </li>
);

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageData: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
