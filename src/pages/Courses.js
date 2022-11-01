// import coursesData from '../data/coursesData';
import { Fragment, useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import UserContext from '../UserContext';


export default function Courses() {

	//State tha will be used to store the courses retrieved form the database
	const [courses, setCourses] = useState([]);

	// console.log(coursesData);
	// console.log(coursesData[0]);

	 // To be use for validating the "role" of the user.
	const {user} = useContext(UserContext);

	//Retrieve the courses from the database upon initial render of the Course component.
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/courses/`)
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setCourses(data.map(course => {
				return (
					<CourseCard  key={course._id} courseProp={course} />
				)
			}))

		})
	}, [])	


	// const courses = coursesData.map(course => {
	// 	return (
	// 		<CourseCard  key={course.id} courseProp={course} />
	// 	)
	// })

	return (
		(user.isAdmin)
		?
			<Navigate to="/admin"/>
		:
			<Fragment>
				<h1 className="text-center my-3">Courses</h1>
				{courses}
			</Fragment>
	)
}

// Props
	// is a shorthand for property since components are considered as object in ReactJS.
	// Props is a way to pass data from the parent to child component.
	// it is synonymous to the function parameter.