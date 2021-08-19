import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { LOADING_TEXT } from "../constants";
import { authenticate, signin } from "../utilities/auth";

export default class Signin extends Component {
	state = {
		email: "",
		password: "",
		error: "",
		redirectToRefer: false,
		loading: false,
	};
	handleChange = (type) => (e) => {
		this.setState({
			[type]: e.target.value,
		});
	};

	formSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const signinValues = Object.fromEntries(new FormData(e.target));
		signin(signinValues).then((response) => {
			if (response.error) {
				this.setState({ error: response.error, loading: false });
			} else {
				authenticate(response, () => {
					this.setState({
						redirectToRefer: true,
					});
				});
			}
		});
	};

	render() {
		const { email, password, error, redirectToRefer, loading } = this.state;
		if (redirectToRefer) {
			return <Redirect to={`/`} />;
		}
		return (
			<main className="container">
				<h2 className="mt-5 p-2 mb-5">Signin</h2>
				<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
					{error}
				</div>
				{loading ? <div className="jumbotron text-center">{LOADING_TEXT}</div> : ""}
				<form onSubmit={this.formSubmit}>
					<section className="form-group">
						<label htmlFor="email" className="text-muted">
							Email
						</label>
						<input
							type="text"
							onChange={this.handleChange("email")}
							name="email"
							id="email"
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
