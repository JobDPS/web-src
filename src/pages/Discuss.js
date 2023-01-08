import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";

import { connect } from "react-redux";
import { getDiscussData } from "../redux/actions/discussActions";
import Post from "../components/DiscussionPost/Post";

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
		margin: "0 auto",
		padding: `${theme.spacing(16)} 0`
	},
	form: {
		display: "flex",
		flexDirection: "column"
	},
	progress: {
		position: "absolute"
	}
});

class Discuss extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {
		this.props.getDiscussData();
	}

	render () {
		const { classes, UI: { loading }, discuss: { allPosts, loading2 } } = this.props;
		const { errors } = this.state;
		const posts =
			allPosts && !loading2 ? (
				allPosts.map((p) => {
					return <Post key={p.info.id.stringValue} author={p.author} title={p.info.title.stringValue}/>;
				})
			) : (
				<Typography>loading</Typography>
			);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box>{posts}</Box>
				</div>
			</Fragment>
		);
	}
}

Discuss.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	// clearErrors: PropTypes.func.isRequired,
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
	// loginUser,
	// clearErrors
	getDiscussData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Discuss));
