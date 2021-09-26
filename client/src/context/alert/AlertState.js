import { useReducer } from "react";
import AlertContext from "./AlertContext";
import alertReducer from "./AlertReduer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import { v4 as uuid } from "uuid";

const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(alertReducer, initialState);

	// Set alert
	const setAlert = (msg, type, tymeout = 5000) => {
		const id = uuid();
		dispatch({
			type: SET_ALERT,
			payload: { msg, type, id },
		});

		setTimeout(
			() => dispatch({ type: REMOVE_ALERT, payload: id }),
			tymeout,
		);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
