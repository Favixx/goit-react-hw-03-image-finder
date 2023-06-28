import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '36224530-0ce46c8c70d6d91971a56eb8c';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    isLoading: false,
    selectedImage: null,
    totalHits: 0,
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, images: [], currentPage: 1 });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, currentPage } = this.state;
    if (!searchQuery) return;
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        images: [...this.state.images, ...response.data.hits],
        totalHits: response.data.totalHits,
      });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, selectedImage, totalHits } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length < totalHits && images.length > 0 && !isLoading && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}

export default App;
