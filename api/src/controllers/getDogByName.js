const axios = require('axios');
const { Dog, Temperament } = require('../db');
const URL = "https://api.thedogapi.com/v1/breeds/"
const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"
const Sequelize = require('sequelize')
const {Op} = require('sequelize')

const getDogByName = async (req, res) => {
    let { nameDog } = req.query;
    // console.log(nameDog);
    nameDog = decodeURIComponent(nameDog);
    nameDog = nameDog.toLowerCase();
    try {
        const responseApi = await axios(URL);
    
    if (responseApi) {
        let datosApi = [];
        responseApi.data.forEach((raza) => {
            let { id, name, weight, height, life_span, temperament, reference_image_id } = raza;
            weight = weight.metric;
            height = height.metric;

            const minuscula = name.toLowerCase()
            
            if (minuscula.includes(nameDog)) {
                
                const datosAdd = { id, name, weight, height, life_span, temperament, reference_image_id };
                // datosApi.push({ id, name, weight, height, life_span, temperament });
                datosApi.push(datosAdd);
            }
            
        })
        console.log(datosApi);
    if(datosApi.length>0){return res.status(201).json(datosApi)}
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
              where: {
                [Op.and]: [
                  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('dog.name')), {
                    [Op.like]: `%${nameDog}%`,
                  }),
                ],
              },
            
        })
        let formattedResults = responseDB.map((dog) => ({
            id: dog.id,
            reference_image_id: dog.reference_image_id,
            name: dog.dataValues.dog_name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperament: (dog.dataValues.temperaments.map((temp) => { return temp.dataValues.temperaments_name } )).join(', '),
          }));

        console.log(formattedResults);
        
    if (responseDB.length!==0) {
        return res.status(202).json(formattedResults)
    } else {
            return res.status(203).json({ message: "no exite la raza" });
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message})
    }
};

module.exports = getDogByName;