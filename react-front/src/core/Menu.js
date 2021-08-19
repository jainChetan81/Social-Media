import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../utilities/auth";

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: "#ff9900" };
	else return { color: "#ffffff", backgroundColor: "transparent" };
};

function Menu({ history }) {
	return (
		<header>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item active">
					<Link className="nav-link" style={isActive(history, "/")} to="/">
						Home
					</Link>
				</li>
				<li className="nav-item active">
					<Link className="nav-link" style={isActive(history, "/users")} to="/users">
						Users
					</Link>
				</li>
				{!isAuthenticated() ? (
					<>
						<li className="nav-item">
							<Link
								className="nav-link"
								style={isActive(history, "/signin")}
								to="/signin">
								Signin
							</Link>
						</li>
						<li className="nav-item">
							<Link
								className="nav-link"
								style={isActive(history, "/signup")}
								to="/signup">
								Signup
							</Link>
						</li>
					</>
				) : (
					<>
						<li className="nav-item">
							<button
								className="nav-link"
								style={isActive(history, "/signout")}
								onClick={() => signout(() => history.push("/"))}>
								Sign Out
							</button>
						</li>
						<li className="nav-item">
							<Link
								to={`/user/${isAuthenticated().user._id}`}
								style={isActive(history, `/user/${isAuthenticated().user._id}`)}
								className="nav-link">
								{isAuthenticated().user.name}'s profile
							</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}

export default withRouter(Menu);
