import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import AppNavbar from './AppNavbar';

// Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

/*const name = "Yoby Fernandez";

const student = {
  firstName: "Paul",
  lastName: "Galela"
}

function userName(user) {
  return user.firstName + ' ' + user.lastName
}

const element = <h1>Hello, {userName(student)}</h1>

root.render(element)*/