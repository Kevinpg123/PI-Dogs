import { ALL_DOGS, FILTER_ORIGIN, FILTER_TEMPERAMENT, GET_ALL_TEMPERAMENTS, ORDER_NAME, ORDER_NAME_DIRECTION, ORDER_WEIGHT, ORDER_WEIGHT_DIRECTION, PAGE_NUM, RESET_SEARCH_DOGS_ERROR, SEARCH_DOGS, SEARCH_DOGS_ERROR } from "../action/action";

const initialState = {
    allDogs: [],
    allDogsOriginal:[],
    searchDogs: [],
    searchDogsOriginal:[],
    searchDogsError: [],
    allTemperaments: [],
    sortByName: "asc",
    sortByWeight: "asc",
    filterOrigin: "all",
    pageNum:1
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
        case ORDER_NAME_DIRECTION:
            return {
                ...state, sortByName:payload
            }
            break;
        
        case ORDER_WEIGHT_DIRECTION:
            return {
                ...state, sortByWeight: payload
            }
            break;
        
        case ORDER_NAME:
            
            if (state.sortByName === "asc") {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => a.name.localeCompare(b.name)),
                    
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => a.name.localeCompare(b.name)),
                }
            } else {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => b.name.localeCompare(a.name)),
                    
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => b.name.localeCompare(a.name)),
                }
            }
            break;
        
        case ORDER_WEIGHT:
            if (state.sortByWeight === "asc") {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => {
                        const [aMin, aMax] = a.weight.split(" - ").map(parseFloat)
                        const [bMin, bMax] = b.weight.split(" - ").map(parseFloat)
                        const avgA = (aMin + aMax)/2
                        const avgB = (bMin + bMax) / 2
                        return avgA-avgB
                    }),
                   
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => {
                        const [aMin, aMax] = a.weight.split(" - ").map(parseFloat)
                        const [bMin, bMax] = b.weight.split(" - ").map(parseFloat)
                        const avgA = (aMin + aMax)/2
                        const avgB = (bMin + bMax) / 2
                        return avgA-avgB
                    }),
                }
            } else {
                return {
                    ...state, allDogs: state.allDogs.slice().sort((a, b) => {
                        const [aMin, aMax] = a.weight.split(" - ").map(parseFloat)
                        const [bMin, bMax] = b.weight.split(" - ").map(parseFloat)
                        const avgA = (aMin + aMax)/2
                        const avgB = (bMin + bMax) / 2
                        return avgB-avgA
                    }),
                    
                    searchDogs: state.searchDogsOriginal.slice().sort((a, b) => {
                        const [aMin, aMax] = a.weight.split(" - ").map(parseFloat)
                        const [bMin, bMax] = b.weight.split(" - ").map(parseFloat)
                        const avgA = (aMin + aMax)/2
                        const avgB = (bMin + bMax) / 2
                        return avgB-avgA
                    }),
                }
            }
            break;
        
        case FILTER_ORIGIN:
            if (payload === "all") {
                return {
                    ...state, allDogs: state.allDogsOriginal.slice().sort((a, b) => a.name.localeCompare(b.name)),
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
                    ...state, allDogs: state.allDogsOriginal.slice().sort((a, b) => a.name.localeCompare(b.name)),
                }
            }

            return {
                ...state, allDogs: state.allDogsOriginal.slice().filter((el) => el.temperament.split(', ').includes(payload))
            }
            break;
        
        case PAGE_NUM:
            return {
                ...state, pageNum: parseFloat(payload)
            }
        
        default:
            return {...state}
            break;
    }
}

export default rootReducer;