import './image-gallery.css';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import fetchGetImage from '../api/fetchGetImage';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    page: 1,
    showModal: false,
  };

  currentModalImage = '';

  onLoadMore = () => this.setState(({ page }) => ({ page: page + 1 }));

  toggleModal = e => {
    if (e && e.target.dataset.src)
      this.currentModalImage = e.target.dataset.src;
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });
      const images = await fetchGetImage(this.props.searchQuery);
      this.setState({ images: [...images], status: 'resolved', page: 1 });
    }

    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      const imagesMore = await fetchGetImage(
        this.props.searchQuery,
        this.state.page
      );
      this.setState(({ images }) => ({
        images: [...images, ...imagesMore],
        status: 'resolved',
      }));
    }
  }

  render() {
    const { images, status, showModal } = this.state;
    const { onLoadMore, toggleModal, currentModalImage } = this;

    if (status === 'pending') return <Loader />;

    if (status === 'resolved') {
      return (
        <>
          <ul className="imageGallery">
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                onClick={toggleModal}
                largeImageURL={largeImageURL}
                webImgUrl={webformatURL}
              />
            ))}
          </ul>
          <Button onClick={onLoadMore} />
          {showModal && (
            <Modal onClose={toggleModal} largeImageUrl={currentModalImage} />
          )}
        </>
      );
    }
  }
}
