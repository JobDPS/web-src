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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { connect } from "react-redux";
import { getSocialData, createPost } from "../redux/actions/socialActions";
import { clearErrors } from "../redux/actions/userActions";
import Post from "../components/SocialPost/Post";

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
		margin: `${theme.spacing(16)} auto`,
		width: "75%"
	},
	form: {
		padding: `2px 4px`,
		display: "flex"
	},
	progress: {
		position: "absolute"
	}
});

class Social extends Component {
	state = {
		errors: {},
		postBody: ""
	};

	componentDidMount () {
		this.props.getSocialData();
	}

	componentDidUpdate (prevProps, prevState) {
		if (!this.props.UI.errors && Object.keys(this.state.errors).length !== 0) this.setState({ errors: {} });
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const newPostData = {
			body: this.state.postBody
		};
		this.props.createPost(newPostData);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};

	render () {
		const { classes, UI: { loading }, social: { allPosts, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		const posts =
			allPosts && !loading2 ? (
				allPosts.map((p, idx) => {
					return (
						<Post
							key={p.info.id.stringValue}
							post={p}
							first={idx === 0 ? true : false}
							last={idx === allPosts.length - 1 ? true : false}
						/>
					);
				})
			) : (
				<Typography>loading</Typography>
			);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Paper className={classes.main}>
						<Paper
							component='form'
							elevation={0}
							className={classes.form}
							onSubmit={this.handleSubmit}
							sx={{ m: "8px", display: "flex", flexDirection: "column" }}
						>
							<Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
								<Link to={loading3 ? "" : `/users/${this.props.user.credentials.userId}`}>
									<IconButton>
										<Avatar
											alt='Remy Sharp'
											src={loading3 ? "" : this.props.user.credentials.imageUrl.stringValue}
										/>
									</IconButton>
								</Link>
								<Box sx={{ flexGrow: 1, m: "auto 0", marginRight: "8px" }}>
									<TextField
										placeholder='Write your post here...'
										name='postBody'
										id='postBody'
										multiline
										rows={2}
										error={errors.postBody || errors.error ? true : false}
										value={this.state.postBody}
										onChange={this.handleChange}
										fullWidth
										variant='standard'
									/>
									<FormHelperText error={errors.postBody || errors.error ? true : false}>
										{errors.postBody ? (
											`${errors.postBody}`
										) : errors.error ? (
											`${errors.error}`
										) : (
											" "
										)}
									</FormHelperText>
								</Box>
							</Box>
							<Button
								type='submit'
								variant='outlined'
								size='large'
								sx={{ height: "3rem", m: "auto 0", marginLeft: "auto" }}
								disabled={loading || loading3}
							>
								<Typography variant='body1' sx={{ mr: "8px" }}>
									Post
								</Typography>
								<SendRoundedIcon />
								{loading && <CircularProgress size={30} className={classes.progress} />}
							</Button>
						</Paper>
						<Box>{posts}</Box>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Social.propTypes = {
	classes: PropTypes.object.isRequired,
	getSocialData: PropTypes.func.isRequired,
	createPost: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	social: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	social: state.social
});

const mapActionsToProps = {
	getSocialData,
	createPost,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Social));
