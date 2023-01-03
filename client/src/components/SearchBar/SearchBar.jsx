import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link } from 'react-router-dom'
import { getDogName, getDogs, getTemperaments, postDog } from '../../actions'
import styles from './SearchBar.module.css'
import search from '../../assets/search.png'
import add from '../../assets/add.png'
import reload from '../../assets/refresh.png'
import home from '../../assets/home.png'
import { BsHouseDoorFill } from 'react-icons/bs'
import { AiOutlineReload } from 'react-icons/ai'
import { HiPlus } from 'react-icons/hi'
import { FormControl, InputAdornment, MenuItem, OutlinedInput, TextField } from "@mui/material";

const SearchBar = ({ setCurrentPage }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const allTemperaments = useSelector((state) => state.temperaments)

    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // setError(
        //     validate({
        //         ...input,
        //         [e.target.name]: e.target.name
        //     })
        // )

    }

    function handleSubmit(e) {
        e.preventDefault(e)
        if (input.name !== "" &&
            input.heightMin !== "" &&
            input.heightMax > input.heightMin &&
            input.weightMin !== "" &&
            input.weightMax > input.weightMin &&
            input.life_span !== "" &&
            input.weightMax > input.weightMin &&
            input.temperament.length !== 0
        ) {

            dispatch(postDog(input))
            alert('Dog created!')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperaments: [],
            });

        } else {
            alert('Few elements are missing')
        }
    }
    function handleSelect(e) {
        if (input.temperament.length === 3) {
            alert('Too many temperaments!')
        } else if (input.temperament.length < 3) {
            setInput({
                ...input,
                temperament: input.temperament.includes(e.target.value) ? input.temperament : [...input.temperament, e.target.value]
            })
        }
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter((e) => e !== el)
        })
    }

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
                <BsHouseDoorFill style={{ height: '2rem', width: '2rem', color: 'black' }} />
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
                <button type="button" className={styles.add} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><HiPlus /></button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Dog</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <FormControl>
                                    <TextField
                                        required
                                        label="Dog name"
                                        onChange={handleChange}
                                        name='name'
                                        value={input.name}
                                        sx={{ m: 1 }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                        onChange={handleChange}
                                        value={input.heightMin}
                                        name='heightMin'
                                        placeholder='Height min'
                                        type='number'
                                        sx={{ m: 1 }}
                                    />
                                </FormControl>
                                <FormControl>

                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                                        onChange={handleChange}
                                        value={input.heightMax}
                                        name='heightMax'
                                        placeholder='Height max'
                                        type='number'
                                        sx={{ m: 1 }}
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 3, width: '30ch' }}>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                        onChange={handleChange}
                                        value={input.weightMin}
                                        name='weightMin'
                                        placeholder='Weight min'
                                        type='number'
                                        sx={{ m: 1 }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                        onChange={handleChange}
                                        value={input.weightMax}
                                        name='weightMax'
                                        placeholder='Weight max'
                                        type='number'
                                        sx={{ m: 1 }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <OutlinedInput
                                        endAdornment={<InputAdornment position="end">years</InputAdornment>}
                                        onChange={handleChange}
                                        value={input.life_span}
                                        name='life_span'
                                        placeholder='Life span'
                                        sx={{ m: 1 }}
                                    />
                                </FormControl >
                                <FormControl sx={{ m: 3, width: '30ch' }}>
                                    <TextField
                                        select
                                        label='Temperaments'
                                        helperText='Choose 3 max temperaments'
                                        defaultValue='Temperaments'
                                        onChange={(e) => handleSelect(e)}
                                        sx={{ m: 1 }}
                                    >
                                        {allTemperaments?.map((e) => (
                                            <MenuItem value={e.name} key={e}>
                                                {e.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    {input.temperament.map((el) => (
                                        <div key={el}>
                                            <div className={styles.option}>
                                                <p >{el}</p>
                                                <button className={styles.deleteButton} value={el} onClick={() => handleDelete(el)}>x</button>
                                            </div>
                                        </div>
                                    ))}
                                </FormControl>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Send message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => { handleClick(e) }}
                    className={styles.reloadButton}>
                    <AiOutlineReload className={styles.reload} />
                </button>
            </div>
        </div >
    )
}

export default SearchBar