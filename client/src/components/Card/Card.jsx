import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

const Card = ({ name, image, id, weightMin, weightMax, temperament }) => {

  
  return (
    <div className={styles.fullCard}>
      <Link to={`/dogs/${id}`}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <img className={styles.image} src={image} alt='Dog' />
          </div>
          <div className={styles.info}>
            <h4>{name}</h4>
            <span>{weightMin} - {weightMax} kg</span>
            <p>
            {temperament}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card