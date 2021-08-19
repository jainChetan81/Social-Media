import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ACCOUNT_DELETED, DELETE_ACCOUNT_POPUP } from "../constants";
import { remove } from "../core/apiUser";
import { isAuthenticated, signout } from "../utilities/auth";

class DeleteUser extends Component {
	state = {
		redirect: false,
	};

	deleteAccountConfirmed() {
		const token = isAuthenticated().token;
		const userId = this.props.userId;
		remove(userId, token).then((data) => {
			if (data.error) console.error(data.error);
			else {
				//TODO: signout user and redirect to login page
				signout(() => console.log(ACCOUNT_DELETED));
				this.setState({ redirect: true });
			}
		});
	}
	deleteConfirm = () => {
		const answer = window.confirm(DELETE_ACCOUNT_POPUP);
		answer && this.deleteAccountConfirmed();
	};
	render() {
		if (this.state.redirect) return <Redirect to="/" />;
		return (
			<button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">
				Delete Profile
			</button>
		);
	}
}
export default DeleteUser;
