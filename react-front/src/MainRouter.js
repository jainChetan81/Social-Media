import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";

function MainRouter() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signup" component={Signup} />
			</Switch>
		</div>
	);
}

export default MainRouter;
