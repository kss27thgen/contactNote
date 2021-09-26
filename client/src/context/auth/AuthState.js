import { useReducer } from "react";
import authContext from "./AuthContext";
import authReducer from "./AuthReducer";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from "../types";
import axios from "axios";
import setAuthToken from "../../util/setAuthToken";

const AuthState = (props) => {
	const initialState = {
		user: null,
		token: localStorage.getItem("token"),
		isAuthenticated: null,
		loading: true,
		error: null,
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Load user
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get("/api/auth");
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: AUTH_ERROR,
			});
		}
	};

	// Register user
	const register = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/users", formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg,
			});
		}
	};

	// Login user
	const loginUser = async (formData) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/auth", formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			loadUser();
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.msg,
			});
		}
	};

	// Logout
	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	// Clear errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<authContext.Provider
			value={{
				user: state.user,
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				error: state.error,
				loadUser,
				register,
				loginUser,
				logout,
				clearErrors,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
