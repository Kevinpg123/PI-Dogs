import axios from 'axios'

export const ALL_DOGS = "ALL_DOGS";
export const SEARCH_DOGS = "SEARCH_DOGS"
export const SEARCH_DOGS_ERROR = "SEARCH_DOGS_ERROR"
export const RESET_SEARCH_DOGS_ERROR = "RESET_SEARCH_DOGS_ERROR"
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS"
export const ORDER_WEIGHT = "ORDER_WEIGHT"
export const ORDER_WEIGHT_DIRECTION = "ORDER_WEIGHT_DIRECTION" 
export const ORDER_NAME = "ORDER_NAME"
export const ORDER_NAME_DIRECTION = "ORDER_NAME_DIRECTION"
export const FILTER_ORIGIN = "FILTER_ORIGIN"
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT"
export const PAGE_NUM = "PAGE_NUM"


export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3001/get_all')
            const perritos = response.data
            const sendPerritos = []
            perritos.map((char, index) => {
                if (index < 125) {
                    
                    sendPerritos.push(char)
                }
                
            })
            
            return dispatch({
                type: "ALL_DOGS",
                payload: sendPerritos,
            })
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    }
};

export const getDogByName = (nameDog) => {
    const palabraCodificada = encodeURIComponent(nameDog);
    
    return async (dispatch) => {
        if (nameDog === undefined) {
            dispatch({
                type: "SEARCH_DOGS",
                payload: [],
            });
            return dispatch({type: RESET_SEARCH_DOGS_ERROR})
        }
        try {
            const response = await axios.get('http://localhost:3001/get_name?nameDog='+ palabraCodificada)
            const perritos = response.data
            if (response.status == 203) {
                return dispatch({
                    type: SEARCH_DOGS_ERROR,
                    payload:{error: "no existe la raza"}
                })
            }
            
                dispatch({
                    type: RESET_SEARCH_DOGS_ERROR
                })
            

           
            
            return dispatch({
                type: "SEARCH_DOGS",
                payload: perritos,
            })
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    }
}


export const getAllTemperaments = () => {
    
    return async(dispatch) => {
        try {
            const response = await axios("http://localhost:3001/get_all_temperaments");
            const datosListos = response.data.map((el) => {
                return el.name
            })
            dispatch({
                type: GET_ALL_TEMPERAMENTS,
                payload: datosListos,
            })
            
        } catch (error) {
            console.log("FALLA LA ACTION TEMPERAMENT"+error.message);
        }
    }

    

}


export const orderDogs = (order) => {
    
    if (order === "weight") {
        return (dispatch) => {
            dispatch({
                type: ORDER_WEIGHT
            })
        }
    }
    if (order === "name") {
        
        return (dispatch) => {
            
            dispatch({
                type: ORDER_NAME
            })
        }
    }
}

export const filterOrigin = (value) => {
    if (value === "") {
        return (dispatch) => {
            dispatch({
                type: FILTER_ORIGIN,
                payload: "all"
            })
        }
    }
    if (value === "API") {
        return (dispatch) => {
            dispatch({
                type: FILTER_ORIGIN,
                payload: "API"
            })
        }
    }
    if (value === "DB") {
        return (dispatch) => {
            dispatch({
                type: FILTER_ORIGIN,
                payload: "DB"
            })
        }
    }

}

export const filterTemperament = (value) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_TEMPERAMENT,
            payload: value
        })
    } 
}

export const directionOrderName = (value) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_NAME_DIRECTION,
            payload: value
        })
    }
}

export const directionOrderWeight = (value) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_WEIGHT_DIRECTION,
            payload: value
        })
    }
}

export const handlePageNum = (value) => {
    return (dispatch) => {
        dispatch({
            type: PAGE_NUM,
            payload: value,
        })
    }
}