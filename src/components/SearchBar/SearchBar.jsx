import './search-bar.css';
import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Search query is empty');
    }

    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <header className="searchBar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button">
            <FcSearch style={{ width: 30, height: 30 }} />
          </button>

          <input
            onChange={this.handleSearchQueryChange}
            className="searchForm-input"
            value={this.state.searchQuery}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
