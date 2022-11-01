import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function CourseView() {

	// useContext hook for global state
	const { user } = useContext(UserContext)

	// Allows us to gain access to methods that will allo us to redirect a user to a different page after enrolling in a course. 
	const navigate = useNavigate(); //useHistory

	// The "useParams" hook allows us to retrieve the courseId passed via URL
	const { courseId } = useParams();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);


	const enroll = (courseId) => {

		fetch(`${process.env.REACT_APP_API_URL}/users/enroll`, {
			method: "POST",
			headers: {
				'Content-Type': "application/json",
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data)

			if(data === true) {
				Swal.fire({
				title: "Successfully Enrolled!",
				icon: "success",
				text: "You have successfully enrolled for this course."
			})

			navigate("/courses");

		} else {

				Swal.fire({
				title: "Something went wrong",
				icon: "error",
				text: "Please try again."
			})
		}

	})

};


	useEffect(() => {
		console.log(courseId);

		fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})

	}, [courseId])

	return (

		<Container>
			<Row>
			  <Col lg={{span:6, offset:3}}>
			    <Card className="courseCard my-3">
			        <Card.Body>
			          <Card.Title>{name}</Card.Title>
			          <Card.Subtitle>Description:</Card.Subtitle>
			          <Card.Text>{description}</Card.Text>
			          <Card.Subtitle>Price:</Card.Subtitle>
			          <Card.Text>{price}</Card.Text>
			          <Card.Subtitle>Class Schedule:</Card.Subtitle>
			          <Card.Text>5:30PM - 9:30PM</Card.Text>
			          <div className="d-grip gap-2">
			          {
			          		(user.id !== null) ?
			          			<Button className="bg-primary" onClick={() => enroll(courseId)}>Enroll</Button>
			          			:
			          			<Button className="bg-primary" as={Link} to="/login">Log in to Enroll</Button>
			          }
			          </div>
			          </Card.Body>
			      </Card> 
			  </Col>
			</Row>
		</Container>

	)

}