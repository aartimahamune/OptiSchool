import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import StudentLogin from './pages/StudentLogin.jsx'
import Header from './components/Header.jsx'
import Contact from './pages/Contact.jsx'
import Gallery from './pages/Gallery.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import StudentAdmission from './pages/StudentAdmission.jsx'
import AdminProfile from './pages/AdminProfile.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import StudentDetails from './pages/StudentDetails.jsx';
import StudentProfile from './pages/StudentProfile.jsx';
import StudentPrivateRoute from './components/StudentPrivateRoute.jsx'
import StudyMaterial from './pages/StudyMaterial.jsx';
import MaterialDetails from './pages/MaterialDetails.jsx';
import StudentStudyMaterial from './pages/studentStudyMaterial.jsx';
import StudentView from './components/StudentView.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/student-signin' element={<StudentLogin />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/gallery' element={<Gallery />} />
    <Route path='/admin-signin' element={<AdminLogin />} />
    <Route element={<AdminPrivateRoute />}>
    <Route path='/admin-profile' element={<AdminProfile />} />
    <Route path='/student-details' element={<StudentDetails />} />
    <Route path='/add-student' element={<StudentAdmission />} />
    <Route path='/study-material' element={< StudyMaterial/>} />
    <Route path='/study-material-details' element={< MaterialDetails/>} />
    <Route path='/view-student/:prnNo' element={< StudentView/>} />

    </Route>
    <Route element={<StudentPrivateRoute />}>
    <Route path='/student-profile' element={<StudentProfile />} />
    <Route path='/student-study-material' element={<StudentStudyMaterial />} />

    </Route>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
