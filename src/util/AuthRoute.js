import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ authenticated, children }) => {
	return !authenticated ? <Navigate to='/login' replace /> : children;
};

AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
