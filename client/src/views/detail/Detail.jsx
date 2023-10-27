import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Detail() {
    const { id } = useParams()
    const idNum = id

    useEffect(() => {

        const getDogById = async () => {

            try {
                const response = await axios(`http://localhost:3001/get_raza/${idNum}`)
                if (response) {
                    setDogDetail(response.data[0])
                    setReference(response.data[0].reference_image_id)

                }
                if (!response.data[0].temperament) {
                    const temperamentRecorrer = response.data[0].Temperaments
                    let temperament = []
                    temperamentRecorrer.forEach((el) => {
                        temperament.push(el.name)
                    })
                    temperament = temperament.join()
                    console.log(temperament);
                    setDogDetail((prevDogDetail) => ({
                        ...prevDogDetail,
                        temperament: temperament,
                    }))
                    // setDogDetail({
                    //     ...dogDetail, temperament: temperament
                    // })
                }

            } catch (error) {
                console.log(error.message);
            }
            console.log(dogDetail.weight);
        }




        getDogById()
    }, [idNum])

    const [dogDetail, setDogDetail] = useState([])
    const [reference, setReference] = useState('')


    const [image, setImage] = useState('')

    useEffect(() => {

        const handlerImage = async () => {
            if (reference.length !== 0) {

                try {

                    const newImage = await axios(`https://api.thedogapi.com/v1/images/${reference}`)
                    if (newImage.data) {
                        setImage(newImage.data.url)

                    };

                } catch (error) {
                    console.log("aca falla  " + error.message);
                }
            }


        }
        handlerImage()
    }, [reference])
    // console.log(dogDetail.Temperaments);
    console.log(dogDetail);

    return (

        <div>
            {
                dogDetail ? (
                    <>
                        <div>
                            <Link to="/home">
                                <h1>Volver </h1>
                            </Link>
                        </div>
                        <h1>Nombre= {dogDetail.name}</h1>
                        <h1>Id= {idNum}</h1>
                        {
                            image ?
                                (<img src={image} alt="imagen" />)
                                :
                                (<img src={reference} alt="imagen" />)
                        }
                        {/* <img src={image} alt='imagen del perrito' /> */}
                        <h1>Altura= {dogDetail.height ? `${dogDetail.height} centimetros` : "N/A"}</h1>
                        <h1>Peso= {dogDetail.weight ? `${dogDetail.weight} kg` : "N/A"}</h1>
                        {/* <h1>Altura= {dogDetail.height && dogDetail.height.metric ? `${dogDetail.height.metric} centímetros` : 'N/A'}</h1>
                        <h1>Peso= {dogDetail.weight && dogDetail.weight.metric ? `${dogDetail.weight.metric} kg` : 'N/A'}</h1> */}
                        <h1>Temperamento= {dogDetail.temperament}</h1>
                        <h1>Años de vida= {dogDetail.life_span}</h1>
                    </>
                )
                    :
                    (
                        <h1>Cargando</h1>
                    )


            }




        </div >
    )
}

export default Detail