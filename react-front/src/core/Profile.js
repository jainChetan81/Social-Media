import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../utilities/isAuthenticated";
export class Profile extends Component {
	state = {
		user: {},
		redirectToSign: false,
	};
	componentDidMount() {
		const userID = this.props.match.params.userId;
		fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${isAuthenticated().token}`,
			},
		})
			.then((response) => response.json())
			.then((user) => {
				this.setState({
					user: user,
				});
			})
			.catch((error) => {
				this.setState({ redirectToSign: true });
			});
	}

	render() {
		const { user, redirectToSign } = this.state;
		if (redirectToSign || user.error) {
			return <Redirect to="/signin" />;
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				<p>Hello {isAuthenticated().user?.name ?? "Guest"}</p>
				<p>Hello {isAuthenticated().user?.email ?? "'test@test.com'"}</p>
				<p>Joined {new Date(user?.created).toDateString() ?? "No Date"}</p>
			</div>
		);
	}
}

export default Profile;
