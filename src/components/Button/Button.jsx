import React from 'react';
import styles from './Button.module.css'
const Button = ({ onLoadMore }) => {
    return (
        <button type="button" className={styles.btn} onClick={onLoadMore}>
            Load more
        </button>
    );
};

export default Button;