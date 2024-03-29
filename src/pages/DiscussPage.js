import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grow from "@mui/material/Grow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { connect } from "react-redux";
import {
	getDiscussPost,
	createReply,
	deleteDiscussPost,
	editDiscussPost,
	likeDiscussPost,
	dislikeDiscussPost
} from "../redux/actions/discussActions";
import { clearErrors, openForm } from "../redux/actions/userActions";
import Reply from "../components/DiscussionPost/Reply";

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
		margin: `${theme.spacing(4)} auto`,
		width: "75%"
	},
	form: {
		padding: `2px 4px`,
		display: "flex",
		alignItems: "center"
	},
	progress: {
		position: "absolute"
	}
});

class DiscussPage extends Component {
	state = {
		vote: "none",
		replyBody: "",
		errors: {},
		anchorEl: null,
		deleteDialogOpen: false,
		editing: false,
		postBody: "",
		postTitle: ""
	};

	componentDidMount () {
		if (this.props.UI.errors) this.props.clearErrors();
		this.props.getDiscussPost(this.props.match.params.postId);
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
		if (!this.props.UI.errors && Object.keys(this.state.errors).length !== 0) this.setState({ errors: {} });
		if (this.props.UI.closeForm && this.state.editing) {
			this.setState({ editing: false });
			this.props.openForm();
		}
		if (
			prevProps.discuss.post &&
			prevProps.discuss.post.replies &&
			this.props.discuss.post.replies &&
			prevProps.discuss.post.replies.length !== this.props.discuss.post.replies.length
		)
			this.setState({ replyBody: "" });
	}

	handleLike = () => {
		this.props.likeDiscussPost(this.props.discuss.post.info.id.stringValue);
	};
	handleDislike = () => {
		this.props.dislikeDiscussPost(this.props.discuss.post.info.id.stringValue);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const newReplyData = {
			body: this.state.replyBody
		};
		this.props.createReply(this.props.match.params.postId, newReplyData);
	};

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleDeleteDialogOpen = () => {
		this.setState({ deleteDialogOpen: true, anchorEl: null });
	};
	handleDeleteDialogClose = () => {
		this.setState({ deleteDialogOpen: false });
	};
	handleDeletePost = () => {
		this.setState({ deleteDialogOpen: false });
		this.props.deleteDiscussPost(this.props.match.params.postId);
	};

