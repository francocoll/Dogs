import axios from 'axios'

export function getDogs() {
    return async function (dispatch) {
        try {
            const json = await axios.get('/dogs')
            return dispatch({
                type: 'GET_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDogName(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get('/dogs?name=' + payload)
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (error) {
            alert('Not found')
        }
    }
}


export function getTemperaments() {
    return async function (dispatch) {
        try {
            const json = await axios.get('/temperaments')
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/dogs/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        const info = await axios.post('/dog', payload)
        return info
    }
}

export function filterBySource(payload) {
    return {
        type: 'FILTER_BY_SOURCE',
        payload
    }
}

export function filterByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function cleanDog() {
    return {
        type: 'CLEAN_DOG',
        payload: {}
    }
}

export function masDe3(payload){
    return {
        type: 'MAS_3',
        payload
    }
}

export function loading(){
    return {
        type: 'LOADING'
    }
}

