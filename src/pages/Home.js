import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// import { connect } from "react-redux";

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

class Home extends Component {
	render () {
		const classes = this.props.classes;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<div className={classes.intro}>
						<div className={classes.billboard}>
							<Typography variant='h2'>Tired of using spreadsheets?</Typography>
							<br />
							<Typography>
								JobDPS is the multi-platform tool to help discuss, plan, and schedule everything
								involved in your job search—without a messy spreadsheet.
							</Typography>
							<br />
							<Button size='large' variant='contained' color='primary'>
								Get Started
							</Button>
						</div>
					</div>
					<br />
					<div className={classes.rotate}>
						<div className={classes.intro2}>
							<Button variant='contained' color='primary'>
								Create Account
							</Button>
						</div>
					</div>
					<div className={classes.intro3}>
						<Button variant='contained' color='primary'>
							Explore
						</Button>
					</div>
				</div>
			</Fragment>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
	// loginUser: PropTypes.func.isRequired,
	// user: PropTypes.object.isRequired,
	// UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
	// UI: state.UI
});

const mapActionsToProps = {
	// loginUser
};

// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
export default withStyles(styles)(Home);
