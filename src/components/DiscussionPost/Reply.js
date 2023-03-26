import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Grow from "@mui/material/Grow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { connect } from "react-redux";
import { createReplyReply, deleteDiscussPostReply, editDiscussPostReply } from "../../redux/actions/discussActions";
import { clearErrors, openForm } from "../../redux/actions/userActions";
import ReplyReply from "./ReplyReply";

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

class Reply extends Component {
	state = {
		replying: false,
		replyBody: "",
		replyBodyNew: "",
		errors: {},
		anchorEl: null,
		deleteDialogOpen: false,
		editing: false
	};

	componentDidMount () {
		if (this.props.UI.errors) this.props.clearErrors();
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
		if (!this.props.UI.errors && Object.keys(this.state.errors).length !== 0) this.setState({ errors: {} });
		if ((this.state.replying || this.state.editing) && this.props.UI.closeForm) {
			this.setState({ replying: false, editing: false, replyBody: "" });
			this.props.openForm();
		}
	}

	handleClick = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};

	handleReply = () => {
		if (this.props.UI.errors) this.props.clearErrors();
		this.setState({ replying: true, replyBody: "" });
	};
	handleReplyCancel = () => {
		this.setState({ replying: false });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const newReplyData = {
			body: this.state.replyBody
		};
		this.props.createReplyReply(this.props.postId, this.props.reply.info.id.stringValue, newReplyData);
	};

	handleDeleteDialogOpen = () => {
		this.setState({ deleteDialogOpen: true, anchorEl: null });
	};
	handleDeleteDialogClose = () => {
		this.setState({ deleteDialogOpen: false });
	};
	handleDeletePostReply = () => {
		this.setState({ deleteDialogOpen: false });
		this.props.deleteDiscussPostReply(this.props.postId, this.props.reply.info.id.stringValue);
	};

	handleEditPost = () => {
		this.setState({
			editing: true,
			anchorEl: null,
			replyBodyNew: this.props.reply.info.body.stringValue
		});
		this.props.openForm();
	};
	handleEditSubmit = () => {
		const newReplyData = {
			body: this.state.replyBodyNew
		};
		this.props.editDiscussPostReply(this.props.postId, this.props.reply.info.id.stringValue, newReplyData);
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

		const replies = this.props.reply.replies ? (
			this.props.reply.replies.map((p, idx) => {
				return (
					<ReplyReply
						key={p.info.id.stringValue}
						postId={this.props.postId}
						replyId={this.props.reply.info.id.stringValue}
						reply={p}
						first={idx === 0 ? true : false}
						last={idx === this.props.reply.replies.length - 1 ? true : false}
					/>
				);
			})
		) : (
			<span />
		);

		const form =
			authenticated && this.state.replying ? (
				<Paper
					component='form'
					sx={{
						display: "flex",
						flexDirection: "column",
						margin: "8px",
						padding: "8px"
					}}
					onSubmit={this.handleSubmit}
				>
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Box sx={{ flexDirection: "column", mr: "8px", flexGrow: 1 }}>
							<TextField
								name='replyBody'
								id='replyBody'
								error={errors[this.props.reply.info.id.stringValue] || errors.error ? true : false}
								value={this.state.replyBody}
								onChange={this.handleChange}
								fullWidth
								variant='standard'
								placeholder='Write your reply here...'
								disabled={loading || loading2}
							/>
							<FormHelperText
								error={errors[this.props.reply.info.id.stringValue] || errors.error ? true : false}
							>
								{errors[this.props.reply.info.id.stringValue]} {errors.error}
							</FormHelperText>
						</Box>
						<Box>
							<Button
								onClick={this.handleReplyCancel}
								variant='outlined'
								sx={{ mr: "8px" }}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button type='submit' variant='outlined' disabled={loading || loading2} color='success'>
								Post Reply
								{loading && <CircularProgress size={30} className={classes.progress} color='success' />}
							</Button>
						</Box>
					</Box>
				</Paper>
			) : (
				<span />
			);

		const deleteDialog = (
			<Dialog open={this.state.deleteDialogOpen} onClose={this.handleDeleteDialogClose}>
				<DialogTitle>Delete Post</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this reply?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleDeleteDialogClose} variant='outlined'>
						Cancel
					</Button>
					<Button onClick={this.handleDeletePostReply} color='error' variant='outlined'>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);

		return (
			<Fragment>
				<div className={classes.content}>
					<Paper
						elevation={0}
						className={classes.item}
						sx={{
							transition: `all 0.3s ease-in-out`,
							backgroundColor: "#f6f6f6",
							borderRadius: `${this.props.first ? "4px" : "0px"} ${this.props.first
								? "4px"
								: "0px"} ${this.props.last ? "4px" : "0px"} ${this.props.last ? "4px" : "0px"}`,
							marginTop: `${this.props.first ? "4px" : "0px"}`,
							marginBottom: `${this.props.last ? "4px" : "0px"}`
						}}
					>
						<Box sx={{ display: "flex", flexDirection: "row" }}>
							<Box sx={{ my: "auto" }}>
								<Link to={`/users/${this.props.reply.info.author.stringValue}`}>
									<IconButton sx={{ p: 0 }}>
										<Avatar alt='Remy Sharp' src={this.props.reply.author.imageUrl.stringValue} />
									</IconButton>
								</Link>
							</Box>
							<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${this.props.reply.info.author.stringValue}`}>
										<Typography variant='body2'>
											{this.props.reply.author.username.stringValue} posted{" "}
											{dayjs(this.props.reply.info.createdAt.timestampValue).fromNow()}
										</Typography>
									</Link>
									{/* <ToggleButtonGroup
										orientation='horizontal'
										value={this.state.vote}
										exclusive
										onChange={this.handleChangeVote}
										size='small'
										color='primary'
										sx={{ ml: "auto" }}
									>
										<ToggleButton value='up' aria-label='up vote' sx={{ border: "0" }}>
											<KeyboardArrowUpRoundedIcon />
										</ToggleButton>
										<Typography variant='body1' sx={{ p: "8px", color: "rgba(0, 0, 0, 0.87)" }}>
											{this.props.reply.info.vote ? this.props.reply.info.vote.integerValue : 0}
										</Typography>
										<ToggleButton value='down' aria-label='down vote' sx={{ border: "0" }}>
											<KeyboardArrowDownRoundedIcon />
										</ToggleButton>
									</ToggleButtonGroup> */}
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									{this.state.editing ? (
										<Box sx={{ p: "8px", width: "100%" }}>
											<TextField
												name='replyBodyNew'
												id='replyBodyNew'
												error={
													errors[this.props.reply.info.id.stringValue] || errors.error ? (
														true
													) : (
														false
													)
												}
												value={this.state.replyBodyNew}
												onChange={this.handleChange}
												fullWidth
												variant='outlined'
												placeholder='Write your body here...'
												disabled={loading || loading2}
												label='Reply Body'
											/>
											<FormHelperText
												error={
													errors[this.props.reply.info.id.stringValue] || errors.error ? (
														true
													) : (
														false
													)
												}
											>
												{errors[this.props.reply.info.id.stringValue]} {errors.error}
											</FormHelperText>
										</Box>
									) : (
										<Typography variant='body1'>
											{this.props.reply.info.body.stringValue}
										</Typography>
									)}
								</Box>

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
												<CircularProgress
													size={30}
													className={classes.progress}
													color='success'
												/>
											)}
										</Button>
									</Box>
								) : (
									<span />
								)}

								{authenticated && !this.state.replying && !this.state.editing ? (
									<Box sx={{ ml: "auto", mt: "8px" }}>
										{authenticated &&
										this.props.reply.info.author.stringValue === this.props.user.credentials.userId &&
										!this.state.editing ? (
											<Fragment>
												<IconButton
													aria-label='more'
													id='long-button'
													aria-controls={open ? "long-menu" : undefined}
													aria-expanded={open ? "true" : undefined}
													aria-haspopup='true'
													onClick={this.handleClick}
													sx={{ ml: "auto" }}
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
																<MenuItem
																	key={option}
																	onClick={this.handleDeleteDialogOpen}
																>
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

										<Button variant='outlined' onClick={this.handleReply}>
											<ReplyRoundedIcon />
											<Typography variant='body1'>Reply</Typography>
										</Button>
									</Box>
								) : (
									<span />
								)}
							</Box>
						</Box>
						{form}
						{replies}
						{deleteDialog}
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Reply.propTypes = {
	classes: PropTypes.object.isRequired,
	createReplyReply: PropTypes.func.isRequired,
	deleteDiscussPostReply: PropTypes.func.isRequired,
	editDiscussPostReply: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
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
	createReplyReply,
	deleteDiscussPostReply,
	editDiscussPostReply,
	clearErrors,
	openForm
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reply));
