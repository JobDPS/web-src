import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route {...rest} element={(props) => (authenticated === false ? <Route to='/login' /> : <Component {...props} key={props.match.params.name} />)} />
    // TODO: Change above key
);

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
	user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);