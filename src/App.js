import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Router from './Routers';
import Notification from './Components/Notify';
import { AppProvider} from './context/userContext';
import { useState } from 'react';

let user = localStorage.getItem('sakila-user');
let userObj = JSON.parse(user);

function App() 
{
  const [user, setUser] = useState(userObj);
  const init = {
    user:  user,
    setUser: setUser
  }
  return ( 
    <>
      <AppProvider value={init}>
        <div className='main'>
          <Router/>
          <Notification/>
        </div>
      </AppProvider>
    </>
  );
}

export default App;