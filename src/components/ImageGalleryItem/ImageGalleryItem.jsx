import './image-gallery-item.css';

export function ImageGalleryItem({ webImgUrl, tags, onClick, largeImageURL }) {
  return (
    <li onClick={onClick} className="imageGalleryItem">
      <img
        className="imageGalleryItem-image"
        src={webImgUrl}
        alt={tags}
        data-src={largeImageURL}
      />
    </li>
  );
}
