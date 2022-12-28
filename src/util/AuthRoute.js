import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ authenticated, element: Component, ...rest }) => {
	return !authenticated ? <Navigate to='/login' replace /> : <Component {...rest} />;
};

AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
