import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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

function App() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('Users')) || []);
  const [id, setId] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['login']);
  let user = null;

  if (cookies.login) {
    user = users.filter(user => user.id === cookies.login.id);
  } 

  const [info, setInfo] = useState(JSON.parse(localStorage.getItem('Info')) || []);
  const [seconds, setSeconds] = useState(0);

  return (
    <BrowserRouter>
      <Store.Provider value={{user, users, setUsers, id, setId, info, setInfo, seconds, setSeconds, cookies, setCookie, removeCookie}}>

        <Switch>
          <Route exact path='/'>
            <StartPage />
          </Route>

          <Route path='/registration'>
            {cookies.login ? <Redirect to="/home" /> : null}
            <Registration />
          </Route>

          <Route path='/login'>
            {cookies.login ? <Redirect to="/home" /> : null}
            <Login />
          </Route>

          <Route exact path='/home'>
            <Home />
            
          </Route>

          <Route path='/home/petselection'>
            <PetSelection />
            
          </Route>

          <Route exact path='/walk'>
            <Walk />
           
          </Route>

          <Route path='/walk/endWalk'>
            <EndWalk />
           
          </Route>

          <Route exact path='/mypets'>
            <Pets />
           
          </Route>

          <Route path='/mypets/addpets'>
            <AddPets />
          
          </Route>

          <Route exact path='/mypets/:name'>
            <EditInfo />
           
          </Route>

          <Route path='/account'>
            <Account />
          </Route>
        </Switch>

        <Nav />
      </Store.Provider>
    </BrowserRouter>
  );
}

export default App;
