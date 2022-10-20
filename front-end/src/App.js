
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
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PendingList from './pages/PendingList';
import RejctedList from './pages/RejctedList';
import SlotBooking from './pages/SlotBooking';
import AdminLogin from './pages/AdminLogin';
import Sidebar from './pages/Sidebar';
import AddDp from './pages/dpAdd';



function App() {
  return (
    <div className='container'>
      <NavbarBootstrap />
      
      <Routes>
        {/* private route for home page */}
        {/* <PrivateRoute element={<HomePage />} /> */}
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/list' element={<List />} />
        <Route path='/PendingList' element={<PendingList />} />
        <Route path='/RejctedList' element={<RejctedList />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/AdminPage' element={<AdminPage />} />
        <Route path='/SlotBooking' element={<SlotBooking />} />
        <Route path='/AddDp' element={<AddDp />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
