import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { getDogName, getDogs } from '../../actions'
import styles from './SearchBar.module.css'
import search from '../../assets/search.png'
import add from '../../assets/add.png'
import reload from '../../assets/refresh.png'
import home from '../../assets/home.png'

const SearchBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleInputChange(e) {
        e.preventDefault();
        setName('')
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (name.length > 0) {
            dispatch(getDogName(name))
            setCurrentPage(1)
            setName('');
            document.getElementById('search').value = ''
        } else {
            alert('Write a name!')
        }

    }

    return (
        <div className={styles.box}>
            <Link to='/'>
                <img src={home} alt='home' className={styles.home} />
            </Link>
            <div className={styles.barra}>
                <input
                    id='search'
                    type='text'
                    placeholder='Search a dog'
                    onChange={(e) => handleInputChange(e)} />
                <button
                    type='submit'
                    onClick={(e) => handleSubmit(e)}
                    className={styles.searchButton}
                >
                    <img src={search} alt='search' className={styles.search} />
                </button>
            </div>
            <div className={styles.botones}>
                <Link to='/create'>
                    <img src={add} alt='add' className={styles.add} />
                </Link>
                <button
                    onClick={(e) => { handleClick(e) }}
                    className={styles.reloadButton}>
                    <img
                        src={reload}
                        alt='recarga'
                        className={styles.reload} />
                </button>
            </div>
        </div>
    )
}

export default SearchBar