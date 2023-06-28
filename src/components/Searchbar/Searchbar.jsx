import React, { Component } from 'react'
import styles from './Searchbar.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
export default class Searchbar extends Component {
    state = {
        query: ''
    }
    handleChange = (event) => {
        this.setState({ query: event.target.value })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.query);
    };
    render() {
        const { query } = this.state;
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.SearchFormBtn}>
                        <span className={styles.SearchFormButtonLabel}><AiOutlineSearch /></span>
                    </button>

                    <input
                        className={styles.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}
