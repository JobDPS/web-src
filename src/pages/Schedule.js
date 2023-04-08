import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { connect } from "react-redux";
import { createPost } from "../redux/actions/discussActions";
import { clearErrors } from "../redux/actions/userActions";
import withHistory from "../util/withHistory";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "column",
		// backgroundColor: "#00252e",
		minHeight: "100vh"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	main: {
		margin: `${theme.spacing(8)} auto`,
		width: "75%"
	},
	form: {
		padding: `2px 4px`,
		display: "flex",
		flexDirection: "column"
	},
	progress: {
		position: "absolute"
	}
});

class Schedule extends Component {
	state = {
		errors: {}
	};

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
	}

	render () {
		const { classes, UI: { loading }, discuss: { allPosts, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box
						className={classes.main}
						component='form'
						sx={{ minWidth: { xs: "4rem", sm: "6rem", md: "36rem" } }}
						onSubmit={this.handleSubmit}
					>
						<Paper className={classes.form} sx={{ padding: { xs: "1rem", sm: "2rem", md: "5rem" } }}>
							<Typography variant='h6' sx={{ mx: "auto", mb: 2 }}>
								Schedule
							</Typography>
						</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
	createPost: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	discuss: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	discuss: state.discuss
});

const mapActionsToProps = {
	clearErrors,
	createPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withHistory(Schedule)));
