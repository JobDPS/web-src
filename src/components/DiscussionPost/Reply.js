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

import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import { connect } from "react-redux";
import { createReplyReply } from "../../redux/actions/discussActions";
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
		errors: {}
	};

	componentDidMount () {
		if (this.props.UI.errors) this.props.clearErrors();
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
		if (!this.props.UI.errors && Object.keys(this.state.errors).length !== 0) this.setState({ errors: {} });
		if (this.state.replying && this.props.UI.closeForm) {
			this.setState({ replying: false });
			this.props.openForm();
		}
	}

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

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, discuss: { post, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;

		const replies = this.props.reply.replies ? (
			this.props.reply.replies.map((p, idx) => {
				return (
					<ReplyReply
						key={p.info.id.stringValue}
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
							<Link to={`/users/${this.props.reply.info.author.stringValue}`}>
								<IconButton sx={{ p: 0, my: "auto" }}>
									<Avatar alt='Remy Sharp' src={this.props.reply.author.imageUrl.stringValue} />
								</IconButton>
							</Link>
							<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${this.props.reply.info.author.stringValue}`}>
										<Typography variant='body2'>
											{this.props.reply.author.username.stringValue} posted{" "}
											{dayjs(this.props.reply.info.createdAt.timestampValue).fromNow()}
										</Typography>
									</Link>
									<ToggleButtonGroup
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
									</ToggleButtonGroup>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Typography
										variant='body1'
										sx={{
											maxWidth: "500px",
											display: "-webkit-box",
											WebkitBoxOrient: "vertical",
											WebkitLineClamp: "2",
											overflow: "hidden",
											textOverflow: "ellipsis"
										}}
									>
										{this.props.reply.info.body.stringValue}
									</Typography>
								</Box>
								{authenticated && !this.state.replying ? (
									<Box sx={{ ml: "auto" }}>
										<Button variant='outlined' sx={{ mt: "8px" }} onClick={this.handleReply}>
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
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Reply.propTypes = {
	classes: PropTypes.object.isRequired,
	createReplyReply: PropTypes.func.isRequired,
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
	clearErrors,
	openForm
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reply));
