import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	// State hooks to store the values of the input fields
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password1, setPassword1] = useState("");
	const [password2, setPassword2] = useState("");

	// State to determine whether the submit button is enabled or disabled
	// Conditional rendering
	const [isActive, setIsActive] = useState(false);

	// console.log(firstName);
	// console.log(lastName);
	// console.log(email);
	// console.log(mobileNo);
	// console.log(password1);
	// console.log(password2);

	function registerUser (e) {

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if (data === true) {

				Swal.fire({
					title: "Duplicate Email Found",
					icon: "error",
					text: "Kindly provide another email to complete registration."
				})
			} else {

				fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data)

					if(data === true) {

						// Clear input fields
						setFirstName("");
						setLastName("")
						setEmail("");
						setMobileNo("");
						setPassword1("");
						setPassword2("");

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Welcome to Zuitt!"
						})

						navigate("/login");

					} else {

						Swal.fire({
							title: "Something went wrong",
							icon: "error",
							text: "Please, try again."
						})
					}

				})
			}
		})


		// alert("Thank you for registering!")
	}


	useEffect(() => {
		if((firstName !== "" && lastName !== "" && mobileNo.length === 11 && email !== "" && password1 !== "" && password2 !== "") && (password1 === password2)) {

			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [firstName, lastName, email, mobileNo, password1, password2])


	return(

		(user.id !== null) ?
			<Navigate to="/courses"/>

			:

			<Form onSubmit={(e) => registerUser(e)} >

				  <h1 className="text-center my-3">Registration</h1>

				  <Form.Group className="mb-3" controlId="firstName">
				    <Form.Label>First Name</Form.Label>
				    <Form.Control 
				    	type="text"
				    	value={firstName}
				    	onChange={(e) => {setFirstName(e.target.value)}}
				    	placeholder="Enter your First Name" 
				    	required
				    	/>
				  </Form.Group>

				  <Form.Group className="mb-3" controlId="lastName">
				    <Form.Label>Last Name</Form.Label>
				    <Form.Control 
				    	type="text"
				    	value={lastName}
				    	onChange={(e) => {setLastName(e.target.value)}}
				    	placeholder="Enter your Last Name" />
				  </Form.Group>

			      <Form.Group className="mb-3" controlId="userEmail">
			        <Form.Label>Email address</Form.Label>
			        <Form.Control 
			        	type="email"
			        	value={email}
			        	onChange={(e) => {setEmail(e.target.value)}}
			        	placeholder="Enter email" />
			        <Form.Text className="text-muted">
			          We'll never share your email with anyone else.
			        </Form.Text>
			      </Form.Group>

			      <Form.Group className="mb-3" controlId="mobileNo">
			        <Form.Label>Mobile Number</Form.Label>
			        <Form.Control 
			        	type="text"
			        	value={mobileNo}
			        	onChange={(e) => {setMobileNo(e.target.value)}}
			        	placeholder="0999999999" />
			      </Form.Group>

			      <Form.Group className="mb-3" controlId="password1">
			        <Form.Label>Password</Form.Label>
			        <Form.Control 
			        	type="password" 
			        	value={password1}
			        	onChange={(e) => {setPassword1(e.target.value)}}
			        	placeholder="Enter Your Password" />
			      </Form.Group>

			      <Form.Group className="mb-3" controlId="password2">
			        <Form.Label>Verify Password</Form.Label>
			        <Form.Control 
			        	type="password" 
			        	value={password2}
			        	onChange={(e) => {setPassword2(e.target.value)}}
			        	placeholder="Verify Your Password" />
			      </Form.Group>
			      { isActive ?
			      			<Button variant="primary" type="submit" id="submitBtn">
			      		 	 Submit
			      			</Button>
			      			:
			      			<Button variant="primary" type="submit" id="submitBtn" disabled>
			      			  Submit
			      			</Button>
			      }
			     
			    </Form>	
		

	)
}