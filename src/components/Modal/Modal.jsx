import React, { Component } from 'react';
import styles from './Modal.module.css'
class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.code === 'Escape') {
            this.props.onCloseModal();
        }
    };

    handleCloseModal = (event) => {
        if (event.target === event.currentTarget) {
            this.props.onCloseModal();
        }
    };

    render() {
        const { image } = this.props;

        return (
            <div className={styles.overlay} onClick={this.handleCloseModal}>
                <div className={styles.modal}>
                    <img src={image.largeImageURL} alt="" />
                </div>
            </div>
        );
    }
}

export default Modal;