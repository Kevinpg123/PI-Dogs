import React from 'react'
import Style from './Cards.module.css'
import Card from '../card/Card'

function Cards({ props }) {

    return (
        <div className={Style.bigDiv}>

            {
                props.map((character) => {
                    const { name, reference_image_id, temperament, weight, id } = character
                    return (

                        <div>
                            <Card id={id} key={id} name={name} reference_image_id={reference_image_id} temperament={temperament} weight={weight} />
                        </div>
                    )
                })
            }



        </div>
    )
}

export default Cards