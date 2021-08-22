import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../utilities/auth";
import { read } from "./apiUser";
import avatar from "../assets/images/avatar.png";
import DeleteUser from "../user/DeleteUser";
export class Profile extends Component {
	state = {
		user: {},
		redirectToSign: false,
	};
	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	init = (userId) => {
		const token = isAuthenticated().token;
		read(userId, token)
			.then((user) => {
				this.setState({
					user: user,
				});
			})
			.catch((error) => {
				this.setState({ redirectToSign: true });
			});
	};
	componentWillReceiveProps(nextProps) {
		const userId = nextProps.match.params.userId;
		this.init(userId);
	}

	render() {
		const { user, redirectToSign } = this.state;
		if (redirectToSign || user?.error) {
			return <Redirect to="/signin" />;
		}
		return (
			<main className="container">
				<h2 className="mt-5 mb-5">Profile</h2>
				<div className="row">
					<div className="col-md-6">
						<img
							style={{ maxWidth: "300px" }}
							src={avatar}
							className="card-img-top"
							alt={`Card for user ${user.name}`}
						/>
					</div>
					<div className="col-md-6">
						<div className="lead mt-2">
							<p>Hello {user?.name ?? "Guest"}</p>
							<p>Hello {user?.email ?? "'test@test.com'"}</p>
							<p>Joined {new Date(user?.created).toDateString() ?? "No Date"}</p>
						</div>

						{isAuthenticated().user && isAuthenticated().user._id === user._id && (
							<div className="d-inline-block mt-5">
								<Link
									to={`/user/edit/${user._id}`}
									className="btn btn-raised btn-success mr-5">
									Edit Profile
								</Link>
								<DeleteUser userId={user._id} />
							</div>
						)}
					</div>
				</div>
			</main>
		);
	}
}

export default Profile;
