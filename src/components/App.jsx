import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => this.setState({ searchQuery });

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}
