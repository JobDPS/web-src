import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Loading from "../pages/Loading";

const AuthRoute = ({ authenticated, user, element: Component, ...rest }) => {
	return user.loading ? <Loading /> : !authenticated ? <Navigate to='/login' replace /> : <Component {...rest} />;
};

AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
	user: state.user
});

export default connect(mapStateToProps)(AuthRoute);
