import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NewActivity from './components/NewActivity/NewActivity';
import Detail from './components/Detail/Detail';
//import SearchBar from './components/SearchBar/SearchBar';

function App() {
  return (
    <BrowserRouter>

    <div className="App">

      <Switch>

        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route exact path='/countries/:id' component={Detail} />
        <Route path='/activity' component={NewActivity} />
       

      </Switch>

    </div>

  </BrowserRouter>
  );
}

export default App;
