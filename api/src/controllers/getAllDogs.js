const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds/"
const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"
const { Dog, Temperament } = require('../db')
const Sequelize = require('sequelize')


const getAllDogs = async(req, res) => {
    let image = ''
    let datos
    try {
        
    const response = await axios(URL)
        if (response) {
            datos = response.data.map((raza) => {
                let { id, name, weight, height, life_span, temperament, reference_image_id } = raza;
                weight = weight.metric;
                height = height.metric;
                
                if (temperament && name) {
                    
                    return { id, name, weight, height, life_span, temperament, image, reference_image_id };
                }
                else{console.log("sin temperamento");}
            })
            

        } 
        const responseDB = await Dog.findAll({
            attributes: [
                'id',
                'reference_image_id',
                [Sequelize.col('dog.name'), 'dog_name'], // Alias para la columna 'name' de la tabla 'dog'
                'height',
                'weight',
                'life_span',
            ],
            include: [
                {
                    model: Temperament,
                    as: 'temperaments',
                    attributes: [
                   
                        [Sequelize.col('name'), 'temperaments_name'], // Alias para la columna 'name' de la tabla 'temperaments'
                    ],
                },
            ],
            
            
        });
        let formattedResults = responseDB.map((dog) => ({
            id: dog.id,
            reference_image_id: dog.reference_image_id,
            name: dog.dataValues.dog_name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: (dog.dataValues.temperaments.map((temp) => { return temp.dataValues.temperaments_name } )).join(', '),
        }));
        return res.status(200).json([...formattedResults, ...datos]);

    } catch (error) {
        console.log(error);
    return res.status(500).json({error: error.message})
}
}


module.exports = getAllDogs;













//////////backup
// const axios = require('axios')
// const URL = "https://api.thedogapi.com/v1/breeds/"
// const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"
// const {Dog} = require('../db')

// const getAllDogs = async(req, res) => {
//     let image=''
//     try {
        
//     const response = await axios(URL)
//         if (response) {
//             const datos = response.data.map((raza) => {
//                 let { id, name, weight, height, life_span, temperament, reference_image_id } = raza;
//                 weight = weight.metric;
//                 height = height.metric;
                
//                 if (temperament && name) {
                    
//                     return { id, name, weight, height, life_span, temperament, image, reference_image_id };
//                 }
//                 else{console.log("sin temperamento");}
//             })
        
//         return res.status(200).json(datos);

//     } else {
//         res.status(501).json({error: "no llegan datos"})
//     }
// } catch (error) {
//     return res.status(500).json({error: error.message})
// }
// }


// module.exports = getAllDogs;
