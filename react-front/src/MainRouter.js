import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./core/Profile";
import User from "./user/User";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./utilities/PrivateRoute";

function MainRouter() {
	return (
		<div>
			<Menu />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/users" component={User} />
				<Route exact path="/user/:userId" component={Profile} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/signin" component={Signin} />
				<PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
			</Switch>
		</div>
	);
}

export default MainRouter;
