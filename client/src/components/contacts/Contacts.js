import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

export default function Contacts() {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>Please add a contact.</h4>;
	}

	return (
		<>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition
									classNames="item"
									key={contact._id}
									timeout={500}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition
									classNames="item"
									key={contact._id}
									timeout={500}
								>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</>
	);
}
