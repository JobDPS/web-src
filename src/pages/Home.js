import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

// import { connect } from "react-redux";

const styles = (theme) => ({
	...theme.spread,
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	content: {
		display: "flex",
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingLeft: theme.spacing(16) + 1
	}
});

class Home extends Component {
	render () {
		const classes = this.props.classes;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Typography paragraph>home</Typography>
				</div>
			</Fragment>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	// user: PropTypes.object.isRequired,
	// UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	// UI: state.UI
});

const mapActionsToProps = {
	// loginUser
};

// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
export default withStyles(styles)(Home);
