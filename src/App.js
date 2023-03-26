import React, { Component } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Components
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import themeObject from "./util/theme";
import UnAuthRoute from "./util/UnAuthRoute";
import AuthRoute from "./util/AuthRoute";
import UseParams from "./util/UseParams";
// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discuss from "./pages/Discuss";
import DiscussNew from "./pages/DiscussNew";
import DiscussPage from "./pages/DiscussPage";
import Plan from "./pages/Plan";
import RelationNew from "./pages/RelationNew";
import RelationPage from "./pages/RelationPage";
import Company from "./pages/Company";
import Social from "./pages/Social";
import SocialPage from "./pages/SocialPage";

import axios from "axios";

axios.defaults.baseURL = "https://us-central1-jobdps-79841.cloudfunctions.net/api";

const theme = createTheme(themeObject);

const token = localStorage.RefreshToken;
if (token) {
	store.dispatch({ type: "SET_AUTHENTICATED" });
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	store.dispatch({ type: "GET_USER_DATA" });

	// if (decodedToken.exp * 1000 < Date.now()) {
	// 	store.dispatch(logoutUser()); // change to refresh user function
	// 	window.location.href = '/login';
	// } else {
	// }
}

class App extends Component {
	render () {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<NavBar />
						<div>
							<Switch>
								<Route exact path='/' element={<UnAuthRoute element={Home} redirect='/explore' />} />
								<Route exact path='/login' element={<UnAuthRoute element={Login} redirect='/' />} />
								<Route exact path='/signup' element={<UnAuthRoute element={Signup} redirect='/' />} />
								<Route exact path='/discuss' element={<Discuss />} />
								<Route exact path='/discuss/new' element={<AuthRoute element={DiscussNew} />} />
								<Route exact path='/discuss/:postId' element={<UseParams element={DiscussPage} />} />
								<Route exact path='/plan' element={<AuthRoute element={Plan} />} />
								<Route exact path='/plan/new' element={<AuthRoute element={RelationNew} />} />
								<Route exact path='/plan/:relationId' element={<AuthRoute element={RelationPage} />} />
								<Route exact path='/companies' element={<Company />} />

								<Route exact path='/social' element={<AuthRoute element={Social} />} />
								<Route exact path='/social/:postId' element={<UseParams element={SocialPage} />} />

								<Route path='*' to='/' />
							</Switch>
						</div>
						<Footer />
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
