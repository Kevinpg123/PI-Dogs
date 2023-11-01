import React, { useEffect, useState } from 'react'
import validation from './validation';
import Style from './Form.module.css'
import addTemperamentBD from './addTemperamentBD';
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs, getAllTemperaments } from '../../redux/action/action';
import axios from 'axios'
import parseNum from './parseNums';
import { Link } from 'react-router-dom'


function Form() {

    const dispatch = useDispatch()
    const [showTemperament, setShowTemperament] = useState(false)

    useEffect(() => {
        if (allTemperaments.length < 50) {
            dispatch(getAllTemperaments())
        }
        setShowTemperament(true)
    }, [])
    const allTemperaments = useSelector((state) => state.allTemperaments)





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
            setDogData({
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
        }
        dispatch(getAllDogs())
        dispatch(getAllTemperaments())
    }


    // const handleShowTemperament = (event) => {
    //     if (showTemperament === false) {
    //         setShowTemperament(true)
    //     } else {
    //         setShowTemperament(false)
    //     }
    // }

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
        <div className={Style.bigDiv}>
            {/* <div className={Style.divBack}>
                <Link to="/home">

                    <h1 className={Style.textBack}>Volver </h1>
                </Link>
            </div> */}
            <div className={Style.formBig}>
                <h1 className={Style.h1}>Formulario de creación de raza</h1>
                <form className={Style.form} onSubmit={handleSubmit}>
                    <div className={Style.inputsDiv}>
                        <h2 className={Style.nameH2}>Nombre</h2>
                        <input placeholder='Ingrese el nombre' className={Style.Input} name="name" value={dogData.name} onChange={handleChange}></input>
                        <label className={Style.labelName} htmlFor='name'>{error.name}</label>
                    </div>

                    <div className={Style.inputDobleBigDiv}>
                        <h2 className={Style.nameH2}>Altura [cm]</h2>
                        <div className={Style.inputDobleDiv}>
                            <input placeholder='Min' className={Style.InputDobles} name='heightMin' value={dogData.heightMin} onChange={handleChange}></input>
                            <input placeholder='Max' className={Style.InputDobles} name='heightMax' value={dogData.heightMax} onChange={handleChange}></input>

                        </div>
                        <label className={Style.labelName} htmlFor='heightMax'>{error.height}</label>
                    </div>



                    <div className={Style.inputDobleBigDiv}>
                        <h2 className={Style.nameH2}>Peso [kg]</h2>
                        <div className={Style.inputDobleDiv}>
                            <input placeholder='Min' className={Style.InputDobles} name='weightMin' value={dogData.weightMin} onChange={handleChange}></input>
                            <input placeholder='Max' className={Style.InputDobles} name='weightMax' value={dogData.weightMax} onChange={handleChange}></input>
                        </div>
                        <label className={Style.labelName} htmlFor='weightMax'>{error.weight}</label>
                    </div>

                    <div className={Style.inputDobleBigDiv}>
                        <h2 className={Style.nameH2}>Años de vida</h2>
                        <div className={Style.inputDobleDiv}>
                            <input placeholder='Min' className={Style.InputDobles} name='life_spanMin' value={dogData.life_spanMin} onChange={handleChange}></input>
                            <input placeholder='Max' className={Style.InputDobles} name='life_spanMax' value={dogData.life_spanMax} onChange={handleChange}></input>
                        </div>
                        <label className={Style.labelName} htmlFor='life_spanMax'>{error.life_span}</label>
                    </div>


                    <div className={Style.temperamentDiv}>
                        <h2 className={Style.temperamentName}>Temperamentos</h2>

                        <input
                            className={Style.Input}
                            list="temperamentOptions"
                            name="temperament"
                            placeholder=''
                            type='search'
                            value={dogData.temperament}
                            onChange={handleChange}
                        ></input>
                        <label className={Style.labelName} htmlFor='temperament'>{error.temperament}</label>

                    </div>


                    {/* <button className={Style.button} onClick={handleShowTemperament} type='button'>Mostrar/Esconder temperamentos</button> */}
                    <div className={Style.listDiv}>
                        {
                            showTemperament && <ul className={Style.checkbox_list}>
                                {

                                    allTemperaments.map((el, index) => {
                                        return (
                                            <div>
                                                <li className={Style.checkbox_list_li} key={index}>
                                                    <label className={Style.checkbox_label}>
                                                        <input
                                                            type="checkbox"
                                                            checked={dogData.temperament.includes(el)}
                                                            onChange={() => handleTemperamentClick(el)}
                                                            className={Style.inputScroll}
                                                        />
                                                        {el}
                                                    </label>
                                                </li>
                                            </div>
                                        )

                                    })
                                }

                            </ul>
                        }
                    </div>
                    {/* <label htmlFor='temperament'>{error.temperament}</label> */}



                    <br></br>
                    <div className={Style.submitDiv}>
                        <button className={Style.buttonSubmit} type='submit'>Ingresar Datos</button>
                    </div>
                </form>
            </div>
            <div>
                <img className={Style.imgBig} src='https://verdecora.es/blog/wp-content/uploads/2014/05/perro-activo.jpg' />
            </div>

        </div>
    )
}

export default Form