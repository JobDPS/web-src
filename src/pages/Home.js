import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import backgroundImage from "../assets/bg6.png";

import { connect } from "react-redux";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "column"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	searchIcon: {
		padding: "5px 0 0 3px",
		position: "absolute",
		color: "#c3e7e7"
	},
	intro: {
		backgroundColor: "#c3e7e7",
		background: `url(${backgroundImage}) right center no-repeat`,
		// backgroundSize: "contain",
		backgroundSize: "1024px 1024px",
		// Top - Right - Bottom - Left
		padding: `${theme.spacing(16)} ${theme.spacing(3)} ${theme.spacing(32)} ${theme.spacing(8)}`,
		// clipPath: "polygon(0 100%, 100% 90%, 100% 0, 0 0)"
		clipPath: "polygon(0 90%, 100% 100%, 100% 0, 0 0)",
		minHeight: "20rem"
	},
	intro2: {
		display: "flex",
		backgroundColor: "#fff",
		flexDirection: "row",
		padding: theme.spacing(24),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(3)
	},
	intro3: {
		backgroundColor: "#fff",
		padding: theme.spacing(24),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(8),
		display: "flex",
		flexDirection: "row-reverse"
	},
	divider1: {
		height: "4.2rem",
		marginTop: "-3.36rem",
		marginBottom: "-0.1rem",
		// clipPath: "polygon(0 100%, 0 80%, 100% 0, 100% 100%)",
		clipPath: "polygon(0 100%, 100% 100%, 100% 80%, 0 0)",
		backgroundColor: "#fff"
	},
	shadowWrap: {
		filter: "drop-shadow(0 -2px 1px rgba(0, 0, 0, 0.2))"
	},
	shadowWrap2: {
		filter: "drop-shadow(0 2px 1px rgba(0, 0, 0, 0.2))"
	}
});

class Home extends Component {
	render () {
		const classes = this.props.classes;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<div className={classes.shadowWrap2}>
						<div className={classes.intro}>
							<Box
								sx={(theme) => ({
									maxWidth: "50%",
									color: theme.palette.primary[900],
									// color: "#fff"
								})}
							>
								<Box
									sx={{
										display: "flex",
										cursor: "default"
									}}
								>
									<WorkRoundedIcon sx={{ mr: 1, mt: 0.4 }} />
									<SearchRoundedIcon
										sx={{ mr: 1, mt: 0.4 }}
										className={classes.searchIcon}
										viewBox='0 0 32 32'
									/>
									<Typography
										variant='h6'
										noWrap
										sx={{
											mr: 2,
											fontWeight: 700,
											letterSpacing: ".3rem",
											color: "inherit",
											textDecoration: "none"
										}}
									>
										JobDPS
									</Typography>
								</Box>

								<Typography variant='h2'>Tired of using spreadsheets?</Typography>
								<br />
								<Typography>
									JobDPS is the multi-platform tool to help discuss, plan, and schedule everything
									involved in your job search—without a messy spreadsheet.
								</Typography>
								<br />
								<Button size='large' variant='contained'>
									Get Started
								</Button>
							</Box>
						</div>
					</div>
					<br />
					<div className={classes.intro2}>
						<Button variant='contained' color='primary'>
							Create Account
						</Button>
					</div>
					<div className={classes.intro3}>
						<Button variant='contained' color='primary'>
							Explore
						</Button>
					</div>
					<div className={classes.shadowWrap}>
						<div className={classes.divider1} />
					</div>
				</div>
			</Fragment>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
	// UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
	// UI: state.UI
});

const mapActionsToProps = {
	// loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));
