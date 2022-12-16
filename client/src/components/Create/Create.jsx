import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getTemperaments, postDog } from '../../actions'
import styles from './Create.module.css'

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
    <div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.name}>
            <label className={styles.label}>Dog name</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange} />
            {error.name && <span className={styles.error}>{error.name}</span>}
          </div>
          <div>
            <label className={styles.label}>Minimum height</label>
            <input
              className={styles.input}
              type="number"
              name="heightMin"
              value={input.heightMin}
              onChange={handleChange} />
            {error.heightMin && <span className={styles.error}>{error.heightMin}</span>}
          </div>
          <div>
            <label className={styles.label}>Maximum height</label>
            <input
              className={styles.input}
              type="number"
              name="heightMax"
              value={input.heightMax}
              onChange={handleChange} />
            {error.heightMax && <span className={styles.error} >{error.heightMax}</span>}
          </div>
          <div>
            <label className={styles.label}>Minimum weight</label>
            <input
              className={styles.input}
              type="number"
              name="weightMin"
              value={input.weightMin}
              onChange={handleChange} />
            {error.weightMin && <span className={styles.error}>{error.weightMin}</span>}
          </div>
          <div>
            <label className={styles.label}>Maximum weight</label>
            <input
              className={styles.input}
              type="number"
              name="weightMax"
              value={input.weightMax}
              onChange={handleChange} />
            {error.weightMax && <span className={styles.error}>{error.weightMax}</span>}
          </div>
          <div>
            <label className={styles.label}>Life span</label>
            <input
              className={styles.input}
              type="number"
              name="life_span"
              value={input.life_span}
              onChange={handleChange} />
            {error.life_span && <span className={styles.error}>{error.life_span}</span>}
          </div>
          <div>
            <label className={styles.label}>Temperaments:</label>
            <select className={styles.input} name='temperaments' onChange={(e) => handleSelect(e)} defaultValue='Temperaments'>
              <option value=''>Choose 1 or more</option>
              {allTemperaments?.map((e) => (
                <option className={styles.option} value={e.name} key={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
            {input.temperament.map((el) => (
              <div key={el}>
                <div className={styles.option}>
                  <p >{el}</p>
                  <button className={styles.deleteButton} value={el} onClick={() => handleDelete(el)}>x</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className={styles.label}>URL Image</label>
            <input
              className={styles.input}
              type="text" name="image"
              value={input.image}
              onChange={handleChange} />
            {error.image && <span>{error.image}</span>}
          </div>
          <button className={styles.sendButton} type="submit" >Create</button>
        </form>
      </div>
      <Link to='/home'><button className={styles.backButton} >Home</button></Link>
    </div>

  )
}

export default Create

