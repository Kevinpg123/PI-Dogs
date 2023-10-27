


const validation = ({name,heightMax, heightMin ,weightMax,weightMin,life_spanMax, life_spanMin,  temperament}) => {
    
    let error = {
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: "",
        empty:true,
    };
    if (!name  || !heightMax || !heightMin || !weightMax || !weightMin || !life_spanMax || !life_spanMin  || !temperament) {
        error = { ...error, empty: false }
    }
    else{error = { ...error, empty: false }}

    if (name.trim().length < 4 || name.trim() == "") {
        error = { ...error, name: "El nombre debe contener como minimo 4 caracteres" }
    } else if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(name)) {
        error = { ...error, name: "El nombre no puede contener números o caracteres especiales" }
    } else if (name.length > 30) {
        error = { ...error, name: "El nombre debe contener como máximo 30 caracteres" }
    };

    if (isNaN(heightMax) || isNaN(heightMin) ) {
        error = { ...error, height: "Solo se puede ingresar números" }
    } else if(parseInt(heightMax) <= parseInt(heightMin)){
        error = {...error, height: "El valor mínimo tiene que ser menor"}
    }else if (heightMax > 90 || heightMin > 90) {
        error = { ...error, height: "El valor máximo es 90" }
    } else if (heightMax < 15 || heightMin < 15) {
        error = {...error, height: "El valor mínimo es 15"}
    }
    
    if (isNaN(weightMax)  || isNaN(weightMin)) {
        error = { ...error, weight: "Solo se puede ingresar números" }
    } else if(parseInt(weightMax) <= parseInt(weightMin)){
        error = {...error, weight: "El valor mínimo tiene que ser menor"}
    }else if (weightMax > 70 || weightMin > 70) {
        error = { ...error, weight: "El valor máximo es 70" }
    } else if (weightMax < 1 || weightMin < 1) {
        error = {...error, weight: "El valor mínimo es 1"}
    }

    if (isNaN(life_spanMax)  || isNaN(life_spanMin)) {
        error = { ...error, life_span: "Solo se puede ingresar números" }
    } else if(parseInt(life_spanMax) <= parseInt(life_spanMin)){
        error = {...error, life_span: "El valor mínimo tiene que ser menor"}
    }else if (life_spanMax > 70 || life_spanMin > 70) {
        error = { ...error, life_span: "El valor máximo es 70" }
    } else if (life_spanMax < 1 || life_spanMin < 1) {
        error = {...error, life_span: "El valor mínimo es 1"}
    }


    // if (!typeof (weight) == "number") {
    //     error = { ...error, weight: "Solo se puede ingresar números" }
    // } else if (weight > 60) {
    //     error = { ...error, weight: "El valor máximo es 60" }
    // } else if (weight <1) {
    //     error = {...error, weight: "El valor mínimo es 1"}
    // }

    // if (!typeof (life_span) == "number") {
    //     error = { ...error, life_span: "Solo se puede ingresar números" }
    // } else if (life_span > 20) {
    //     error = { ...error, life_span: "El valor máximo es 20" }
    // } else if (life_span <4) {
    //     error = {...error, life_span: "El valor mínimo es 4"}
    // }

    // temperament.foreach(element => {
    //     if (/[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(element)) {
    //         error = { ...error, name: "El temperamento no puede contener números o caracteres especiales" }
    //     }
// });
    return error

}


export default validation