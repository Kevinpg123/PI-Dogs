import { ALL_DOGS, FILTER_ORIGIN, FILTER_TEMPERAMENT, GET_ALL_TEMPERAMENTS, ORDER_NAME, ORDER_WEIGHT, RESET_SEARCH_DOGS_ERROR, SEARCH_DOGS, SEARCH_DOGS_ERROR } from "../action/action";

const initialState = {
    allDogs: [],
    allDogsOriginal:[],
    searchDogs: [],
    searchDogsOriginal:[],
    searchDogsError: [],
    allTemperaments: [],
    sortByName: "desc",
    sortByWeight: "desc",
    filterOrigin: "all"
};

const rootReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case ALL_DOGS:
            return {
                ...state, allDogs: payload, allDogsOriginal: payload
            }
            break;
        case SEARCH_DOGS:
            return {
                ...state, searchDogs: payload, searchDogsOriginal: payload
            }
            break;
        case SEARCH_DOGS_ERROR:
            return {
                ...state, searchDogsError: payload
            }
            break;
        case RESET_SEARCH_DOGS_ERROR:
            return {
                ...state, searchDogsError: {}
            }
            break;
        case GET_ALL_TEMPERAMENTS:
            return {
                ...state, allTemperaments: payload
            }
            break;
        case ORDER_NAME:
            
            if (state.sortByName === "desc") {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => a.name.localeCompare(b.name)),
                    sortByName: "asc",
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => a.name.localeCompare(b.name)),
                }
            } else {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => b.name.localeCompare(a.name)),
                    sortByName: "desc",
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => b.name.localeCompare(a.name)),
                }
            }
            break;
        
        case ORDER_WEIGHT:
            if (state.sortByWeight === "desc") {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => a.weight.toString().localeCompare(b.weight.toString())),
                    sortByWeight: "asc",
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => a.weight.toString().localeCompare(b.weight.toString())),
                }
            } else {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => b.weight.toString().localeCompare(a.weight.toString())),
                    sortByWeight: "desc",
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => b.weight.toString().localeCompare(a.weight.toString())),
                }
            }
            break;
        
        case FILTER_ORIGIN:
            if (payload === "all") {
                return {
                    ...state, allDogs: state.allDogsOriginal
                }
            }
            if (payload === "API") {
                return {
                    ...state, allDogs: state.allDogsOriginal.slice().filter((el) => el.id < 200)
                }
            }
            if (payload === "DB") {
                return {
                    ...state, allDogs: state.allDogsOriginal.slice().filter((el) => el.id.length > 5)
                }
            }
            break;
        
        case FILTER_TEMPERAMENT:
            if (payload === "all") {
                return {
                    ...state, allDogs: state.allDogsOriginal
                }
            }

            return {
                ...state, allDogs: state.allDogsOriginal.slice().filter((el) => el.temperament.split(', ').includes(payload))
            }
            
        default:
            return {...state}
            break;
    }
}

export default rootReducer;