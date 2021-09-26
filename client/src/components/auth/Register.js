import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}

		if (error === "User already exists") {
			setAlert(error, "danger");
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		passwordConf: "",
	});

	const { name, email, password, passwordConf } = user;

	const handleChange = (event) =>
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});

	const handleSubmit = (event) => {
		event.preventDefault();
		if (name === "" || email === "" || password === "") {
			setAlert("Please enter all fields.", "danger");
		} else if (password !== passwordConf) {
			setAlert("Passwords do not match.", "danger");
		} else {
			register({
				name,
				email,
				password,
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account
				<span className="text-primary px">Register</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="passwordConf">Confirm Password</label>
					<input
						type="password"
						name="passwordConf"
						value={passwordConf}
						onChange={handleChange}
					/>
				</div>
				<input
					type="submit"
					value="Register"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Register;
