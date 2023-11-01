
//////////aca arreglo los datos para enviarlos a la base de datos
const parseNum = (dogData) => {
    
    if (Array.isArray(dogData.temperament)) {
        const newArray = dogData.temperament.map(item => item.replace(/''/g, '""'));
        dogData.temperament = newArray;
    } else {
        // Maneja el caso en el que temperaments no es un array
    }
    // const temperaments = dogData.temperament
    // const newArray = temperaments.map(item => item.replace(/'/g, '"'));
    // dogData.temperament = newArray;
    let nameArray = dogData.name.trim().split(' ')
    let newArrayName = nameArray.map((el) => {
        return el.charAt(0).toUpperCase() + el.slice(1)
    })
    const nameToUpperCase = newArrayName.join(' ')
    let sendData = {
        name: nameToUpperCase,
        height: `${dogData.heightMin} - ${dogData.heightMax}`,
        weight: `${dogData.weightMin} - ${dogData.weightMax}`,
        life_span: `${dogData.life_spanMin} - ${dogData.life_spanMax} years`,
        temperament: dogData.temperament,
        reference_image_id:dogData.reference_image_id,
    }
    
    return sendData
}

export default parseNum;