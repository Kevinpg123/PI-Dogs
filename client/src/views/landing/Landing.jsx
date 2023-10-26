import React from 'react'
import { Link } from 'react-router-dom'
import addTemperamentBD from '../form/addTemperamentBD'
import { useEffect } from 'react'


function Landing() {

    useEffect(() => {
        addTemperamentBD()

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