import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Link, useNavigate } from 'react-router-dom'
import { getTemperaments, postDog } from '../../actions'
import styles from './Create.module.css'
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { MenuItem } from '@mui/material'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Enter name";
  }
  if (input.heightMax <= input.heightMin) {
    error.heightMin = 'Min value cannot be greater than the max';
  }
  if (input.weightMin < 0) {
    error.weightMin = 'Value cannot be below 0'
  }
  if (input.heightMin < 0) {
    error.heightMin = 'Value cannot be below 0'
  }
  if (input.weightMax <= input.weightMin) {
    error.weightMin = 'Min value cannot be greater than the max';
  }
  if (input.life_span <= 0) {
    error.life_span = 'Enter life span'
  }
  if (input.temperament.length <= 0) {
    error.temperament = "Choose the temperaments";
  }
  return error
}

const Create = () => {
  const allTemperaments = useSelector((state) => state.temperaments)
  const dispatch = useDispatch()
  const navigate = useNavigate();
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
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.name
      })
    )

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
      navigate('/home')
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

  return (
    <>
  
      {/* <Box sx={{ display: 'flex', border: '1px solid', width: '80%', alignItems: 'center', margin: 'auto', marginTop: '6%' }}>

        <FormControl sx={{ m: 3, width: '30ch' }}>
          <TextField
            required
            label="Dog name"
            onChange={handleChange}
            name='name'
            value={input.name}
            sx={{ m: 1 }}
            
          />

          <OutlinedInput
            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
            onChange={handleChange}
            value={input.heightMin}
            name='heightMin'
            placeholder='Height min'
            type='number'
            sx={{ m: 1 }}
          />

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

          <OutlinedInput
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            onChange={handleChange}
            value={input.weightMax}
            name='weightMax'
            placeholder='Weight max'
            type='number'
            sx={{ m: 1 }}
          />
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
              <MenuItem value={e.name} key={e.id}>
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
        <FormControl>
          <TextField
            required
            label="URL Image"
            onChange={handleChange}
            name='image'
            value={input.image}
            sx={{ m: 1 }}
          />
          <button className={styles.sendButton} type="submit" >Create</button>
        </FormControl>


      </Box >
      <Link to='/home'><button className={styles.backButton} >Home</button></Link> */}
    </>
  )
}

export default Create

