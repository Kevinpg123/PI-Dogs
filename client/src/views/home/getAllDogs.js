import axios from 'axios';

const getAllDogs = async () => {
    try {
        const response = await axios.get('http://localhost:3001/get_all')
        const perritos = response.data
        const sendPerritos = []
        perritos.map((char, index) => {
            if (index < 8) {
                
                sendPerritos.push(char)
            }
            
        })
        return sendPerritos
    } catch (error) {
        console.log(error.message);
        return error.message
    }
    
}

export default getAllDogs


////////////////////////////ESTO VA EN EL HOME
  
    // const [allDogs, setAllDogs] = useState([]);
    // useEffect(() => {
    //     const handleAllDogs = async () => {
    //         try {
    //             const perros = await getAllDogs();
    //             setAllDogs(perros)
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     }

    //     handleAllDogs()
    // }, [])

    // console.log(allDogs);

    ///////////////PROBANDO EL REDUX