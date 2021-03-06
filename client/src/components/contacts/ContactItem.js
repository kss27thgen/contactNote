import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { deleteContact, setCurrent, clearCurrent } = contactContext;

	const { _id, name, email, phone, type } = contact;

	const handleDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	const handleSetCurrent = () => {
		setCurrent(contact);
	};

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{name}{" "}
				<span
					style={{ float: "right" }}
					className={
						`badge ` +
						(type === "professional"
							? "badge-success"
							: "badge-primary")
					}
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>

			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope px" />
						{email}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone px" />
						{phone}
					</li>
				)}
			</ul>
			<p>
				<button
					className="btn btn-dark btn-sm"
					onClick={handleSetCurrent}
				>
					Edit
				</button>
				<button
					className="btn btn-danger btn-sm"
					onClick={handleDelete}
				>
					Delete
				</button>
			</p>
		</div>
	);
};

export default ContactItem;
