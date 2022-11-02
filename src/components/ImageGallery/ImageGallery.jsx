import './image-gallery.css';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import fetchGetImage from '../api/fetchGetImage';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import { toast } from 'react-toastify';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    showModal: false,
  };

  currentModalImage = '';

  onLoadMore = () => this.setState(({ page }) => ({ page: page + 1 }));

  toggleModal = e => {
    if (e && e.target.dataset.src) {
      this.currentModalImage = e.target.dataset.src;
    }
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onRequest = async (searchQuery, page) => {
    try {
      const newImages = await fetchGetImage(searchQuery, page);
      this.setState(({ images }) => ({
        images: [...images, ...newImages],
        status: 'resolved',
      }));
    } catch {
      toast.error(`Didn't find ${searchQuery}`);
      this.setState({ status: 'rejected' });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending', page: 1, images: [] });
      this.onRequest(this.props.searchQuery);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' });
      this.onRequest(this.props.searchQuery, this.state.page);
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
