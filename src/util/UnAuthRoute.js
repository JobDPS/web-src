import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnAuthRoute = ({ authenticated, element: Component, ...rest }) => {
	return authenticated ? <Navigate to='/' replace /> : <Component {...rest} />;
};

UnAuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(UnAuthRoute);
