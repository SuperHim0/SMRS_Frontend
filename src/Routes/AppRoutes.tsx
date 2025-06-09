import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Notice from '../components/Student/Notice';
import Result from '../components/Student/Result';
import AdminLogin from '../Pages/AdminLogin';
import AdminDashboard from '../Layout/AdminDashboard';
import Dashboard from '../components/Admin/Dashboard';
import { Random } from '../Pages/Random';
import { AdminStudent } from '../components/Admin/AdminStudent';
import AdminResult from '../components/Admin/AdminResult';
import AdminNotice from '../components/Admin/AdminNotice';
import AddStudent from '../components/Admin/AddStudent';
import AddResult from '../components/Admin/AddResult';
import ProtectedRoutes from './ProtectedRoutes';


const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Result/>} />
        <Route path='/notices' element={<Notice/>} />
        <Route path='/result'  element={<Result/>}/>
        <Route path='/login' element={<AdminLogin/>} />

        <Route path="/admin" element={<ProtectedRoutes><AdminDashboard/></ProtectedRoutes>}>
          <Route path='' element={<Dashboard/>} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path='student' element={<AdminStudent/>} /> 
          <Route path='result' element={<AdminResult/>} /> 
          <Route path='notice' element={<AdminNotice/>} />
          <Route path='addstudent' element={<AddStudent/>} />
          <Route path='addresult' element={<AddResult/>} />
        </Route>
          <Route path='/form' element={<Random/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes