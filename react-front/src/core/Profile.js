import React, { Component } from "react";
import { isAuthenticated } from "../utilities/isAuthenticated";
export class Profile extends Component {
	state = {
		user: "",
		redirectToSign: false,
	};
	componentDidMount() {
		// console.log("user id from params", this.props.match.params.userId);
	}

	render() {
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				<p>Hello {isAuthenticated().user.name ?? "Guest"}</p>
				<p>Hello {isAuthenticated().user.email ?? "'test@test.com'"}</p>
			</div>
		);
	}
}

export default Profile;
