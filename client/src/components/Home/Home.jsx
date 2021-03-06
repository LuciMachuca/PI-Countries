/* eslint-disable no-unused-vars */

import { useEffect } from 'react'; //useEffect llena el estado cuando se monta el componente
import { useState } from 'react';
// useState -> funcion que nos devuelve un array con dos elem:  [state, metodo para mutarlo] 
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, listActivity, filterByActivity, filterByContinents, orderByPopulation, orderByCountries } from '../../actions/index';
//import { getCountries, listActivity, filterByActivity, filterByContinents, orderByPopulation, orderByCountries } from '../../actions/actionsPromises';
import { Link } from 'react-router-dom';
import SortSelect from '../SortSelect/SortSelect';
import Paginado from '../Paginado/Paginado.jsx';
//import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css';
import CardList from '../CardList/CardList';
import Error from '../Error/Error';

export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries); // mapStateToProps
    //console.log(allCountries);

    const activity = useSelector(state => state.activity);

    // ######### PAGINADO  ######################
    // la 1ra pagina tiene q tener 9 paises y luego 10 x pag

    const [pagActual, setPagActual] = useState(1)
    const [countriesPorPag, setCountriesPorPag] = useState(10)
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
    }, [dispatch]);   // Listado de Actividades para el Filtrado

    // ************  SETEADO DE TODAS LAS CARD ************************
    function handleClick(e) { // para el boton Volver a cargar Paises
        e.preventDefault();
        dispatch(getCountries()); // recetea -> vuelve a mostrar todo
    }


    // *********** ORDENAMIENTO: ASC Y DESC alfabéticamente y por población  ****************
    const [order, setOrder] = useState('');
    const [sort, setSort] = useState('Order Alphabetically');


    function handleSort(e) {
        e.preventDefault();
        if (sort === "Order Alphabetically") setSort("Order by Number of Inhabitants");
        if (sort === "Order by Number of Inhabitants") setSort("Order Alphabetically");
    }

    function orderByCountry(e) { // ordenamiento por nombre
        dispatch(orderByCountries(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    };


    function orderPopulation(e) {
        dispatch(orderByPopulation(e.target.value))
        setPagActual(1);
        setOrder(e.target.value)
    }; // VOLVER AL COMIENZO ---

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

        <div className='fondo'>

            <div className='barraPrincipal'>

                <div className='volver'>
                    <button className='bp' onClick={e => handleClick(e)}>
                        Refresh
                    </button>
                </div>

                <div className='search'>
                    <SearchBar />
                </div>


                <div className='creacion'>
                    <Link to='/activity'><button className="bp">Create Tourist Activity</button></Link>
                </div>

            </div>


            <h2>COUNTRIES APP</h2>
           


            <div className='select'>

                <button
                    className="bp"
                    value={sort}
                    onClick={(e) => handleSort(e)}
                >{sort}</button>

                {sort === "Order Alphabetically" ? (
                    <SortSelect
                        handleSort={orderByCountry}
                        sortDescription="Order"
                    />
                ) : (
                    <SortSelect
                        handleSort={orderPopulation}
                        sortDescription="Order"
                    />
                )}


                <select className="select1" onChange={e => handleFilterByContinents(e)}>
                    <option value='All'> Filter By Continent... </option>
                    <option value='Americas'>Americas</option>
                    <option value='Europe'>Europe</option>
                    <option value='Africa'>Africa</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Asia'>Asia</option>

                </select>


                <select className="select2" onChange={e => handleFilterByActivity(e)}>
                    <option value='All'>Filter By Tourist Activities ...</option>
                    {activity &&
                        activity.map(el => (
                            <option
                                value={el.name} key={el.name}>{el.name}</option>
                        ))}

                </select>
            </div>

            <Paginado
                countriesPorPag={countriesPorPag}
                allCountries={allCountries.length}
                paginado={paginado}
            />

            <div className='cardHome'>
                {/* {
                    countryPagActual?.map((el) => {
                        return (

                            <div className='2'>
                                <Link to={'/countries/' + el.id} >
                                    <Card name={el.name} imgbandera={el.imgbandera} continents={el.continents} population={el.population} key={el.id} />
                                </Link>
                            </div>

                        );

                    })

                } */}
                <div className='2'>
                    {
                        allCountries === "Country Not Found" ? <Error /> : 
                        
                        <CardList country={countryPagActual} />
                    }
                </div>
            </div>


        </div>
    )
}