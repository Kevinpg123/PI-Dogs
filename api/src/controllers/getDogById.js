const axios = require('axios')
const URL = "https://api.thedogapi.com/v1/breeds/"
const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"
const { Dog, Temperament } = require('../db')
const { Sequelize } = require('sequelize');
const {Op} = require('sequelize')





const getDogById = async (req, res) => {
    const { idraza } = req.params;
    
    
try {
    const responseApi = await axios(URL);
    
    if (responseApi) {
        const datosApi = []
        responseApi.data.forEach((raza) => {
            let { id, name, weight, height, life_span, temperament, reference_image_id } = raza;
            weight = weight.metric;
            height = height.metric;

            if (id == idraza) {
                datosApi.push({ id, name, weight, height, life_span, temperament, reference_image_id });
            }
            
        })
        
    if(datosApi.length != 0){return res.status(201).json(datosApi)}
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
          
         where: { id: idraza }
          
        

    })
  console.log(responseDB);
    const formattedResults = responseDB.map((dog) => ({
        id: dog.id,
        reference_image_id: dog.reference_image_id,
        name: dog.dataValues.dog_name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
      temperament: (dog.dataValues.temperaments.map((temp) => { return temp.dataValues.temperaments_name })).join(', '),
        
      }));


    if (responseDB.length !==0 ) {
        return res.status(202).json(formattedResults)
    } else {
            return res.status(203).json({ message: "no exite la raza" });
    }
} catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message})
}
}

module.exports = getDogById;





/////////////////backup
// const axios = require('axios')
// const URL = "https://api.thedogapi.com/v1/breeds/"
// const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"
// const {Dog, Temperament} = require('../db')



// const getDogById = async (req, res) => {
//     const { idraza } = req.params;
    
    
// try {
//     const responseApi = await axios(URL);
    
//     if (responseApi) {
//         const datosApi = []
//         responseApi.data.forEach((raza) => {
//             let { id, name, weight, height, life_span, temperament, reference_image_id } = raza;
//             weight = weight.metric;
//             height = height.metric;

//             if (id == idraza) {
//                 datosApi.push({ id, name, weight, height, life_span, temperament, reference_image_id });
//             }
            
//         })
        
//     if(datosApi.length != 0){return res.status(201).json(datosApi)}
//     }
//     const responseDB = await Dog.findAll({
//         where: { id: idraza },
//         include: Temperament

//     })

//     if (responseDB.length !==0 ) {
//         return res.status(202).json(responseDB)
//     } else {
//             return res.status(203).json({ message: "no exite la raza" });
//     }
// } catch (error) {
//     res.status(500).json({ message: error.message})
// }
// }

// module.exports = getDogById;