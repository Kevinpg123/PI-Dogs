import React, { useEffect, useState } from 'react'
import Cards from '../../components/cards/Cards'
import { filterOrigin, filterTemperament, getAllDogs, orderDogs } from '../../redux/action/action'
import { useDispatch, useSelector } from 'react-redux'
import { getDogByName } from '../../redux/action/action'
import Style from './Home.module.css'
import { getAllTemperaments } from '../../redux/action/action'

////// link explicacion de como traer imagenes: https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t




//////BD practica
// let perritos = [
//     {
//         name: 'rotweiler',
//         image: 'http/image',
//         temperament: 'wenito',
//         weight: 123
//     },
//     {
//         name: 'tumbaolla',
//         image: 'http/image',
//         temperament: '+wenito',
//         weight: 123
//     }
// ]








function Home() {
    const dispatch = useDispatch()
    const [showAllDogs, setShowAllDogs] = useState(true)
    const searchDogs = useSelector((state) => state.searchDogs);
    const allDogs = useSelector((state) => state.allDogs);
    const [error, setError] = useState(false)
    const searchDogsError = useSelector((state) => state.searchDogsError)
    const [currentPage, setCurrentPage] = useState(1)



    useEffect(() => {
        if (allDogs.length === 0) {
            dispatch(getAllDogs())
        }

    }, [])



    useEffect(() => {
        if (searchDogs.length !== 0 || searchDogsError.error === 'no existe la raza') {
            setShowAllDogs(false)
        } else {
            setShowAllDogs(true)

        }
    }, [searchDogs, searchDogsError])

    const closeAll = () => {
        dispatch(getDogByName())
    }

    const getCurrentDogs = () => {
        const startIndex = (currentPage - 1) * 8;
        const endIndex = startIndex + 8;
        return showAllDogs ? allDogs.slice(startIndex, endIndex) : searchDogs.slice(startIndex, endIndex)
    }

    const handlePage = (pageActualization) => {
        setCurrentPage(pageActualization)
    }

    const handleOrder = (order) => {

        dispatch(orderDogs(order))
    }
    const handleFilterOrigin = (el) => {
        dispatch(filterOrigin(el.target.value))
    }

    useEffect(() => {
        if (allTemperaments.length === 0) {
            dispatch(getAllTemperaments())
        }
    }, [])
    const allTemperaments = useSelector((state) => state.allTemperaments)

    const handleFilterTemperament = (el) => {
        dispatch(filterTemperament(el.target.value))
    }


    return (
        <div className={Style.bigDiv}>
            <div className={Style.orderDiv}>
                <h2>Ordenamiento</h2>
                <button className={Style.Button} onClick={() => handleOrder("name")}>Nombre</button>
                <button className={Style.Button} onClick={() => handleOrder("weight")}>Peso</button>
            </div>
            <div className={Style.filterDiv}>
                <h2>Filtrado</h2>
                <select className={Style.filterSelect} onChange={(el) => handleFilterTemperament(el)}>
                    <option value="all">Todos</option>
                    {
                        allTemperaments && allTemperaments.map((temp, index) => {
                            return <option key={index} value={temp}>{temp}</option>
                        })
                    }
                </select>
                <select className={Style.filterSelect} onChange={(el) => handleFilterOrigin(el)}>
                    <option value="">Todos</option>
                    <option value="API">API</option>
                    <option value="DB">Base de datos</option>
                </select>
            </div>

            {/* {showAllDogs ? <Cards props={allDogs} /> : null} */}
            {showAllDogs ? <Cards props={getCurrentDogs()} /> : null}

            {searchDogs.length > 0 && <button onClick={closeAll}>Cerrar búsqueda</button>}
            <br></br>
            {/* {searchDogs.length > 0 && <Cards props={searchDogs} />} */}
            {searchDogs.length > 0 && <Cards props={getCurrentDogs()} />}

            {searchDogsError && searchDogsError.error === 'no existe la raza' && <h1>No existe la raza</h1>}
            {searchDogsError && searchDogsError.error === 'no existe la raza' && <button onClick={closeAll}>Cerrar búsqueda</button>}

            <div className={Style.pageDiv}>
                <button
                    className={Style.Button}
                    disabled={currentPage === 1}
                    onClick={() => handlePage(currentPage - 1)}
                >Anterior</button>
                <h2>Pagina: {currentPage}</h2>
                <button
                    className={Style.Button}
                    disabled={getCurrentDogs().length < 8}
                    onClick={() => handlePage(currentPage + 1)}
                >Siguiente</button>
            </div>



        </div>
    )
}

export default Home