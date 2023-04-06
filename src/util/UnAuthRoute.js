import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Loading from "../pages/Loading";

const UnAuthRoute = ({ authenticated, user, element: Component, redirect, ...rest }) => {
	return authenticated ? <Navigate to={redirect} replace /> : <Component {...rest} />;
};

UnAuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	user: state.user
});

export default connect(mapStateToProps)(UnAuthRoute);
