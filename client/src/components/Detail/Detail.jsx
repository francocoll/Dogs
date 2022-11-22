import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../../actions/index'
import styles from './Detail.module.css'
const Detail = () => {

    const { id } = useParams();
    const myDog = useSelector((state) => state.detail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    return (
        <div>

            <div>
                {myDog.length > 0 ? (
                    <div className={styles.container}>
                        <img className={styles.img} src={myDog[0].image} alt="img not found" />
                        <div className={styles.info}>
                            <h1>{myDog[0].name}</h1>
                            <p>Life Span: <b>{myDog[0].life_span}</b></p>
                            <p>Height: <b>{myDog[0].heightMin} - {myDog[0].heightMax} CM </b></p>

                            <p>Weight: <b>{myDog[0].weightMin
                                ? myDog[0].weightMin
                                : "No info"}{" "}
                                -{" "}
                                {myDog[0].weightMax
                                    ? `${myDog[0].weightMax} KG`
                                    : "No info"}</b>
                            </p>
                            <p>Temperaments:<b> {!myDog[0].createdInDb
                                ? myDog[0].temperament + ' '
                                : myDog[0].temperaments?.map((el) => el.name + ', ')}
                            </b>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}

            </div>
            <div>
                <Link to="/home">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
}

export default Detail