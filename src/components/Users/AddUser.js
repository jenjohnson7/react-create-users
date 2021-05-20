import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import classes from './AddUser.module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

const AddUser = props => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState(); // initially a null object

	const addUserHandler = (event) => {
		event.preventDefault();

		// nameInputref.current holds actual "native" DOM node. don't manipulate this.
		const enteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;

		if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0){
			setError({
				title: "Invalid input",
				message: "Please enter a valid name and age."
			});
			return;
		}

		if (+enteredUserAge < 1){
			setError({
				title: "Invalid age",
				message: "Please enter a valid (positive) age."
			});
			return;
		}

		props.onAddUser(enteredName, enteredUserAge);

		// reset value entered by user (native DOM node). don't do this usually.
		nameInputRef.current.value = '';
		ageInputRef.current.value = '';
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<>
		{error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}

		<Card className={classes.input}>
		<form onSubmit={addUserHandler}>
			<label htmlFor="username">Username</label>
			<input
				id="username"
				type="text"
				ref={nameInputRef} />

			<label htmlFor="age">Age (Years)</label>
			<input
				id="age"
				type="number"
				ref={ageInputRef} />

			<Button type="submit">Add User </Button>
		</form>
		</Card>
		</>
	);
};

export default AddUser;
