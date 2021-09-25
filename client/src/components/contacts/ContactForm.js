import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, current, clearCurrent, updateContact } = contactContext;

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: "",
				email: "",
				phone: "",
				type: "personal",
			});
		}
	}, [contactContext, current]);

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});

	const { name, email, phone, type } = contact;

	const handleChange = (event) =>
		setContact({
			...contact,
			[event.target.name]: event.target.value,
		});

	const handleSubmit = (event) => {
		event.preventDefault();

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2 className="text-primary">
				{current ? "Edit Contact" : "Add Contact"}
			</h2>
			<input
				type="text"
				placeholder="Name"
				name="name"
				value={name}
				onChange={handleChange}
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={handleChange}
			/>
			<input
				type="text"
				placeholder="Phone number"
				name="phone"
				value={phone}
				onChange={handleChange}
			/>
			<div>
				<b>Contact Type</b>
			</div>
			<input
				type="radio"
				id="personal"
				name="type"
				value="personal"
				checked={type === "personal"}
				onChange={handleChange}
			/>{" "}
			<label htmlFor="personal">Personal</label>
			<span className="px-1"></span>
			<input
				type="radio"
				id="Professional"
				name="type"
				value="professional"
				checked={type === "professional"}
				onChange={handleChange}
			/>{" "}
			<label htmlFor="Professional">Professional</label>
			<div>
				<input
					type="submit"
					value={current ? "Update Contact" : "Add Contact"}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button
						className="btn btn-light btn-block"
						onClick={clearAll}
					>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
