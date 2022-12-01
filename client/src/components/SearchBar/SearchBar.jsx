import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { getDogName, getDogs } from '../../actions'
import styles from './SearchBar.module.css'

const SearchBar = ({setCurrentPage}) => {
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
            <div>
                <input id='search' type='text' placeholder='Search a dog' onChange={(e) => handleInputChange(e)} />
                <button type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
            </div>
            <button className={styles.reload} onClick={(e) => { handleClick(e) }}>Reload</button>
            <Link to='/create'>
                <button className={styles.add}>Create dog</button>
            </Link>
        </div>
    )
}

export default SearchBar