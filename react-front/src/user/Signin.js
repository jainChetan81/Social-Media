import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import { setInStorage } from "../storage/sessionStorage";
import { LOADING_TEXT } from "../constants";

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

	authenticate = (jwt, next) => {
		if (typeof window !== "undefined") {
			setInStorage("jwt", jwt);
			next();
		}
	};

	formSubmit = (e) => {
		e.preventDefault();
		this.setState({ loading: true });
		const signinForm = Object.fromEntries(new FormData(e.target));
		fetch("http://localhost:8080/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(signinForm),
		})
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.error) {
					this.setState({ error: response.error, loading: false });
				} else {
					this.authenticate(response, () => {
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
			<div className="container">
				<h2 className="mt-5 p-2 mb-5">Signin</h2>
				<div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
					{error}
				</div>
				{loading ? <div className="jumbotron text-center">{LOADING_TEXT}</div> : ""}
				<form onSubmit={this.formSubmit}>
					<div className="form-group">
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
					</div>
					<div className="form-group">
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
					</div>
					<button className="btn btn-raised btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}
