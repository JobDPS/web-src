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
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

import { connect } from "react-redux";
import { getDiscussPost, createReply } from "../redux/actions/discussActions";
import { clearErrors } from "../redux/actions/userActions";
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
		errors: {}
	};

	componentDidMount () {
		if (this.props.UI.errors) this.props.clearErrors();
		this.props.getDiscussPost(this.props.match.params.postId);
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
		if (!this.props.UI.errors && Object.keys(this.state.errors).length !== 0) this.setState({ errors: {} });
	}

	handleChangeVote = (event, nextValue) => {
		this.setState({ vote: nextValue });
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

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, discuss: { post, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;

		const replies =
			post && !loading2 && post.replies ? (
				post.replies.map((p, idx) => {
					return (
						<Reply
							key={p.info.id.stringValue}
							reply={p}
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
						<ToggleButtonGroup
							orientation='vertical'
							value={this.state.vote}
							exclusive
							onChange={this.handleChangeVote}
							size='small'
							color='primary'
						>
							<ToggleButton value='up' aria-label='up vote' sx={{ border: "0" }}>
								<KeyboardArrowUpRoundedIcon />
							</ToggleButton>
							<Typography variant='h4' sx={{ p: "8px", color: "rgba(0, 0, 0, 0.87)" }}>
								{post.info.vote ? post.info.vote.integerValue : 0}
							</Typography>
							<ToggleButton value='down' aria-label='down vote' sx={{ border: "0" }}>
								<KeyboardArrowDownRoundedIcon />
							</ToggleButton>
						</ToggleButtonGroup>

						<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
							<Typography variant='h4'>{post.info.title.stringValue}</Typography>

							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${post.info.author.stringValue}`}>
										<IconButton sx={{ p: 0 }}>
											<Avatar alt='Remy Sharp' src={post.author.imageUrl.stringValue} />
										</IconButton>
									</Link>
									<Typography variant='body2'>
										{post.author.username.stringValue} posted{" "}
										{dayjs(post.info.createdAt.timestampValue).fromNow()}
									</Typography>
									<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
									<Typography variant='body2'>
										{new Date(post.info.createdAt.timestampValue).toLocaleString()}
									</Typography>
								</Box>
							</Box>

							<Typography variant='body1'>{post.info.body.stringValue}</Typography>
						</Box>
					</Box>
				</Paper>
			) : (
				<Typography>loading</Typography>
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
						<ReplyRoundedIcon />
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
						<Box sx={{ display: "flex", flexDirection: "row" }}>
							<ModeCommentRoundedIcon />
							<Typography>
								Comments{" "}
								{post && post.replies ? (
									post.replies.length +
									post.replies.reduce((a, b) => a + (b.replies ? b.replies.length : 0), 0)
								) : (
									0
								)}
							</Typography>
						</Box>
						<Box>{form}</Box>
						<Box>{replies}</Box>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

DiscussPage.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	getDiscussPost: PropTypes.func.isRequired,
	createReply: PropTypes.func.isRequired,
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
	clearErrors,
	getDiscussPost,
	createReply
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DiscussPage));
