import React from 'react'
import { Link } from 'react-router-dom'
import addTemperamentBD from '../form/addTemperamentBD'
import { useEffect } from 'react'
import { getAllDogs, orderDogs, directionOrderName } from '../../redux/action/action'
import { useDispatch } from 'react-redux'
import style from './Landing.module.css'


function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        addTemperamentBD()

        dispatch(getAllDogs())
        window.scrollTo(0, 0)

        dispatch(orderDogs("name"))
        dispatch(directionOrderName("asc"))

    }, [])

    return (
        <div className={style.bigDiv}>
            <h1 className={style.h1}>Bienvenidos al SPA de perros</h1>
            <img className={style.img} src='https://i.pinimg.com/originals/5d/09/74/5d0974693a94fdbc65c2cc493c826616.jpg' />
            <hr></hr>
            <Link to='/home'>
                <button className={style.button}>Ingresar</button>
            </Link>
        </div>
    )
}

export default Landing