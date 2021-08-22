import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SUCCESS_MESSAGE_SIGNUP } from "../constants";
import { signup } from "../utilities/auth";

export default class Signup extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		error: "",
		open: false,
	};
	handleChange = (type) => (e) => {
		this.setState({
			[type]: e.target.value,
		});
	};
	formSubmit = (e) => {
		e.preventDefault();
		const signupValues = Object.fromEntries(new FormData(e.target));

		signup(signupValues).then((response) => {
			if (response.error) {
				this.setState({ error: response.error });
			} else {
				this.setState({ name: "", email: "", password: "", error: "", open: true });
			}
		});
	};

	render() {
		const { name, email, password, error, open } = this.state;
		return (
			<main className="container">
				<h2 className="mt-5 p-2 mb-5">Signup</h2>
				<h5 className="alert alert-danger" style={{ display: error ? "" : "none" }}>
					{error}
				</h5>
				<h5 className="alert alert-info" style={{ display: open ? "" : "none" }}>
					{SUCCESS_MESSAGE_SIGNUP}. Please <Link to="/signin">Signin</Link>
				</h5>
				<form onSubmit={this.formSubmit}>
					<section className="form-group">
						<label htmlFor="name" className="text-muted">
							Name
						</label>
						<input
							type="text"
							onChange={this.handleChange("name")}
							name="name"
							id="name"
							className="form-control"
							value={name}
							required
						/>
					</section>
					<section className="form-group">
						<label htmlFor="email" className="text-muted">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							onChange={this.handleChange("email")}
							className="form-control"
							value={email}
							required
						/>
					</section>
					<section className="form-group">
						<label htmlFor="password" className="text-muted">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							name="password"
							required
							onChange={this.handleChange("password")}
							className="form-control"
						/>
					</section>
					<button className="btn btn-raised btn-primary">Submit</button>
				</form>
			</main>
		);
	}
}
