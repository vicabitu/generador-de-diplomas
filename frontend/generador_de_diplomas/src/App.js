import React, {useState} from 'react';
import './App.css';
import SignIn from './components/SignIn';
import DashBoard from './components/Dashboard';
import axios from 'axios';

function App() {
  
  const [login, setLogin] = useState(false)

  function handleLogout() {
    console.log("LogOut")
    localStorage.removeItem('access_token');
    setLogin(false);
  }

  function handleLogin(e, userName, password) {

    e.preventDefault();
    console.log("Login");

    var url = 'http://127.0.0.1:8000/api/token/';
    const data = {'username': userName,'password': password};

    axios.post(url, 
      data
    )
    .then(function (response) {
      // console.log(response.data);
      // console.log(response.data.refresh);
      // console.log(response.data.access)
      localStorage.setItem('access_token', response.data.access);
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
