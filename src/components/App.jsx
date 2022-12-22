import {
  SearchBar,
  apiPixabay,
  ImageGallery,
  Modal,
  Button,
  Loader,
  Error,
} from 'components';

import { Component } from 'react';

const INITIAL_STATE = {
  images: [],
  currentModalImage: null,
  isLoading: false,
  page: 1,
  query: null,
  imagesTotalHits: 0,
  error: null,
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onSearchSubmit = e => {
    e.preventDefault();

    const query = e.target.query.value;

    if (query === '') {
      return alert('Search field is empty! Nothing to search...');
    }

    this.setState({
      ...INITIAL_STATE,
      query: query.toLowerCase().trim(),
      isLoading: true,
    });
  };

  onClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  onToggleModal = imageSrc =>
    this.setState({ currentModalImage: imageSrc || null });

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      try {
        const { hits: images, totalHits } = await apiPixabay.getImages(
          query,
          page
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          imagesTotalHits: totalHits,
        }));
      } catch (e) {
        this.setState({ imagesTotalHits: 0, images: [], error: e.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, currentModalImage, isLoading, error, imagesTotalHits } =
      this.state;
    const { onSearchSubmit, onToggleModal, onClickLoadMore } = this;

    return (
      <div className="App">
        <SearchBar onSubmit={onSearchSubmit} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={onToggleModal} />
        )}
        {error && <Error title={error} />}
        {currentModalImage && (
          <Modal image={currentModalImage} onCloseModal={onToggleModal} />
        )}
        {isLoading && <Loader />}
        {images.length < imagesTotalHits && (
          <Button onClick={onClickLoadMore} />
        )}
      </div>
    );
  }
}
