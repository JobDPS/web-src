import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnAuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route {...rest} element={(props) => (authenticated === true ? <Route to='/' /> : <Component {...props} />)} />
);

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

UnAuthRoute.propTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps)(UnAuthRoute);
