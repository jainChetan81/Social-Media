import React, { Component } from "react";
import { list } from "../core/apiUser";
import { Link } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

class User extends Component {
	state = {
		users: [],
	};
	componentDidMount() {
		list().then((res) => {
			if (res.error) console.error(res.error);
			else this.setState({ users: res });
		});
	}
	renderUsers = (users) => (
		<div className="row">
			{users.map((user) => (
				<div
					className="card col-md-4 mx-auto col-sm-6"
					style={{ width: "18rem" }}
					key={user._id}>
					<img src={avatar} className="card-img-top" alt={`Card for user ${user.name}`} />
					<div className="card-body">
						<h5 className="card-title">{user.name}</h5>
						<p className="card-text">{user.email}</p>
						<Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">
							View Profile
						</Link>
					</div>
				</div>
			))}
		</div>
	);

	render() {
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Users</h2>
				{this.renderUsers(this.state.users)}
			</div>
		);
	}
}
export default User;
