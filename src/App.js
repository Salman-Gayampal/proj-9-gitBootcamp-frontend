// react components/ dependencies
// import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
// components
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
// pages
import AddCourse from './pages/AddCourse';
import AdminDashboard from './pages/AdminDashboard';
import Courses from './pages/Courses';
import CourseView from './pages/CourseView'
import EditCourse from './pages/EditCourse';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import './App.css';
import { UserProvider } from './UserContext';

function App() {


  // State hook for the user state that is defined here for a global scope
  // Initialized as an object with properties from the localStorage
  // This will be used to store the user information and will be used for validating if a user is logged in on the app of not.
  const [user, setUser] = useState({
    // email: localStorage.getItem("email")
    // Initial state
    id: null,
    isAdmin: null
  });

  // Function fo clearing the localStorage upon logout.
  const unsetUser = () => {
    localStorage.clear();
  }


  // This side effect is triggered by once the user signs in
  useEffect(() => {

      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: { //get the token from the localstorage to access user details
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {

          // user is logged in
          if(typeof data._id !== "undefined") {
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
          } else { // user is logged out

            setUser({
              id: null,
              isAdmin: null
            })

          }
      })

  }, []);


  return (

    <UserProvider value={{user, setUser, unsetUser}} >
        <Router>
            <AppNavbar/>
            <Container>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/admin" element={<AdminDashboard/>} />
                  <Route path="/addCourse" element={<AddCourse/>} />
                  <Route path="/editCourse/:courseId" element={<EditCourse/>} />
                  <Route path="/courses" element={<Courses/>} />
                  <Route path="/courses/:courseId" element={<CourseView/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/logout" element={<Logout/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="*" element={<Error/>} />
              </Routes>
            </Container>
        </Router>
    </UserProvider>
    
  );
}

export default App;
