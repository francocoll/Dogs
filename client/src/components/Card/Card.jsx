import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ name, image, id, weightMin, weightMax }) => {
  return (
    <div className={styles.card}>
      <Link to={`/dogs/${id}`}>
        <img className={styles.image} src={image} alt='Dog' />
        <div className={styles.info}>
          <h1>{name}</h1>
          <p>{weightMin} - {weightMax} kg</p>
        </div>

      </Link>
    </div>
  )
}

export default Card