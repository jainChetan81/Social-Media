import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./core/Profile";
import User from "./user/User";

function MainRouter() {
	return (
		<div>
			<Menu />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/users" component={User} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/signin" component={Signin} />
				<Route exact path="/user/:userId" component={Profile} />
			</Switch>
		</div>
	);
}

export default MainRouter;
