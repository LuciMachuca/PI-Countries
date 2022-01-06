const initialState = {
    countries: [],
    allCountries: [],
    activity: [],
    detail: []
}

function rootReducer(state = initialState, action) {

    switch (action.type) {

        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }


        case 'ORDER_BY_COUNTRIES':

            let sortedArr1 = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })

            return {
                ...state,
                countries: sortedArr1
            }

        case 'ORDER_BY_POPULATION':

            let sortedArr2 = [];
            if (action.payload === "asc") {
                sortedArr2 = state.countries.sort((a, b) => {
                    if (a.population > b.population) return 1;
                    if (a.population < b.population) return -1;
                    return 0;
                });
            } else if (action.payload === "desc") {
                sortedArr2 = state.countries.sort((a, b) => {
                    if (a.population > b.population) return -1;
                    if (a.population < b.population) return 1;
                    return 0;
                });
            } else {
                sortedArr2 = state.countries;
            }
            return {
                ...state,
                countries: sortedArr2,
            };

        case 'LIST_ACTIVITY':
            return {
                ...state,
                activity: action.payload
            }

        case 'FILTER_BY_CONTINENTS': // el valor del select es lo q le llega a mi acción x payload
            const continentsFilter = action.payload === 'All' ? state.allCountries : state.allCountries.filter(el => el.continents.includes(action.payload))
            return {
                ...state,
                countries: continentsFilter
            }

        case 'FILTER_BY_ACTIVITY': // el valor del select es lo q le llega a mi acción x payload
            const activityFilter = action.payload === 'All' ? state.allCountries : state.allCountries.filter(el => el.activities.includes(action.payload))
            return {
                ...state,
                countries: activityFilter
            }

        case 'GET_NAME':

            //const pokeName = action.payload === null  || action.payload === [] || action.payload.length === 0 ? state.allPokemons : action.payload;
            return {
                ...state,
                allCountries: action.payload
            }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

        case 'POST_ACTIVITY':
            return {
                ...state   // no hacemos nada aquí xq creamos en una nueva ruta
            }

        default:
            return state;


    }
}

export default rootReducer;