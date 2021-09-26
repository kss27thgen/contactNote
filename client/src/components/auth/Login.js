import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { loginUser, error, clearErrors, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push("/");
		}

		if (error === "Invalid credentials") {
			setAlert(error, "danger");
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const { email, password } = user;

	const handleChange = (event) =>
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});

	const handleSubmit = (event) => {
		event.preventDefault();
		if (email === "" || password === "") {
			setAlert("Please fill in all fields.", "danger");
		} else {
			loginUser({
				email,
				password,
			});
		}
	};

	return (
		<div className="form-container">
			<h1>
				Account
				<span className="text-primary px">Login</span>
			</h1>
			<form onSubmit={handleSubmit}>
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
				<input
					type="submit"
					value="Login"
					className="btn btn-primary btn-block"
				/>
			</form>
		</div>
	);
};

export default Login;
