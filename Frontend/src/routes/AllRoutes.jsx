import {Routes, Route} from 'react-router-dom';
import {SignUp, Login, DetailsForm} from '../pages/Index';



export default function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/detailsForm" element={<DetailsForm/>} />
        </Routes>
    </>
  );
}
