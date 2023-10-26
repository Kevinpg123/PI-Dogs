import axios from 'axios'


const addTemperamentBD = async() => {
 try {
     const response = await axios("http://localhost:3001/get_temperaments")
 } catch (error) {
    console.log(error.message);
 }
}

export default addTemperamentBD;