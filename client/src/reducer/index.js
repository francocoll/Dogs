const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: {}

}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'GET_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_DOG':
            return {
                ...state
            }
        case 'ORDER_BY_NAME':
            let orderAsc = state.dogs.slice().sort((a, b) => {
                let dogA = a.name.toLowerCase();
                let dogB = b.name.toLowerCase();
                if (dogA > dogB) return 1
                if (dogB > dogA) return -1
                return 0
            })
            const allDogs3 = state.allDogs;
            const orderName = action.payload === 'asc' ? orderAsc : orderAsc.reverse()
            return {
                ...state,
                dogs: action.payload === '' ? allDogs3 : orderName
            }
        case 'ORDER_BY_WEIGHT':
            const sortedWeight = action.payload === 'lower-weight'
                ? state.dogs.sort(function (a, b) {
                    return a.weightMin - b.weightMin
                })
                : state.dogs.sort(function (a, b) {
                    return b.weightMax - a.weightMax
                });
            return {
                ...state,
                dogs: sortedWeight
            }
        case 'FILTER_BY_SOURCE':
            const allDogs2 = state.allDogs
            const filterCreated =
                action.payload === 'created'
                    ? allDogs2.filter((el) => el.createdInDb)
                    : allDogs2.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'all' ? allDogs2 : filterCreated
            }
        case "FILTER_BY_TEMPERAMENT":
            const allDogs = state.allDogs;
            const filterTemperaments = action.payload === "all" ?
                allDogs : allDogs.filter(el => {
                    return el.temperament?.split(", ").includes(action.payload)
                })
            return {
                ...state,
                dogs: filterTemperaments
            }
        default:
            return state
    }
}