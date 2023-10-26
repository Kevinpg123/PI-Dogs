const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllDogs = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');
const addDog = require('../controllers/addDog');
const addTemperaments = require('../controllers/addTemperaments');
const getAllTemperaments = require('../controllers/getAllTemperaments');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/get_all', (req, res) => {
    
    getAllDogs(req, res);
});

router.get('/get_raza/:idraza', (req, res) => {
    getDogById(req, res);
});

router.get('/get_name', (req, res) => {
    getDogByName(req, res);
});

router.post('/add_dog', (req, res) => {
    addDog(req, res);
});

router.get('/get_temperaments', (req, res) => {
    addTemperaments(req,res)
});

router.get('/get_all_temperaments', (req, res) => {
    getAllTemperaments(req, res)
})

module.exports = router;
