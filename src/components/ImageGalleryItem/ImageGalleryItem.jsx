import React from 'react';
import styles from './ImageGalleryItem.module.css'
const ImageGalleryItem = ({ image, onClick }) => {
    const { id, webformatURL, tags } = image;

    return (
        <li className={styles.galleryItem} key={id}>
            <img
                src={webformatURL}
                alt={tags}
                className={styles.galleryItemImage}
                onClick={() => onClick(image)}
            />
        </li>
    );
};

export default ImageGalleryItem;
