import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

	// This allows us to consume the UserContext object and its properties to be used for validation.
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);



	function loginUser (e) {

		
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password

			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);
			console.log(data.access);

			if(typeof data.access !== "undefined") {
				localStorage.setItem('token',  data.access);
				retrieveUserDetails(data.access)

				Swal.fire({
					title: "Login Successful",
					icon: "success",
					text: "Welcome to gitBootcamp!"
				})
			} else {

				Swal.fire({
					title: "Authentication Failed",
					icon: "error",
					text: "Please, check your login details and try again."
				})
			}
		})


		setEmail("");
		setPassword("");

		// console.log(`${email} has been verified! Welcome back!`)
		// alert("You are now logged in. Thank you!")
	}

	const retrieveUserDetails = (token) => {

		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${ token }`
			}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data)
			// Global state
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})

	};


	useEffect(() => {
		if(email !== "" && password !== "" )  {

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [email, password])


	return(

		(user.id !== null) ?
			<Navigate to="/courses"/>
		:
			<Form onSubmit={(e) => loginUser(e)} >

				  <h1 className="text-center my-3">Login</h1>

			      <Form.Group className="mb-3" controlId="userEmail">
			        <Form.Label>Email address</Form.Label>
			        <Form.Control 
			        	type="email"
			        	value={email}
			        	onChange={(e) => {setEmail(e.target.value)}}
			        	placeholder="Enter email" />
			      </Form.Group>

			      <Form.Group className="mb-3" controlId="password1">
			        <Form.Label>Password</Form.Label>
			        <Form.Control 
			        	type="password" 
			        	value={password}
			        	onChange={(e) => {setPassword(e.target.value)}}
			        	placeholder="Enter Your Password" />
			      </Form.Group>
			      { isActive ?
			      			<Button variant="primary" type="submit" id="submitBtn">
			      		 	 Submit
			      			</Button>
			      			:
			      			<Button variant="danger" type="submit" id="submitBtn" disabled>
			      			  Submit
			      			</Button>
			      }
			     
			    </Form>
	)
}