import React, {useState, useEffect} from 'react';
import './App.css';
import SignIn from './components/SignIn';
import DashBoard from './components/Dashboard';
import axios from 'axios';

function App() {
  
  const [login, setLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Verifico si estoy logeado
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      let url = 'http://127.0.0.1:8000/api/token/verify/';
      const data = {'token': localStorage.getItem('access_token')}
      
      axios.post(url, data)
      .then(function (response) {
        setLogin(true);
      })
      .catch(function (response) {
        // Tengo el acces token pero se vencio, lo renuevo con el refresh token

        let url = 'http://127.0.0.1:8000/api/token/refresh/';
        const data = {'refresh': localStorage.getItem('refresh_token')}
        
        axios.post(url, data)
        .then(function (response){
          setLogin(true);
          localStorage.setItem('access_token', response.data.access);
        })
        .catch(function (response){
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user_id');
          setLogin(false);
        });
      });
    } else {
      console.log("Entre al else");
    }
  });

  function handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    setLogin(false);
  }

  function handleLogin(e, userName, password) {
    e.preventDefault();

    var url = 'http://127.0.0.1:8000/api/token/';
    const data = {'username': userName,'password': password};

    axios.post(url,data)
    .then(function (response) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user_id', response.data.user_id);
      setLogin(true);
    })
    .catch(function (response) {
      setErrorMessage('Nombre de usuario o contraseña incorrectos');
    });
  }
  
  return (
    <div className="App">
        <div className="App">
          {!login ? 
            // No estoy logeado
            <SignIn 
              handleLogin={handleLogin}
              errorMessage={errorMessage}
            />
            // Estoy logeado
            : 
            <DashBoard 
              handleLogout={handleLogout}
              userId={localStorage.getItem('user_id')}
            />
          }
        </div>
    </div>
  );
}

export default App;
