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

class Loading extends Component {
	render () {
		const { classes } = this.props;
		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box className={classes.main}>
						<CircularProgress size={50} className={classes.progress} />
					</Box>
				</div>
			</Fragment>
		);
	}
}

Loading.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
