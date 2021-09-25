import React, { useContext } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Contacts() {
	const contactContext = useContext(ContactContext);

	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return <h4>Please add a contact.</h4>;
	}

	return (
		<>
			<TransitionGroup>
				{filtered !== null
					? filtered.map((contact) => (
							<CSSTransition
								classNames="item"
								key={contact.id}
								timeout={500}
							>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))
					: contacts.map((contact) => (
							<CSSTransition
								classNames="item"
								key={contact.id}
								timeout={500}
							>
								<ContactItem contact={contact} />
							</CSSTransition>
					  ))}
			</TransitionGroup>
		</>
	);
}
