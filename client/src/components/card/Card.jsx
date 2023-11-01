import React, { useEffect, useState } from 'react'
import Style from './Card.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
//////paleta de colores: https://coolors.co/palette/ccd5ae-e9edc9-fefae0-faedcd-d4a373

function Card({ name, temperament, weight, reference_image_id, id }) {

    const [image, setImage] = useState('')




    useEffect(() => {

        const handlerImage = async () => {
            if (reference_image_id.length !== 0) {

                try {
                    const newImage = await axios(`https://api.thedogapi.com/v1/images/${reference_image_id}`)
                    if (newImage.data) {
                        setImage(newImage.data.url)

                    };

                } catch (error) {
                    console.log(error.message);
                }
            }



        }
        handlerImage()
    }, [reference_image_id])

    return (
        <Link to={`/detail/${id}`}>
            <div className={Style.bigDiv}>
                <h3 className={Style.textName}>{name}</h3>
                {
                    image ?
                        (<img className={Style.image} src={image} alt="imagen" />)
                        :
                        (<img className={Style.image} src={reference_image_id} alt="imagen" />)
                }
                {/* <img src={image} alt="imagen" /> */}



                <h3 className={Style.text}>Temperamento: {temperament}</h3>
                <h3 className={Style.text}>Peso: {weight} kg</h3>
            </div>
        </Link>
    )
}

export default Card