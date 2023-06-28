import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem'
import React from 'react'
import styles from './ImageGallery.module.css'
const ImageGallery = ({ images, onImageClick }) => {
    return (
        <ul className={styles.gallery}>
            {images.map(image => {
                return <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
            })}
        </ul>
    )
}
export default ImageGallery