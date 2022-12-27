import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnAuthRoute = ({ authenticated, children }) => {
	return authenticated ? <Navigate to='/' replace /> : children;
};

UnAuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(UnAuthRoute);
