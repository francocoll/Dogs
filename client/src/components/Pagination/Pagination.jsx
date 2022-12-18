import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ allDogs, dogsPerPage, pagination, currentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (

    <nav className={styles.container} >

      {pageNumbers && pageNumbers.map((number) => (

        <ul
          onClick={() => pagination(number)}
          style={currentPage === number
            ? { backgroundColor: '#6f4deb' }
            : undefined}
          key={number}
          className={styles.botones} >{number}</ul>

      ))}

    </nav>
  )
}


export default Pagination