import React from 'react'
import { useDispatch } from 'react-redux'
import { getDogByName } from '../../redux/action/action'
import { useState } from 'react'
import Style from './SearchBar.module.css'
const URL = "http://localhost:3001/get_name?nameDog="



////////url de prueba localhost:3001/get_name?nameDog=CALLEJERO

function SearchBar() {

    const dispatch = useDispatch();
    const [nameDog, setNameDog] = useState('ValorPredeterminado');
    const [error, setError] = useState(false)


    const handlerSearch = () => {
        if (nameDog.length > 2) {
            setError(false)
            dispatch(getDogByName(nameDog))
        }
        else {
            setError(true)
        }

    }

    const handleKeyPress = (value) => {
        if (value.key === 'Enter') {
            handlerSearch()
        }
    }



    return (
        <div className={Style.bigDiv}>
            <input className={Style.input} placeholder='Buscar raza' type='search' onChange={(e) => setNameDog(e.target.value)} onKeyPress={handleKeyPress}></input>
            <button className={Style.Button} onClick={handlerSearch}>Buscar</button>
            {
                error && <label>Ingresar un mínimo de 3 carácteres</label>
            }


        </div>
    )
}

export default SearchBar