import React, { useEffect, useState } from 'react'
import Cards from '../../components/cards/Cards'
import { directionOrderName, directionOrderWeight, filterOrigin, filterTemperament, getAllDogs, handlePageNum, orderDogs } from '../../redux/action/action'
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
    const searchDogsError = useSelector((state) => state.searchDogsError)
    const pageNum = useSelector((state) => state.pageNum)



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
        if (searchDogs.length > 0) {
            handlePage(1)
        }
    }, [searchDogs, searchDogsError])

    const closeAll = () => {
        dispatch(getDogByName())
    }

    const getCurrentDogs = () => {
        const startIndex = (pageNum - 1) * 8;
        const endIndex = startIndex + 8;
        return showAllDogs ? allDogs.slice(startIndex, endIndex) : searchDogs.slice(startIndex, endIndex)
    }

    const handlePage = (pageActualization) => {
        dispatch(handlePageNum(pageActualization))
    }

    const handleOrder = (valor) => {

        let value = valor.target.value
        const [order, direction] = value.split(",")

        console.log(value);
        if (order === "name") {
            dispatch(directionOrderName(direction))
            dispatch(orderDogs(order))
        } else {
            dispatch(directionOrderWeight(direction))
            dispatch(orderDogs(order))
        }
    }
    const handleFilterOrigin = (el) => {
        handlePage(1)
        dispatch(filterOrigin(el.target.value))
    }

    useEffect(() => {
        if (allTemperaments.length === 0) {
            dispatch(getAllTemperaments())
            dispatch(orderDogs("name"))
            dispatch(directionOrderName("asc"))
        }
    }, [])
    const allTemperaments = useSelector((state) => state.allTemperaments)

    const handleFilterTemperament = (el) => {
        handlePage(1)
        dispatch(filterTemperament(el.target.value))
    }


    return (
        <div className={Style.bigDiv}>
            <div className={Style.orderFilter}>
                <div className={Style.orderDiv}>
                    <h2>Ordenamiento</h2>
                    <div>
                        <h3>Nombre</h3>
                        <select className={Style.filterSelect} onChange={(value) => handleOrder(value)} defaultValue={""}>
                            <option value="" disabled hidden>Seleccione una opción</option>
                            <option value={["name", "asc"]} >Ascendente</option>
                            <option value={["name", "desc"]} >Descendente</option>
                        </select>
                    </div>

                    <div>
                        <h3>Peso</h3>
                        <select className={Style.filterSelect} onChange={(value) => handleOrder(value)} defaultValue={""}>
                            <option value="" disabled hidden>Seleccione una opción</option>
                            <option value={["weight", "asc"]}>Ascendente</option>
                            <option value={["weight", "desc"]}>Descendente</option>
                        </select>
                    </div>


                </div>
                <div className={Style.orderDiv}>
                    <h2>Filtrado</h2>
                    <div>
                        <h3>Temperamento</h3>
                        <select className={Style.filterSelect} onChange={(el) => handleFilterTemperament(el)} defaultValue={""}>
                            <option value="" disabled hidden>Seleccione una opción</option>
                            <option value="all">Todos</option>
                            {
                                allTemperaments && allTemperaments.map((temp, index) => {
                                    return <option key={index} value={temp}>{temp}</option>
                                })
                            }
                        </select>
                    </div>

                    <div>
                        <h3>Orígen</h3>
                        <select className={Style.filterSelect} onChange={(el) => handleFilterOrigin(el)} defaultValue={""}>
                            <option value="" disabled hidden>Seleccione una opción</option>
                            <option value="">Todos</option>
                            <option value="API">API</option>
                            <option value="DB">Base de datos</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* {showAllDogs ? <Cards props={allDogs} /> : null} */}
            {showAllDogs ? <Cards props={getCurrentDogs()} /> : null}

            {searchDogs.length > 0 && <button className={Style.Button} onClick={closeAll}>Cerrar búsqueda</button>}
            <br></br>
            {/* {searchDogs.length > 0 && <Cards props={searchDogs} />} */}
            {searchDogs.length > 0 && <Cards props={getCurrentDogs()} />}

            {searchDogsError && searchDogsError.error === 'no existe la raza' && <h1>No existe la raza</h1>}
            {searchDogsError && searchDogsError.error === 'no existe la raza' && <button className={Style.Button} onClick={closeAll}>Cerrar búsqueda</button>}

            <div className={Style.pageDiv}>
                <button
                    className={Style.Button}
                    disabled={pageNum === 1}
                    onClick={() => handlePage(pageNum - 1)}
                >Anterior</button>
                <h2>Pagina: {pageNum}</h2>
                <button
                    className={Style.Button}
                    disabled={getCurrentDogs().length < 8}
                    onClick={() => handlePage(pageNum + 1)}
                >Siguiente</button>
            </div>



        </div>
    )
}

export default Home