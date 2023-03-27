import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { cleanDog, getDetail } from '../../actions/index'
import styles from './Detail.module.css'
import Loading from '../Loading/Loading'
const Detail = () => {

    const { id } = useParams();
    const myDog = useSelector((state) => state.detail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
        return () => {
            dispatch(cleanDog())
        }
    }, [dispatch, id])

    return (
        <div>
            <div>
                {myDog.length > 0 ? (
                    <div className={styles.cardDetail}>
                        <div className={styles.cardImage}>
                            <img className={styles.img} src={myDog[0].image} alt="img not found" />
                        </div>


                        
                        <div className={styles.cardBody}>
                            <div className={styles.cardInfo}>
                                <h1>{myDog[0].name}</h1>
                                <div className={styles.cardAdd}>
                                    <div className={styles.cardData}>
                                        <div>
                                            <h3>Life Span</h3> {myDog[0].life_span}
                                        </div>
                                        <div>
                                            <h3>
                                                Height:
                                            </h3>
                                            {myDog[0].heightMin} - {myDog[0].heightMax} CM
                                        </div>
                                        <div>
                                            <h3>
                                                Weight
                                            </h3>

                                            {myDog[0].weightMin
                                                ? myDog[0].weightMin
                                                : "No info"}{" "}
                                            -{" "}
                                            {myDog[0].weightMax
                                                ? `${myDog[0].weightMax} KG`
                                                : "No info"}
                                        </div>
                                    </div>
                                    <div className={styles.cardTemperament}>
                                        <h2>
                                            <span>
                                                Temperaments:
                                            </span>
                                        </h2>
                                        {!myDog[0].createdInDb
                                            ? myDog[0].temperament + ' '
                                            : myDog[0].temperaments?.map((el) => (
                                                <span className={styles.temperaments} key={el}>
                                                    {el}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardButton}>
                                <Link to="/home">
                                    <button>Home</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )}

            </div>

        </div>
    );


}

export default Detail