import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const Landing = () => {
  return (
      <div className={styles.back}>
        <Link to={'/home'}>
          <button className={styles.start}>
            Start!
          </button>
        </Link>
      </div>
  )
}

export default Landing