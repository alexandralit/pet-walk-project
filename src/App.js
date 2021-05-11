import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Nav from './components/nav/nav';
import Pets from './components/pets/pets';
import AddPets from './components/pets/addPets/addPets';
import { useState } from 'react';
import Walk from './components/home/walk/walk';
import Store from './context';
import StartPage from './components/startPage/startPage'; 
import Registration from './components/registration/registration'; 
import Login from './components/login/login'; 
import Account from './components/account/account'; 
import EndWalk from './components/home/walk/endWalk';
import EditInfo from './components/pets/editPet/editInfo';
import { useCookies } from 'react-cookie';
import PetSelection from './components/home/petSelection/petSelection';
import Signout from './components/account/signout/signout';

function App() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('Users')) || []);
  const [cookies, setCookie, removeCookie] = useCookies(['login']);

  let user = null;
  if (cookies.login) user = users.filter(user => user.id === cookies.login.id);

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Store.Provider value={{user, users, setUsers, cookies, setCookie, removeCookie}}>

        <Switch>
          <Route exact path='/'>
            <StartPage />
          </Route>

          <Route path='/registration'>
            {cookies.login && <Redirect to="/home" />}
            <Registration />
          </Route>

          <Route path='/login'>
            {cookies.login && <Redirect to="/home" />}
            <Login />
          </Route>

          <Route exact path='/home'>
            <Home />
            <Nav />
          </Route>

          <Route path='/home/petselection'>
            <PetSelection />
            <Nav />
          </Route>
    
          <Route exact path='/walk'>
            <Walk />
            <Nav />
          </Route>

          <Route path='/walk/endWalk'>
            <EndWalk />
            <Nav />
          </Route>

          <Route exact path='/mypets'>
            <Pets />
            <Nav />
          </Route>

          <Route path='/mypets/addpets'>
            <AddPets />
            <Nav />
          </Route>

          <Route exact path='/mypets/:name'>
            <EditInfo />
            <Nav />
          </Route>

          <Route exact path='/account'>
            <Account />
            <Nav />
          </Route>

          <Route path='/account/signout'>
            <Signout />
            <Nav />
          </Route>
        </Switch>

      </Store.Provider>
    </HashRouter>
  );
}

export default App;
