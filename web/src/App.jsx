import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from "./presenters/aboutPresenter";
import Home from "./presenters/homePresenter";
import  AboutProject  from "./presenters/aboutProjectPresenter"
import  LogIn from "./presenters/loginPresenter"


export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Navigate replace to="/home" />} />
					<Route exact path="/home" element={<Home />} />
					<Route exact path="/about" element={<About />} />
					<Route exact path="/aboutProject" element={< AboutProject  />} />
					<Route exact path="/login" element={< LogIn   />} />
			</Routes>

			</Router>
		);
	}
}
