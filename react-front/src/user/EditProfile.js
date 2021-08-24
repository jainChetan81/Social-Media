import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LOADING_TEXT } from "../constants";
import { photo, read, update } from "../core/apiUser";
import { isAuthenticated } from "../utilities/auth";
import avatar from "../assets/images/avatar.png";

// import { removeFalsyObject } from "../utilities/objManipulation";

class EditProfile extends Component {
	state = {
		id: "",
		name: "",
		email: "",
		password: "",
		photoUrl: "",
		redirectToProfile: false,
		error: "",
		loading: false,
	};

	componentDidMount() {
		this.userData = new FormData();
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	init = (userId) => {
		const token = isAuthenticated().token;
		read(userId, token)
			.then((user) => {
				this.setState({
					id: user._id,
					name: user.name,
					email: user.email,
					error: "",
					loading: false,
				});
			})
			.catch((error) => {
				this.setState({ redirectToProfile: true, error });
			});
	};

	handleChange = (type) => (e) => {
		this.setState({ error: "" });
		const value = type === "photo" ? e.target.files[0] : e.target.value;
		const fileSize = type === "photo" ? e.target.files[0].size : 0;
		this.userData.set(type, value);
		this.setState({ [type]: value, fileSize });
	};

	isValid = () => {
		const { name, email, password, fileSize } = this.state;
		if (fileSize > 200000) {
			this.setState({ error: "File size should be less than 200kb", loading: false });
			return false;
		}
		if (name.length === 0) {
			this.setState({ error: "Name is required", loading: false });
			return false;
		}

		if (!/^\w+([.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			this.setState({
				error: "A valid Email is required",
				loading: false,
			});
			return false;
		}
		if (password.length >= 1 && password.length <= 5) {
			this.setState({
				error: "Password must be at least 6 characters long",
				loading: false,
			});
			return false;
		}
		return true;
	};

	getUserImage = () => {
		const userId = this.props.match.params.userId;
		const photoUrl = photo(userId) || avatar;
		return photoUrl;
	};

	editFormSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		if (this.isValid()) {
			const token = isAuthenticated().token;
			const userId = this.props.match.params.userId;
			update(userId, token, this.userData).then((response) => {
				if (response.error)
					this.setState({ error: response.error._message || response.error });
				else this.setState({ redirectToProfile: true, loading: false });
			});
		}
	};

	render() {
		const { name, email, password, redirectToProfile, id, error, loading } = this.state;
		if (redirectToProfile) {
			return <Redirect to={`/user/${id}`} />;
		}

		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Edit Profile</h2>
				<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
					{error}
				</div>
				{loading && <div className="jumbotron text-center">{LOADING_TEXT}</div>}
				<img
					height="200px"
					width="200px"
					className="img-thumbnail"
					src={this.getUserImage()}
					alt={`${name}'s profile`}
				/>

				<form onSubmit={this.editFormSubmit}>
					<section className="form-group">
						<label htmlFor="photo" className="text-muted">
							Profile Photo
						</label>
						<input
							type="file"
							accept="image/*"
							onChange={this.handleChange("photo")}
							name="photo"
							id="photo"
							className="form-control"
						/>
					</section>
					<section className="form-group">
						<label htmlFor="nameEdit" className="text-muted">
							New Name
						</label>
						<input
							type="text"
							onChange={this.handleChange("name")}
							name="name"
							autoComplete="new-name"
							id="nameEdit"
							className="form-control"
							value={name}
						/>
					</section>
					<section className="form-group">
						<label htmlFor="emailEdit" className="text-muted">
							New Email
						</label>
						<input
							type="email"
							id="emailEdit"
							autoComplete="new-email"
							name="email"
							onChange={this.handleChange("email")}
							className="form-control"
							value={email}
						/>
					</section>
					<section className="form-group">
						<label htmlFor="passwordEdit" className="text-muted">
							Password
						</label>
						<input
							type="password"
							id="passwordEdit"
							autoComplete="new-password"
							value={password}
							name="password"
							onChange={this.handleChange("password")}
							className="form-control"
						/>
					</section>
					<button className="btn btn-raised btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}
export default EditProfile;
