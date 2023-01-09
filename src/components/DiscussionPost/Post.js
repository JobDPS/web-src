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
import { createPost } from "../../redux/actions/discussActions";

const styles = (theme) => ({
	...theme.spread,
	item: {
		margin: "0 4px",
		padding: "4px",
		"&:hover": {
			backgroundColor: "#e0e0e0"
		}
	},
	progress: {
		position: "absolute"
	}
});

class Post extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {
		// this.props.getDiscussData();
	}

	render () {
		const { classes } = this.props;
		
		return (
			<Fragment>
				<div className={classes.content}>
					<Paper
						elevation={0}
						className={classes.item}
						sx={{
							transition: `all 0.3s ease-in-out`,
							backgroundColor: "#f6f6f6",
							borderRadius: `${this.props.first ? "4px" : "0px"} ${this.props.first ? "4px" : "0px"} ${this.props.last
								? "4px"
								: "0px"} ${this.props.last ? "4px" : "0px"}`,
							marginTop: `${this.props.first ? "4px" : "0px"}`,
							marginBottom: `${this.props.last ? "4px" : "0px"}`
						}}
					>
						<Typography>{this.props.title}</Typography>
						<Typography>{this.props.author.username.stringValue}</Typography>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
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
	// getDiscussData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
