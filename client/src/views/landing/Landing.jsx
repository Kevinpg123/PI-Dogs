import React from 'react'
import { Link } from 'react-router-dom'
import addTemperamentBD from '../form/addTemperamentBD'
import { useEffect } from 'react'
import { getAllDogs } from '../../redux/action/action'
import { useDispatch } from 'react-redux'


function Landing() {
    const dispatch = useDispatch()
    useEffect(() => {
        addTemperamentBD()

        dispatch(getAllDogs())



    }, [])

    return (
        <div>
            <h1>Bienvenidos al PI dogs</h1>
            <hr></hr>
            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Landing