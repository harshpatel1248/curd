import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Update from './components/Update';
import Create from "./components/Create";
import Reade from './components/Reade';

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
         <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Reade />} />
      </Routes>
  
  );
}

export default App;
