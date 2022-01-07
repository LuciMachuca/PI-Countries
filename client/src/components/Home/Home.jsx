
import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, listActivity, filterByActivity, filterByContinents, orderByPopulation, orderByCountries } from '../../actions/index';
import { Link } from 'react-router-dom';
import SortSelect from '../SortSelect/SortSelect';
import Paginado from '../Paginado/Paginado.jsx';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries); // mapStateToProps
    //console.log(allCountries);

    const activity = useSelector(state => state.activity);

    // ######### PAGINADO  ######################
    // la 1ra pagina tiene q tener 9 paises y luego 10 x pag

    const [pagActual, setPagActual] = useState(1)
    const [countriesPorPag, setCountriesPorPag] = useState(9)
    //const primeraPag = 9
    const indexUltimoCountry = pagActual * countriesPorPag
    //  inicialmente 9   ->    1      *    10

    const indexPrimerCountry = indexUltimoCountry - countriesPorPag
    //  inicialmente 0   ->      10      -       10

    const countryPagActual = allCountries.slice(indexPrimerCountry, indexUltimoCountry)
    // me traigo esa porción de paises del 1 a la 9


    const paginado = (pagNum) => {
        setPagActual(pagNum)
    }


    useEffect(() => {
        dispatch(getCountries()) // mapDispatchToProps
    }, [dispatch]) // de q depende el component did mount

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(listActivity())
    }, []);   // Listado de Actividades para el Filtrado

// ************  SETEADO DE TODAS LAS CARD ************************
    function handleClick(e) { // para el boton Volver a cargar Paises
        e.preventDefault();
        dispatch(getCountries()); // recetea -> vuelve a mostrar todo
    }


    // *********** ORDENAMIENTO: ASC Y DESC alfabéticamente y por población  ****************
    const [ order, setOrder ] = useState('');
    const [ sort, setSort ] = useState('Alphabetically');


    function handleSort(e) {
        e.preventDefault();
        if (sort === "Alphabetically") setSort("By Number of Inhabitants");
        if (sort === "By Number of Inhabitants") setSort("Alphabetically");
    }

    function orderByCountry(e) { // ordenamiento por nombre
        dispatch(orderByCountries(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    };


    function orderByPopulation(e) { // ordenamiento por fuerza
        dispatch(orderByPopulation(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    };

     // *********** FILTRADO: Por CONTINENTE y por ACTIVIDAD TURÍSTICA  ****************

     
    function handleFilterByContinents(e) {
        dispatch(filterByContinents(e.target.value))
        setPagActual(1);
    };

    function handleFilterByActivity(e) {
        dispatch(filterByActivity(e.target.value))
        setPagActual(1);
    };

    return (

        <div>

            <Link to='/countries'>Create Tourist Activity</Link>

            <h1>COUNTRIES APP</h1>
            <button onClick={e => handleClick(e)}>
            Refresh
            </button>

            <div className='search'>
                <SearchBar />
            </div>

            <div className='1'>

                <button
                    className="select1"
                    value={sort}
                    onClick={(e) => handleSort(e)}
                >{sort}</button>

                { sort === "Alphabetically" ? (
                    <SortSelect
                        handleSort={orderByCountry}
                        sortDescription="Order"
                    />
                ) : (
                    <SortSelect
                        handleSort={orderByPopulation}
                        sortDescription="Order"
                    />
                )}


                <select className="select2" onChange={e => handleFilterByContinents(e)}>
                <option value= 'All'> Continents... </option>
                    <option value= 'Americas'>Americas</option>
                    <option value= 'Europe'>Europe</option>
                    <option value= 'Africa'>Africa</option>
                    <option value= 'Oceania'>Oceania</option> 
                    <option value= 'Antarctic'>Antarctic</option>
                    <option value= 'Asia'>Asia</option>

                </select>


                <select className="select2" onChange={e => handleFilterByActivity(e)}>
                    <option value='All'>Tourist Activities ...</option>
                    {activity &&
                        activity.map(el => (
                            <option
                                value={el.name}>{el.name}</option>
                        ))}

                </select>

                <Paginado
                    countriesPorPag={countriesPorPag}
                    allCountries={allCountries.length}
                    paginado={paginado}
                />

                <div className='3'>
                    {
                        countryPagActual?.map((el) => {
                            return (
                                <fragment>
                                    <div className='2'>
                                        <Link to={'/countries/' + el.id} >
                                            <Card name={el.name} imgbandera={el.imgbandera} continents={el.continents} key={el.id} />
                                        </Link>
                                    </div>
                                </fragment>
                            );

                        })
                    }
                </div>

            </div>


        </div>
    )
}