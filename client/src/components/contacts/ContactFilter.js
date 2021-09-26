import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const { filterContacts, clearFilter, filtered } = contactContext;

	const text = useRef("");

	useEffect(() => {
		if (filtered === null) {
			text.current.value = "";
		}
		// eslint-disable-next-line
	}, []);

	const handleChange = (e) => {
		if (text.current.value !== "") {
			filterContacts(e.target.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form>
			<input
				ref={text}
				type="text"
				placeholder="Filter Contacts..."
				onChange={handleChange}
			/>
		</form>
	);
};

export default ContactFilter;
