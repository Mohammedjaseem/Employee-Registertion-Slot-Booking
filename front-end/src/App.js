
import './App.css';

// Addning compoents here
import List from './components/List';
import Add from './components/Add';
import Update from './components/Update';
import NavbarBootstrap from './components/Navbar';

// imported bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// import react router
import { Routes ,Route } from 'react-router-dom';


function App() {
  return (
    <div className='container'>
      <NavbarBootstrap />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
