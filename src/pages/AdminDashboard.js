import { useContext, useState, useEffect } from "react";
import {Table, Button} from "react-bootstrap";
import {Navigate, Link} from "react-router-dom";
import UserContext from "../UserContext";

import Swal from "sweetalert2";

export default function AdminDashboard(){

	// to validate the user role.
	const {user} = useContext(UserContext);

	//Create allCourses State to contain the courses from the database.
	const [allCourses, setAllCourses] = useState([]);

	//"fetchData()" wherein we can invoke if their is a certain change with the course.
	const fetchData = () =>{
		// Get all courses in the database
		fetch(`${process.env.REACT_APP_API_URL}/courses/all`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			setAllCourses(data.map(course => {
				return(
					<tr key={course._id}>
						<td>{course._id}</td>
						<td>{course.name}</td>
						<td>{course.description}</td>
						<td>{course.price}</td>
						{/*<td>{course.slots}</td>*/}
						<td>{course.isActive ? "Active" : "Inactive"}</td>
						<td>
							{
								// We use conditional rendering to set which button should be visible based on the course status (active/inactive)
								(course.isActive)
								?	
								 	// A button to change the course status to "Inactive"
									<Button variant="danger" size="sm" onClick ={() => archive(course._id, course.name)}>Archive</Button>
								:
									<>
										{/* A button to change the course status to "Active"*/}
										<Button variant="success" size="sm" onClick ={() => unarchive(course._id, course.name)}>Unarchive</Button>
										{/* A button to edit a specific course*/}
										<Button as={ Link } to={`/editCourse/${course._id}`} variant="secondary" size="sm" className="m-2" >Edit</Button>
									</>
							}
						</td>
					</tr>
				)
			}))

		})
	}

	//Making the course inactive
	const archive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`${process.env.REACT_APP_API_URL}/courses/archive/${courseId}`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: false
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Archive Succesful!",
					icon: "success",
					text: `${courseName} is now inactive.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Archive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}

	//Making the course active
	const unarchive = (courseId, courseName) =>{
		console.log(courseId);
		console.log(courseName);

		fetch(`${process.env.REACT_APP_API_URL}/courses/active/${courseId}`,{
			method: "PUT",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(res => res.json())
		.then(data =>{
			console.log(data);

			if(data){
				Swal.fire({
					title: "Unarchive Succesful!",
					icon: "success",
					text: `${courseName} is now active.`
				})
				fetchData();
			}
			else{
				Swal.fire({
					title: "Unarchive Unsuccessful!",
					icon: "error",
					text: `Something went wrong. Please try again later!`
				})
			}
		})
	}

	// To fetch all courses in the first render of the page.
	useEffect(()=>{
		// invoke fetchData() to get all courses.
		fetchData();
	}, [])

	return(
		(user.isAdmin)
		?
		<>
			<div className="mt-5 mb-3 text-center">
				<h1>Admin Dashboard</h1>
				{/*A button to add a new course*/}
				<Button as={Link} to="/addCourse" variant="primary" size="lg" className="mx-2">Add Course</Button>
				<Button variant="success" size="lg" className="mx-2">Show Enrollments</Button>
			</div>
			<Table striped bordered hover>
		     <thead>
		       <tr>
		         <th>Course ID</th>
		         <th>Course Name</th>
		         <th>Description</th>
		         <th>Price</th>
		         {/*<th>Slots</th>*/}
		         <th>Status</th>
		         <th>Action</th>
		       </tr>
		     </thead>
		     <tbody>
		       { allCourses }
		     </tbody>
		   </Table>
		</>
		:
		<Navigate to="/courses" />
	)
}