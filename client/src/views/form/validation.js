


const validation = ({name, height, weight, life_span, temperament}) => {
    
    let error = {
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
        empty:true,
    };
    if (!name  || !height || !weight || !life_span || !temperament) {
        error = { ...error, empty: false }
    }
    else{error = { ...error, empty: false }}

    if (name.length < 4) {
        error = { ...error, name: "El nombre debe contener como minimo 4 caracteres" }
    } else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(name)) {
        error = { ...error, name: "El nombre no puede contener números o caracteres especiales" }
    } else if (name.length > 10) {
        error = { ...error, name: "El nombre debe contener como máximo 10 caracteres" }
    };

    if (!typeof (height) == "number") {
        error = { ...error, height: "Solo se puede ingresar números" }
    } else if (height > 110) {
        error = { ...error, height: "El valor máximo es 80" }
    } else if (height <15) {
        error = {...error, height: "El valor mínimo es 15"}
    }
    
    if (!typeof (weight) == "number") {
        error = { ...error, weight: "Solo se puede ingresar números" }
    } else if (weight > 60) {
        error = { ...error, weight: "El valor máximo es 60" }
    } else if (weight <1) {
        error = {...error, weight: "El valor mínimo es 1"}
    }

    if (!typeof (life_span) == "number") {
        error = { ...error, life_span: "Solo se puede ingresar números" }
    } else if (life_span > 20) {
        error = { ...error, life_span: "El valor máximo es 20" }
    } else if (life_span <4) {
        error = {...error, life_span: "El valor mínimo es 4"}
    }

    // temperament.foreach(element => {
    //     if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(element)) {
    //         error = { ...error, name: "El temperamento no puede contener números o caracteres especiales" }
    //     }
// });
    return error

}


export default validation