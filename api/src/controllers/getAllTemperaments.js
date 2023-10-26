const axios = require('axios')
const {Temperament} = require('../db')

const getAllTemperaments = async(req, res) => {
    try {
        const response = await Temperament.findAll({
            attributes: ['name']
        });
        
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = getAllTemperaments;