const axios = require('axios');
const { Temperament } = require('../db');
const URL = "https://api.thedogapi.com/v1/breeds/"
const key = "api_key=live_9RRmeMUPEFqV2y5ZyRLpUjb69YryRYdCpdm1mvalWljwcCy3vZQB8DrXhBfLPEEr"

const addTemperaments = async(req, res) => {
    try {
        const dataDB = await Temperament.findAll()
        if (dataDB.length < 100) {
            
            
                    const apiTemperaments = await axios(URL);
                    let newTemperaments = []
                    let uniqueTemperaments = []
            
                    apiTemperaments.data.forEach((temp) => {
                        let separarTemperament = []
                        if (temp.temperament) {
                            separarTemperament=temp.temperament.split(',')
                        }
                        if (separarTemperament.length !== 0) {
                            separarTemperament.forEach((el) => {
                                const trimmedEl = el.trim();
                                // console.log(newTemperaments.length);
                                if (!uniqueTemperaments.includes(trimmedEl)) {
                                    uniqueTemperaments.push(trimmedEl);
                                    newTemperaments.push({name: trimmedEl})
                                }
                            })
                        }
                    })
                    const addNewTemperaments = await Temperament.bulkCreate(newTemperaments)
                    
            
                    return res.status(200).json(addNewTemperaments)
        }
        return res.status(201).json({message: "data its already uploaded"})

    } catch (error) {
        return res.status(501).json({message:error.message})
    }
};

module.exports = addTemperaments;
