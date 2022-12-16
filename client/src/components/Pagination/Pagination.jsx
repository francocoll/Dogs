import React from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ allDogs, dogsPerPage, pagination, currentPage }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (

    <nav className={styles.container} >
      <ul className={styles.back}>
        {pageNumbers && pageNumbers.map(number => (
          <button className={styles.buttons} onClick={() => pagination(number)} style={currentPage === number ? { backgroundColor: '#6f4deb' } : undefined}>{number}</button>
        ))}
      </ul>
    </nav>
  )
}


export default Pagination