	handleEditPost = () => {
		this.setState({
			editing: true,
			anchorEl: null,
			postBody: this.props.discuss.post.info.body.stringValue,
			postTitle: this.props.discuss.post.info.title.stringValue
		});
		this.props.openForm();
	};
	handleEditSubmit = () => {
		const newPostData = {
			title: this.state.postTitle,
			body: this.state.postBody
		};
		this.props.editDiscussPost(this.props.match.params.postId, newPostData);
	};
	handleEditCancel = () => {
		this.setState({ editing: false });
		this.props.clearErrors();
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, discuss: { post, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		const options = [ "Edit", "Delete" ];
		const open = Boolean(this.state.anchorEl);
		let liked = false;
		let disliked = false;
		if (
			!loading3 &&
			authenticated &&
			post &&
			this.props.user.credentials.likes.arrayValue.values &&
			this.props.user.credentials.likes.arrayValue.values
				.map((id) => id.stringValue)
				.includes(post.info.id.stringValue)
		) {
			liked = true;
		}
		if (
			!loading3 &&
			authenticated &&
			post &&
			this.props.user.credentials.dislikes.arrayValue.values &&
			this.props.user.credentials.dislikes.arrayValue.values
				.map((id) => id.stringValue)
				.includes(post.info.id.stringValue)
		) {
			disliked = true;
		}

		if (this.props.discuss.errors) {
			const error = this.props.discuss.errors.error;
			return (
				<Fragment>
					<div className={classes.toolbar} />
					<div className={classes.content}>
						<Paper className={classes.main} sx={{ p: "8px" }}>
							<Typography variant='h5' sx={{ fontWeight: 500 }}>
								{error.split(" ")[error.split(" ").length - 1] === "found." ? (
									"Post not found"
								) : (
									"Internal Server Error"
								)}
							</Typography>
						</Paper>
					</div>
				</Fragment>
			);
		}

		const replies =
			post && !loading2 && post.replies ? (
				post.replies.map((p, idx) => {
					return (
						<Reply
							key={p.info.id.stringValue}
							reply={p}
							postId={post.info.id.stringValue}
							first={idx === 0 ? true : false}
							last={idx === post.replies.length - 1 ? true : false}
						/>
					);
				})
			) : (
				<Typography>no replies</Typography>
			);

		const posts =
			post && !loading2 ? (
				<Paper
					elevation={0}
					className={classes.item}
					sx={{
						transition: `all 0.3s ease-in-out`,
						backgroundColor: "#f6f6f6",
						borderRadius: `4px`,
						marginTop: `"4px"`,
						marginBottom: `"4px"`
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Box sx={{ display: "flex", flexDirection: "column", width: "3rem" }}>
							<Button
								size='small'
								sx={(theme) => ({
									minWidth: "100%",
									color: `${liked ? theme.palette.primary[500] : "rgba(0, 0, 0, 0.26)"}`
								})}
								disabled={!authenticated}
								onClick={this.handleLike}
							>
								<KeyboardArrowUpRoundedIcon size='small' />
							</Button>
							<Typography
								sx={(theme) => ({
									mx: "auto",
									color: `${liked || disliked ? theme.palette.primary[500] : "rgba(0, 0, 0, 0.87)"}`
								})}
							>
								{post.info.vote ? post.info.vote.integerValue : 0}
							</Typography>
							<Button
								size='small'
								sx={(theme) => ({
									minWidth: "100%",
									color: `${disliked ? theme.palette.primary[500] : "rgba(0, 0, 0, 0.26)"}`
								})}
								disabled={!authenticated}
								onClick={this.handleDislike}
							>
								<KeyboardArrowDownRoundedIcon size='small' />
							</Button>
						</Box>
						<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
							<Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
								{this.state.editing ? (
									<Box sx={{ width: "100%", p: "8px" }}>
										<TextField
											name='postTitle'
											id='postTitle'
											error={errors.postTitle || errors.error ? true : false}
											value={this.state.postTitle}
											onChange={this.handleChange}
											fullWidth
											variant='outlined'
											placeholder='Write your title here...'
											disabled={loading || loading2}
											label='Title'
											sx={{ ".MuiInputBase-input": { fontSize: "2.125rem" } }}
										/>
										<FormHelperText error={errors.postTitle || errors.error ? true : false}>
											{errors.postTitle} {errors.error}
										</FormHelperText>
									</Box>
								) : (
									<Typography variant='h4' sx={{ wordBreak: "break-all" }}>
										{post.info.title.stringValue}
									</Typography>
								)}

								{authenticated &&
								post.info.author.stringValue === this.props.user.credentials.userId &&
								!this.state.editing ? (
									<Fragment>
										<IconButton
											aria-label='more'
											id='long-button'
											aria-controls={open ? "long-menu" : undefined}
											aria-expanded={open ? "true" : undefined}
											aria-haspopup='true'
											onClick={this.handleClick}
											sx={{ ml: "auto", maxHeight: "3rem" }}
										>
											<MoreHorizRoundedIcon />
										</IconButton>
										<Menu
											id='long-menu'
											MenuListProps={{
												"aria-labelledby": "long-button"
											}}
											anchorEl={this.state.anchorEl}
											open={open}
											onClose={this.handleClose}
											TransitionComponent={Grow}
										>
											{options.map(
												(option) =>
													option === "Delete" ? (
														<MenuItem key={option} onClick={this.handleDeleteDialogOpen}>
															{option}
														</MenuItem>
													) : option === "Edit" ? (
														<MenuItem key={option} onClick={this.handleEditPost}>
															{option}
														</MenuItem>
													) : (
														<MenuItem key={option} onClick={this.handleClose}>
															{option}
														</MenuItem>
													)
											)}
										</Menu>
									</Fragment>
								) : (
									<span />
								)}
							</Box>

							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${post.info.author.stringValue}`}>
										<IconButton sx={{ p: 0, mr: "4px" }}>
											<Avatar alt='Remy Sharp' src={post.author.imageUrl.stringValue} />
										</IconButton>
									</Link>
									<Typography variant='body2' sx={{ my: "auto" }}>
										{post.author.username.stringValue} posted{" "}
										{dayjs(post.info.createdAt.timestampValue).fromNow()}
									</Typography>
									<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
									<Typography variant='body2' sx={{ my: "auto" }}>
										{new Date(post.info.createdAt.timestampValue).toLocaleString()}
									</Typography>
								</Box>
							</Box>

							{this.state.editing ? (
								<Box sx={{ p: "8px" }}>
									<TextField
										name='postBody'
										id='postBody'
										error={errors.postBody || errors.error ? true : false}
										value={this.state.postBody}
										onChange={this.handleChange}
										multiline
										rows={2}
										fullWidth
										variant='outlined'
										placeholder='Write your body here...'
										disabled={loading || loading2}
										label='Body'
									/>
									<FormHelperText error={errors.postBody || errors.error ? true : false}>
										{errors.postBody} {errors.error}
									</FormHelperText>
								</Box>
							) : (
								<Typography variant='body1'>{post.info.body.stringValue}</Typography>
							)}

							{this.state.editing ? (
								<Box sx={{ ml: "auto", p: "8px" }}>
									<Button
										onClick={this.handleEditCancel}
										variant='outlined'
										sx={{ mr: "8px" }}
										disabled={loading}
									>
										Cancel
									</Button>
									<Button
										onClick={this.handleEditSubmit}
										color='success'
										variant='outlined'
										disabled={loading}
									>
										Save
										{loading && (
											<CircularProgress size={30} className={classes.progress} color='success' />
										)}
									</Button>
								</Box>
							) : (
								<span />
							)}
						</Box>
					</Box>
				</Paper>
			) : (
				<Typography>loading</Typography>
			);

		const deleteDialog = (
			<Dialog open={this.state.deleteDialogOpen} onClose={this.handleDeleteDialogClose}>
				<DialogTitle>Delete Post</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this post?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleDeleteDialogClose} variant='outlined'>
						Cancel
					</Button>
					<Button onClick={this.handleDeletePost} color='error' variant='outlined'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);

		const form = authenticated ? (
			<Paper
				component='form'
				sx={{
					minWidth: {
						xs: "4rem",
						sm: "6rem",
						md: "36rem",
						display: "flex",
						flexDirection: "column",
						margin: "8px",
						padding: "8px"
					}
				}}
				onSubmit={this.handleSubmit}
			>
				<Box sx={{ width: "100%", mr: "8px" }}>
					<TextField
						name='replyBody'
						id='replyBody'
						error={errors.replyBody || errors.error ? true : false}
						value={this.state.replyBody}
						onChange={this.handleChange}
						multiline
						rows={2}
						fullWidth
						variant='standard'
						placeholder='Write your comment here...'
						disabled={loading || loading2}
					/>
				</Box>
				<Box sx={{ width: "100%", display: "flex" }}>
					<FormHelperText error={errors.replyBody || errors.error ? true : false}>
						{errors.replyBody} {errors.error}
					</FormHelperText>
					<Button
						type='submit'
						variant='outlined'
						disabled={loading || loading2}
						sx={{ ml: "auto", mt: "8px" }}
					>
						<Typography variant='body1'>Comment</Typography>
						{loading && <CircularProgress size={30} className={classes.progress} />}
					</Button>
				</Box>
			</Paper>
		) : (
			<span />
		);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Paper className={classes.main}>
						<Box>{posts}</Box>
						<Box sx={{ display: "flex", flexDirection: "row", p: "8px" }}>
							<ForumRoundedIcon />
							<Typography>
								Comments{" ("}
								{post && post.replies ? (
									post.replies.length +
									post.replies.reduce((a, b) => a + (b.replies ? b.replies.length : 0), 0)
								) : (
									0
								)}
								{")"}
							</Typography>
						</Box>
						<Box>{form}</Box>
						<Box>{replies}</Box>
						{deleteDialog}
					</Paper>
				</div>
			</Fragment>
		);
	}
}

DiscussPage.propTypes = {
	classes: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
	getDiscussPost: PropTypes.func.isRequired,
	deleteDiscussPost: PropTypes.func.isRequired,
	createReply: PropTypes.func.isRequired,
	editDiscussPost: PropTypes.func.isRequired,
	likeDiscussPost: PropTypes.func.isRequired,
	dislikeDiscussPost: PropTypes.func.isRequired,
	openForm: PropTypes.func.isRequired,
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
	getDiscussPost,
	deleteDiscussPost,
	createReply,
	editDiscussPost,
	likeDiscussPost,
	dislikeDiscussPost,
	openForm
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DiscussPage));
