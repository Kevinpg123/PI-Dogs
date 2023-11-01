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
        dispatch(handlePageNum(1))
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

    const handleUpClick = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className={Style.bigDiv}>
            <div className={Style.orderFilter}>


                <div className={Style.orderDivInterno}>
                    {/* <h3 className={Style.tituloOrder}>Ordenamiento</h3> */}
                    <select className={Style.filterSelect} onChange={(value) => handleOrder(value)} defaultValue={""}>
                        <option value="" disabled >Ordenamiento</option>
                        <option value={["name", "asc"]} >Nombre &uarr; </option>
                        <option value={["name", "desc"]} >Nombre &darr;</option>
                        <option value={["weight", "asc"]}>Peso &uarr;</option>
                        <option value={["weight", "desc"]}>Peso &darr;</option>
                    </select>
                </div>

                {/* <div>
                    <h3>Peso</h3>
                    <select className={Style.filterSelect} onChange={(value) => handleOrder(value)} defaultValue={""}>
                        <option value="" disabled hidden>Seleccione una opción</option>
                        <option value={["weight", "asc"]}>Ascendente</option>
                        <option value={["weight", "desc"]}>Descendente</option>
                    </select>
                </div> */}





                <div className={Style.orderDivInterno}>
                    {/* <h3 className={Style.tituloOrder}>Temperamento</h3> */}
                    <select className={Style.filterSelect} onChange={(el) => handleFilterTemperament(el)} defaultValue={""}>
                        <option value="" disabled>Temperamento</option>
                        <option value="all">Todos</option>
                        {
                            allTemperaments && allTemperaments.map((temp, index) => {
                                return <option key={index} value={temp}>{temp}</option>
                            })
                        }
                    </select>
                </div>

                <div className={Style.orderDivInterno}>
                    {/* <h3 className={Style.tituloOrder}>Orígen</h3> */}
                    <select className={Style.filterSelect} onChange={(el) => handleFilterOrigin(el)} defaultValue={""}>
                        <option value="" disabled>Origen</option>
                        <option value="">Todos</option>
                        <option value="API">API</option>
                        <option value="DB">Base de datos</option>
                    </select>

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
                    onClick={() => { window.scrollTo(0, 250); return (handlePage(pageNum + 1)) }}
                >Siguiente</button>
            </div>
            <button onClick={handleUpClick} className={getCurrentDogs().length > 0 ? Style.buttonUP : Style.buttonUPinvisible}>
                <img className={Style.imgButtonUP} src='https://liceodeolmue.cl/assets/images/arriba.png' />
            </button>


        </div>
    )
}

export default Home