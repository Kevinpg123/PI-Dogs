import React, { useEffect, useState } from 'react'
import validation from './validation';
import Style from './Form.module.css'
import addTemperamentBD from './addTemperamentBD';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getAllTemperaments } from '../../redux/action/action';
import axios from 'axios'
import parseNum from './parseNums';


function Form() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (allTemperaments.length < 50) {
            dispatch(getAllTemperaments())
        }
    }, [])
    const allTemperaments = useSelector((state) => state.allTemperaments)
    if (allTemperaments) {
    }




    const [dogData, setDogData] = useState({
        name: "",
        heightMax: "",
        heightMin: "",
        weightMax: "",
        weightMin: "",
        life_spanMax: "",
        life_spanMin: "",
        temperament: [],
        reference_image_id: "https://t1.ea.ltmcdn.com/es/posts/5/6/2/10_caracteristicas_de_los_perros_24265_600_square.jpg",


    })

    const defaulError = {
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
        empty: false,
    }
    const [error, setError] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
        empty: true,
    })



    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setDogData({
            ...dogData, [property]: value
        });

        setError(validation({
            ...dogData, [property]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(typeof (dogData.temperament));
        if (JSON.stringify(error) === JSON.stringify(defaulError)) {
            if (typeof (dogData.temperament) === "string") {
                dogData.temperament = dogData.temperament.split(",")
                console.log(dogData);
            }
            const datosNum = parseNum(dogData)   /////////aca cambio el formato para que lo acepte mi DB
            try {
                const sendData = await axios.post("http://localhost:3001/add_dog", datosNum);
                window.alert("Raza creada satisfactoriamente")
            } catch (error) {
                console.log(error.message);
                window.alert("Error al crear la raza")
            }

        }
        dispatch(getAllDogs())
    }

    const [showTemperament, setShowTemperament] = useState(false)

    const handleShowTemperament = (event) => {
        if (showTemperament === false) {
            setShowTemperament(true)
        } else {
            setShowTemperament(false)
        }
    }

    const handleTemperamentClick = (el) => {
        const isAlreadySelected = dogData.temperament.includes(el)
        if (!isAlreadySelected) {

            setDogData({
                ...dogData, temperament: [...dogData.temperament, el]
            })
        } else {
            setDogData({
                ...dogData, temperament: dogData.temperament.filter((temp) => temp !== el)
            })
        }

    }



    return (
        <div>
            <h1>Formulario de creación de raza</h1>
            <form onSubmit={handleSubmit}>
                <h2>Nombre</h2>
                <input name="name" value={dogData.name} onChange={handleChange}></input>
                <label htmlFor='name'>{error.name}</label>



                <h2>Altura [cm]</h2>
                <input name='heightMin' value={dogData.heightMin} onChange={handleChange}></input>
                <input name='heightMax' value={dogData.heightMax} onChange={handleChange}></input>
                <label htmlFor='heightMax'>{error.height}</label>

                <h2>Peso [kg]</h2>
                <input name='weightMin' value={dogData.weightMin} onChange={handleChange}></input>
                <input name='weightMax' value={dogData.weightMax} onChange={handleChange}></input>
                <label htmlFor='weightMax'>{error.weight}</label>


                <h2>Años de vida</h2>
                <input name='life_spanMin' value={dogData.life_spanMin} onChange={handleChange}></input>
                <input name='life_spanMax' value={dogData.life_spanMax} onChange={handleChange}></input>
                <label htmlFor='life_spanMax'>{error.life_span}</label>



                <h2>Temperamentos</h2>

                <input
                    list="temperamentOptions"
                    name="temperament"
                    placeholder=''
                    type='search'
                    value={dogData.temperament}
                    onChange={handleChange}
                ></input>

                <button onClick={handleShowTemperament} type='button'>Mostrar/Esconder temperamentos</button>

                {
                    showTemperament && <ul className={Style.checkbox_list}>
                        {

                            allTemperaments.map((el, index) => {
                                return (
                                    <li className={Style.checkbox_list_li} key={index}>
                                        <label className={Style.checkbox_label}>
                                            <input
                                                type="checkbox"
                                                checked={dogData.temperament.includes(el)}
                                                onChange={() => handleTemperamentClick(el)}
                                            />
                                            {el}
                                        </label>
                                    </li>
                                )

                            })
                        }

                    </ul>
                }

                <br></br>
                <button type='submit'>Ingresar Datos</button>

            </form>



        </div>
    )
}

export default Form