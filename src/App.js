
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Pages/Login';
import Sentbox from './components/Pages/Sentbox';
import Signup from './components/Pages/Signup';
import Welcome from './components/Pages/Welcome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/welcome' element={<Welcome/>}/>
    <Route path= '/sentmail' element={<Sentbox/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
