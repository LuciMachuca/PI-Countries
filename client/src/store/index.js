import { createStore, applyMiddleware } from 'redux';
// applyMiddleware -> me permite hacer llamados a apis externas / servidor con Redux a través de ACCIONES
import { composeWithDevTools } from 'redux-devtools-extension';
// extención para poder ver todo en el browser
import thunk from 'redux-thunk';
// para poder enviar acciones asíncronas y efectos secundarios
// facilita el envío de acciones que siguen el ciclo de vida de una solicitud a una API externa.
import rootReducer from '../reducer/index';


/* const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer, 
    composeEnhancer(applyMiddleware(thunk))); */

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));