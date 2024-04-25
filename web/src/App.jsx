import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/headerNav";
import Footer from "./components/footerNav";
import Team from "./presenters/teamPresenter";
import ProMoSense from "./presenters/appPresenter";
import Project from "./presenters/projectPresenter";
import  LogInForApp from "./presenters/loginPresenter"

import LogInForApp from "./presenters/LoginRedirectApp";


export default function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<ProMoSense />} />
				<Route exact path="/team" element={<Team />} />
				<Route exact path="/project" element={<Project />} />
				<Route exact path="/login" element={< LogInForApp />} />

			</Routes>
			<Footer />
		</Router>
	);
}
