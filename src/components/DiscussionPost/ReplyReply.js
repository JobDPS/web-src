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
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import { connect } from "react-redux";
import {
	createReplyReply2,
	deleteDiscussPostReplyReply,
	editDiscussPostReplyReply
} from "../../redux/actions/discussActions";
import { clearErrors, openForm } from "../../redux/actions/userActions";

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

class ReplyReply extends Component {
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
			this.setState({ replying: false, editing: false });
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
		this.setState({ replying: true, replyBody: `@${this.props.reply.author.username.stringValue} ` });
	};
	handleReplyCancel = () => {
		this.setState({ replying: false });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const newReplyData = {
			body: this.state.replyBody
		};
		this.props.createReplyReply2(
			this.props.postId,
			this.props.replyId,
			this.props.reply.info.id.stringValue,
			newReplyData
		);
	};

	handleDeleteDialogOpen = () => {
		this.setState({ deleteDialogOpen: true, anchorEl: null });
	};
	handleDeleteDialogClose = () => {
		this.setState({ deleteDialogOpen: false });
	};
	handleDeletePostReply = () => {
		this.setState({ deleteDialogOpen: false });
		this.props.deleteDiscussPostReplyReply(
			this.props.postId,
			this.props.replyId,
			this.props.reply.info.id.stringValue
		);
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
		this.props.editDiscussPostReplyReply(
			this.props.postId,
			this.props.replyId,
			this.props.reply.info.id.stringValue,
			newReplyData
		);
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

		const form =
			authenticated && this.state.replying ? (
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
							<Typography variant='h4' sx={{ my: "auto" }}>
								{this.props.reply.info.vote ? this.props.reply.info.vote.integerValue : 0}
							</Typography>
							<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
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
											defaultValue={this.state.postBody}
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
									<Typography variant='body1'>{this.props.reply.info.body.stringValue}</Typography>
								)}

								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${this.props.reply.info.author.stringValue}`}>
										<Box sx={{ display: "flex", flexDirection: "row" }}>
											<IconButton sx={{ p: 0 }}>
												<Avatar
													alt='Remy Sharp'
													src={this.props.reply.author.imageUrl.stringValue}
												/>
											</IconButton>
											<Typography variant='body2'>
												{this.props.reply.author.username.stringValue} posted{" "}
												{dayjs(this.props.reply.info.createdAt.timestampValue).fromNow()}
											</Typography>
										</Box>
									</Link>
									{authenticated && !this.state.replying && !this.state.editing ? (
										<Box sx={{ ml: "8px", mt: "8px" }}>
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
																	<MenuItem
																		key={option}
																		onClick={this.handleEditPost}
																	>
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
												<Typography variant='body1'>Reply</Typography>
											</Button>
										</Box>
									) : (
										<span />
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
							</Box>
						</Box>
						{form}
						{deleteDialog}
					</Paper>
				</div>
			</Fragment>
		);
	}
}

ReplyReply.propTypes = {
	classes: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
	openForm: PropTypes.func.isRequired,
	deleteDiscussPostReplyReply: PropTypes.func.isRequired,
	editDiscussPostReplyReply: PropTypes.func.isRequired,
	createReplyReply2: PropTypes.func.isRequired,
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
	openForm,
	deleteDiscussPostReplyReply,
	editDiscussPostReplyReply,
	createReplyReply2
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ReplyReply));
