import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Logout() {

	// Consume the UserContext object and destructure it to access the setUser function and unsetUser function from the context provider.
	const { unsetUser, setUser } = useContext(UserContext);

	// Function to clear user's information from the localStorage
	unsetUser();

	useEffect(() => {
		setUser({id: null})
	}, [setUser])
	
	// clear() removes the data stored in the localStorage.
	// localStorage.clear();

	return (

		// Redirect / Navigate the user back to the Login page.
		<Navigate to="/"/>

	)
}