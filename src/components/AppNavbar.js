// Old practice in importing components
// import Navbar from 'react-bootstrap/NavBar';
// import Nav from 'react-bootstrap/Nav';

// New practice in importing components;
import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() {

	// useContext hook
	const { user } = useContext(UserContext);

	// getItem retrieves the data stored in the localStorage
	// const [user, setUser] = useState(localStorage.getItem("email"))
	console.log(user);

	return (

		<Navbar bg="light" expand="lg">
		    <Container fluid>
		      <Navbar.Brand as={Link} to="/">gitBootcamp</Navbar.Brand>
		      <Navbar.Toggle aria-controls="navbarScroll" />
		      <Navbar.Collapse id="navbarScroll">
		        <Nav className="ms-auto">
		          <Nav.Link as={Link} to="/" >Home</Nav.Link>
		          {
		          	(user.isAdmin)
		          	?
		          	<Nav.Link as={Link} to="/admin" >Admin Dashboard</Nav.Link>
		          	:
		          	<Nav.Link as={Link} to="/courses" >Course</Nav.Link>
		          }
		          { (user.id !== null) ?
		          		<Nav.Link as={Link} to="/logout" >Logout</Nav.Link>
		          		:
		          		<>
		          			<Nav.Link as={Link} to="/login" >Login</Nav.Link>
		          			<Nav.Link as={Link} to="/register" >Register</Nav.Link>
		          		</>
		          }
		          
		        </Nav>
		      </Navbar.Collapse>
		    </Container>
		  </Navbar>
	)
};