import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Input from '@mui/material/Input';

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "column"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	intro: {
		backgroundColor: "#00252e",
		padding: theme.spacing(24),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(3)
	},
	billboard: {
		color: theme.palette.primary.contrastText,
		maxWidth: "50%"
	},
	rotate: {
		transform: `skewY(-11deg)`,
		borderBottom: `0.5rem solid ${theme.palette.primary[100]}`
	},
	intro2: {
		display: "flex",
		flexDirection: "row",
		padding: theme.spacing(24),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(3),
		transform: `skewY(11deg)`
	},
	intro3: {
		padding: theme.spacing(24),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(8),
		display: "flex",
		flexDirection: "row-reverse"
	}
});

class Signup extends Component {
	render () {
		const classes = this.props.classes;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					signup
				</div>
			</Fragment>
		);
	}
}

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));
