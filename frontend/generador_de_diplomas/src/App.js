import React, {useState, useEffect} from 'react';
import './App.css';
import SignIn from './components/SignIn';
import DashBoard from './components/Dashboard';
import axios from 'axios';

function App() {
  
  const [login, setLogin] = useState(false)

  // Verifico si estoy logeado
  useEffect(() => {
    console.log('Use efect');

    if (localStorage.getItem('access_token')) {
      console.log('Entre al if');
      let url = 'http://127.0.0.1:8000/api/token/verify/';
      const data = {'token': localStorage.getItem('access_token')}
      
      axios.post(url, data)
      .then(function (response) {
        console.log('Entre al then, accees token vivo')
        console.log(response);
        setLogin(true);
      })
      .catch(function (response) {
        // Tengo el acces token pero se vencio, lo renuevo con el refresh token

        console.log('Se vencio el access token, intento renovarlo')
        let url = 'http://127.0.0.1:8000/api/token/refresh/';
        const data = {'refresh': localStorage.getItem('refresh_token')}
        
        axios.post(url, data)
        .then(function (response){
          console.log('sigue vivo el refresh token, renuevo el access token');
          console.log(response);
          // localStorage.removeItem('access_token');
          setLogin(true);
          localStorage.setItem('access_token', response.data.access);
        })
        .catch(function (response){
          console.log('Se vencio el refresh token, deslogueo!');
          console.log(response);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setLogin(false);
        });
        
        // console.log('Entre al catch')
        // console.log(response);
        // setLogin(false);
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
      });
    } else {
      console.log("Entre al else");
    }
  });

  function handleLogout() {
    console.log("LogOut")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setLogin(false);
  }

  function handleLogin(e, userName, password) {
    e.preventDefault();
    console.log("Login");

    var url = 'http://127.0.0.1:8000/api/token/';
    const data = {'username': userName,'password': password};

    axios.post(url,data)
    .then(function (response) {
      // console.log(response.data);
      // console.log(response.data.refresh);
      // console.log(response.data.access)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // console.log("Token de acceso: " + localStorage.getItem('access_token'))
      setLogin(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div className="App">
        <div className="App">
          {!login ? 
            // No estoy logeado
            <SignIn 
              handleLogin={handleLogin}
            />
            // Estoy logeado
            : 
            <DashBoard 
              handleLogout={handleLogout}
            />
          }
        </div>
    </div>
  );
}

export default App;
