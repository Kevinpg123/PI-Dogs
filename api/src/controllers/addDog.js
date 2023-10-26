const { Dog, Temperament } = require('../db');


const addDog = async (req, res) => {
    const {reference_image_id, name, height, weight, life_span, temperament, apodo} = req.body;
    
    try {
        const newPerro = await Dog.create({
            reference_image_id, name, height, weight, life_span, apodo
        });
        temperament.forEach(async (perro) => {
            let agregar
            const newRaza = await Temperament.findOne({ where: { name: perro } })
            if (!newRaza) {
                agregar = await Temperament.create({ name: perro })
            }
            else {
                const razaExistente = await Temperament.findOne({ where: { name: perro } })
                newPerro.addTemperaments(razaExistente);
            }
            newPerro.addTemperaments(agregar)
            
        });
        res.status(201).json(newPerro)

    
} catch (error) {
    res.status(500).json({message: error.message})
}
};

module.exports = addDog;