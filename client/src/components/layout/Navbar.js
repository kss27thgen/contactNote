import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearContacts } = contactContext;

	const handleLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<>
			<li>
				<b
					style={{
						fontFamily: "fantasy",
					}}
				>
					I'm
					<span style={{ textDecoration: "underline" }}>
						<Link to="/">{user && user.name}</Link>
					</span>
				</b>
			</li>
			<li>
				<Link to="/about">About</Link>
			</li>
			<li>
				<a href="#!" onClick={handleLogout}>
					<i className="fas fa-sign-out-alt" />
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</>
	);

	const gestLinks = (
		<>
			<li>
				<Link to="/about">About</Link>
			</li>
			<li>
				<Link to="/register">Regiser</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</>
	);

	return (
		<div className="navbar bg-primary">
			<Link to="/">
				<h1>
					<i className={icon} /> {title}
				</h1>
			</Link>

			<ul>{isAuthenticated ? authLinks : gestLinks}</ul>
		</div>
	);
};

Navbar.defaultProps = {
	title: "Contact Note",
	icon: "fas fa-id-card-alt",
};

export default Navbar;
