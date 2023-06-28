import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { getGalleryData } from './service/api';



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
    const { searchQuery } = this.state;
    if (!searchQuery) return;
    this.setState({ isLoading: true });
    try {
      const response = await getGalleryData(this.state.searchQuery, this.state.currentPage)
      this.setState({
        images: [...this.state.images, ...response.hits],
        totalHits: response.totalHits,
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
