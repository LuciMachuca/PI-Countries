import axios from 'axios';


// CARDS DEL HOME - RUTA PRINCIPAL
export function getCountries(){
    return async function(dispatch){

        var json = await axios.get( "http://localhost:3001/countries", {}); 
    
        return dispatch ({
            type : 'GET_COUNTRIES',
            payload : json.data
        })
    };
}

// LISTA DE ACTIVIDADES TURÍSTICAS -> Para el filtrado
export function listActivity() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/activity', {})
        return dispatch({
            type: "LIST_ACTIVITY",
            payload: json.data
        });
    };
}; 


// FILTRADO -> ACTIVIDAD TURÍSTICA
export function filterByActivity(payload) {
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

// FILTRAR POR CONTINENTE
export function filterByContinents(payload) {
    return {
        type: 'FILTER_BY_CONTINENTS',
        payload
    }
}

// ORDEN ALFABÉTICO POR PAIS
export function orderByCountries(payload) {
    return {
        type: 'ORDER_BY_COUNTRIES',
        payload
    }
}

// ORDEN POR POBLACIÓN -> PAISES
export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}

// SEARCHBAR -> BUSQUEDA DE PAISES POR NOMBRE
export function getName(country) {
    return async (dispatch) => {
        try {
            var json = await axios.get(`http://localhost:3001/countries?name=${country}`, {});
            return dispatch({
                type: 'GET_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log('Error en la acción del SearchBar')
        }
    }
}

// DETALLE DE PAISES POR ID
export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/countries/' + id, {});
            return dispatch({                        
                type: "GET_DETAIL",
                payload: json.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

// CREACIÓN DE ACTIVIDAD TURÍSTICA
export function postActivity(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/activity', payload);
        return response;
    }
}




