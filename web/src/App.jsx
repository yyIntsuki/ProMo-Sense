import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import About from "./presenters/aboutPresenter";
import Home from "./presenters/homePresenter";

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<Routes>
					<Route path="/" element={<Navigate replace to="/about" />} />
					<Route exact path="/home" element={<Home />} />
					<Route exact path="/about" element={<About />} />
				</Routes>
			</Router>
		);
	}
}
