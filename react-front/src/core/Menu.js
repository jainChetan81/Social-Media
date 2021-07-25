import React from "react";
import { Link } from "react-router-dom";

function Menu() {
	return (
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item active">
				<Link className="nav-link" to="/">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin">
					Signin
				</Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signup">
					Signup
				</Link>
			</li>
		</ul>
	);
}

export default Menu;
