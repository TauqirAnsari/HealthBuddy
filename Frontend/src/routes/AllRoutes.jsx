import {Routes, Route,} from 'react-router-dom';
import {SignUp, Login, ProfileForm, Landing, Dashboard, DietTable, Product} from '../pages/Index';




export default function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/profileform" element={<ProfileForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/diettable" element={<DietTable/>} />
            <Route path="/products" element={<Product/>} />
        </Routes>
    </>
  );
}
