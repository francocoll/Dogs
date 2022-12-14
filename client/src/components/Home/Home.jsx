import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments, orderByName, orderByWeight, filterBySource, filterByTemperament } from '../../actions'
import Card from '../Card/Card'
import styles from './Home.module.css'
import Pagination from '../Pagination/Pagination'
import SearchBar from '../SearchBar/SearchBar'



const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs)
  const allTemperaments = useSelector((state) => state.temperaments)
  const [/*order*/, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [dogsPerPage, /*setDogsPerPage*/] = useState(8)
  const indexOfLastDog = currentPage * dogsPerPage
  const indexOfFirstDog = indexOfLastDog - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch])

  function handleOrderByName(e) {
    e.preventDefault(e)
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleOrderByWeight(e) {
    e.preventDefault(e)
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleFilterBySource(e) {
    dispatch(filterBySource(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterByTemperament(e) {
    e.preventDefault()
    dispatch(filterByTemperament(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
  }



  return (
    <div className={styles.background}>
      <SearchBar
        setCurrentPage={setCurrentPage}
      />
      <div className={styles.filter}>
        <select onChange={(e) => handleOrderByName(e)} defaultValue='Order by name'>
          <option disabled>Order by name</option>
          <option value='asc'>A - Z</option>
          <option value='desc'>Z - A</option>
        </select>
        <select onChange={(e) => handleOrderByWeight(e)} defaultValue='Order by weight'>
          <option disabled>Order by weight</option>
          <option value='higher-weight'>Higher weight</option>
          <option value='lower-weight'>Lower weight</option>
        </select>
        <select onChange={(e) => handleFilterBySource(e)} defaultValue='Filter by source'>
          <option disabled>Filter by source</option>
          <option value='all'>All</option>
          <option value='api'>Api</option>
          <option value='created'>Created</option>
        </select>
      
        <select onChange={(e) => handleFilterByTemperament(e)} defaultValue='Filter by temperaments'>
          <option disabled>Filter by temperaments</option>
          <option value='all'>All temperaments</option>
          {allTemperaments?.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>

          ))}
        </select>
      </div>
      <div className={styles.container}>
        {
          currentDogs.length > 0 ?
            currentDogs.map((el) => {
              return (
                <Card
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  weightMin={el.weightMin}
                  weightMax={el.weightMax}
                />
              )
            }) : null
        }
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        pagination={pagination}
        currentPage={currentPage}
      />


    </div>

  )
}

export default Home