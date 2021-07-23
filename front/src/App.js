import Login from './components/Login/Login';
import './App.css';
import Greeting from './components/Greeting/Greeting';
import { useEffect, useState } from 'react';
import * as authService from './services/auth.service';

var interval;

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    clearInterval(interval);
    interval = setInterval(()=>{
      authService.refresh();
    }, 600000);
  })
  
  useEffect(() => {
    authService.refresh()
      .then(r => {
        setAuthenticated(true);
      })
      .catch(err => {
        setAuthenticated(false);
      });
  });


  function updateAuthenticated(state) {
    setAuthenticated(state);
  }
  
  return (
    <div className="flex-center App">
      {
        (authenticated) ?
        <Greeting onChange={updateAuthenticated} /> :
        <Login onChange={updateAuthenticated} />
      }
    </div>
  );
}

export default App;
