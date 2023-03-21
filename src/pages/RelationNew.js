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

class DiscussNew extends Component {
	state = {
		errors: {},
		postTitle: "",
		postBody: ""
	};

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const newPostData = {
			title: this.state.postTitle,
			body: this.state.postBody
		};
		this.props.createPost(newPostData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};
	handleCancel = () => {
		this.props.history.push("/plan");
	};

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
								Create post
							</Typography>
							<Box sx={{ mb: 2 }}>
								<Typography variant='body1'>Post title</Typography>
								<TextField
									placeholder='Write your title here...'
									name='postTitle'
									id='postTitle'
									error={errors.postTitle || errors.error ? true : false}
									value={this.state.postTitle}
									onChange={this.handleChange}
									fullWidth
									variant='outlined'
								/>
								<FormHelperText error={errors.postTitle ? true : false}>
									{errors.postTitle}
								</FormHelperText>
							</Box>
							<Box sx={{ mb: 2 }}>
								<Typography variant='body1'>Post body</Typography>
								<TextField
									placeholder='Write your body here...'
									name='postBody'
									id='postBody'
									multiline
									rows={2}
									error={errors.postBody || errors.error ? true : false}
									value={this.state.postBody}
									onChange={this.handleChange}
									fullWidth
									variant='outlined'
								/>
								<FormHelperText error={errors.postBody || errors.error ? true : false}>
									{errors.postBody} {errors.error}
								</FormHelperText>
							</Box>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Button
									variant='outlined'
									size='large'
									sx={{ mb: 1, mr: "auto" }}
									disabled={loading}
									onClick={this.handleCancel}
								>
									<Typography variant='body1'>Cancel</Typography>
								</Button>
								<Button type='submit' variant='outlined' size='large' sx={{ mb: 1 }} disabled={loading}>
									<Typography variant='body1' sx={{ mr: "8px" }}>
										Post
									</Typography>
									<SendRoundedIcon />
									{loading && <CircularProgress size={30} className={classes.progress} />}
								</Button>
							</Box>
						</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

DiscussNew.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withHistory(DiscussNew)));
