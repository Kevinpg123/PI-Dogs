

const parseNum = (dogData) => {
    dogData.height = parseInt(dogData.height);
    dogData.weight = parseInt(dogData.weight);
    dogData.life_span = parseInt(dogData.life_span);
    if (Array.isArray(dogData.temperament)) {
        const newArray = dogData.temperament.map(item => item.replace(/''/g, '""'));
        dogData.temperament = newArray;
    } else {
        // Maneja el caso en el que temperaments no es un array
    }
    // const temperaments = dogData.temperament
    // const newArray = temperaments.map(item => item.replace(/'/g, '"'));
    // dogData.temperament = newArray;
    return dogData
}

export default parseNum;