import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import setAuthToken from "./util/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<>
							<Navbar />
							<div className="py-3 container">
								<Alert />
								<Switch>
									<PrivateRoute
										exact
										path="/"
										component={Home}
									/>
									<Route
										exact
										path="/about"
										component={About}
									/>
									<Route
										exact
										path="/register"
										component={Register}
									/>
									<Route
										exact
										path="/login"
										component={Login}
									/>
								</Switch>
							</div>
						</>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
