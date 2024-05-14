import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/userContext';
import Header from './components/headerNav';
import Footer from './components/footerNav';
import ProMoSense from './pages/promosense';
import Team from './pages/team';
import Project from './pages/project';

export default function App() {
	return (
		<Router>
			<UserProvider>
				<Header />
				<Routes>
					<Route path='/' element={<ProMoSense />} />
					<Route exact path='/team' element={<Team />} />
					<Route exact path='/project' element={<Project />} />
				</Routes>
				<Footer />
			</UserProvider>
		</Router>
	);
}
