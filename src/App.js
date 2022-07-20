import './App.css';
import Signup from "./Component/Signup"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from "./Component/Login"
import { AuthProvider } from './Context/Authcontext';
import Feed from './Component/Feed';
import Privateroute from './Component/Privateroute';
import Profile from './Component/Profile'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={
              <Privateroute>
                <Profile/>
              </Privateroute>
            }/>
            <Route path='/' element={
              <Privateroute>
                <Feed/>
              </Privateroute>
            }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
