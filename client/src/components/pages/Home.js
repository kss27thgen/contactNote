import React from "react";
import ContactFilter from "../contacts/ContactFilter";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";

const Home = () => {
	return (
		<div className="grid-2">
			<div>
				<ContactFilter />
				<ContactForm />
			</div>
			<div>
				<Contacts />
			</div>
		</div>
	);
};

export default Home;
