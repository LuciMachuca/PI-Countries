// ====== CONSTANTES ==========
export const GET_NAME = "GET_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const LIST_ACTIVITY = "LIST_ACTIVITY";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_CONTINENTS = "FILTER_BY_CONTINENTS";
export const ORDER_BY_COUNTRIES= "ORDER_BY_COUNTRIES";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

//import fetch from 'fetch'; 


// CARDS DEL HOME - RUTA PRINCIPAL
export const getCountries = () => dispatch => {
    return fetch(`http://localhost:3001/countries`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({
                type: GET_COUNTRIES,
                payload: json
            })
        })
        .catch((error) => { console.log(error) })
}

// LISTA DE ACTIVIDADES TURÍSTICAS -> Para el filtrado
export const listActivity = () => dispatch => {
    return fetch(`http://localhost:3001/activity`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({
                type: LIST_ACTIVITY,
                payload: json
            })
        })
        .catch((error) => { console.log(error) })
}

// FILTRADO -> ACTIVIDAD TURÍSTICA
export const filterByActivity = (payload)=>{
    return { 
        type: FILTER_BY_ACTIVITY, 
        payload 
    }
}

// FILTRAR POR CONTINENTE
export const filterByContinents = (payload)=>{
    return { 
        type: FILTER_BY_CONTINENTS, 
        payload 
    }
}

// ORDEN ALFABÉTICO POR PAIS
export const orderByCountries = (payload)=>{
    return { 
        type: ORDER_BY_COUNTRIES, 
        payload 
    }
}

// ORDEN POR POBLACIÓN -> PAISES
export const orderByPopulation = (payload)=>{
    return { 
        type: ORDER_BY_POPULATION, 
        payload 
    }
}

// SEARCHBAR -> BUSQUEDA DE PAISES POR NOMBRE
export const getName = (country) => dispatch => {
    return fetch(`http://localhost:3001/countries?name=${country}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({
                type: GET_NAME,
                payload: json
            })
        })
        .catch((error) => { console.log(error) })
}

// DETALLE DE PAISES POR ID
export const getDetail = (id) => dispatch => {
    return fetch(`http://localhost:3001/countries/${id}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({
                type: GET_DETAIL,
                payload: json
            })
        })
        .catch((error) => { console.log(error) })
}




