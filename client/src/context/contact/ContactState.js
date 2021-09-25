import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import contactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: "Orita Yuka",
				email: "yuka@gmail.com",
				phone: "423532535r3",
				type: "professional",
			},
			{
				id: 2,
				name: "Ogata Haruna",
				email: "haruna@gmail.com",
				phone: "333333333333",
				type: "professional",
			},
			{
				id: 3,
				name: "Hidaka Airi",
				email: "airi@gmail.com",
				phone: "777777777777",
				type: "normal",
			},
		],
		current: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add contact
	const addContact = (contact) => {
		contact.id = uuid();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Set current contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear current contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Update contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	// Filter contact
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// Clear filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<contactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
