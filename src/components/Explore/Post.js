import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";

import CloseIcon from "@mui/icons-material/Close";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownOffAltRoundedIcon from "@mui/icons-material/ThumbDownOffAltRounded";

import { connect } from "react-redux";

import { likeSocialPost } from "../../redux/actions/socialActions";

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
	},
	hover: {
		transition: `all 0.15s ease-in-out`,
		textDecoration: "underline",
		textDecorationColor: "rgba(0,0,0,0)",
		"&:hover": {
			textDecorationColor: theme.palette.primary[500],
			color: theme.palette.primary[500]
		}
	},
	hover2: {
		transition: `all 0.15s ease-in-out`,
		"&:hover": {
			color: theme.palette.primary[500]
		}
	}
});

class Post extends Component {
	state = {
		open: false
	};

	handleLike = () => {
		this.props.likeSocialPost(this.props.post.info.id.stringValue);
	};
	handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};
	handleShare = () => {
		this.setState({ open: true });
		if (this.props.post.info.title) {
			navigator.clipboard.writeText(
				`${window.location.origin}/web-src/discuss/${this.props.post.info.id.stringValue}`
			);
		} else {
			navigator.clipboard.writeText(
				`${window.location.origin}/web-src/social/${this.props.post.info.id.stringValue}`
			);
		}
	};
	handleClose = (e, r) => {
		if (r === "clickaway") return;
		this.setState({ open: false });
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, post } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;

		let liked = false;
		if (
			!loading3 &&
			this.props.user.credentials.likes.arrayValue.values &&
			this.props.user.credentials.likes.arrayValue.values
				.map((id) => id.stringValue)
				.includes(post.info.id.stringValue)
		) {
			liked = true;
		}

		const action = (
			<IconButton size='small' aria-label='close' color='inherit' onClick={this.handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		);

		return (
			<Paper
				sx={{
					mb: "12px",
					minHeight: "8rem",
					padding: "8px",
					boxSizing: "border-box",
					display: "flex",
					flexDirection: "column"
				}}
				key={post.info.id.stringValue}
			>
				{post.info.title ? (
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
							<Box sx={{ display: "flex", flexDirection: "row", mb: "8px" }}>
								<Link to={`/discuss/${post.info.id.stringValue}`} onClick={this.handleClick}>
									<Typography
										variant='h4'
										className={classes.hover}
										sx={{ wordBreak: "break-all", mr: "8px" }}
									>
										{post.info.title.stringValue}
									</Typography>
								</Link>
								<Typography variant='h4' sx={{ ml: "auto" }}>
									{post.info.vote ? post.info.vote.integerValue : 0}
								</Typography>
							</Box>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${post.info.author.stringValue}`} onClick={this.handleClick}>
										<IconButton sx={{ p: 0, mr: "8px" }}>
											<Avatar
												alt={post.author.username.stringValue}
												src={post.author.imageUrl.stringValue}
											/>
										</IconButton>
									</Link>
									<Box sx={{ display: "flex", flexDirection: "column", my: "auto" }}>
										<Link to={`/users/${post.info.author.stringValue}`} onClick={this.handleClick}>
											<Typography
												variant='body2'
												className={classes.hover}
												sx={{ display: "flex" }}
											>
												{post.author.username.stringValue}
											</Typography>
										</Link>
										<Link to='/discuss' onClick={this.handleClick}>
											<Box sx={{ display: "flex", flexDirection: "row" }}>
												<Typography variant='body2' sx={{ mr: "4px" }}>
													Posted {dayjs(post.info.createdAt.timestampValue).fromNow()} in
												</Typography>
												<Typography variant='body2' color='primary'>
													Discuss
												</Typography>
											</Box>
										</Link>
									</Box>
								</Box>
							</Box>
							<Typography
								variant='body1'
								sx={{
									p: "8px",
									width: "100%",
									boxSizing: "border-box"
								}}
							>
								{post.info.body.stringValue}
							</Typography>
						</Box>
					</Box>
				) : (
					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${post.info.author.stringValue}`} onClick={this.handleClick}>
										<IconButton sx={{ p: 0, mr: "8px" }}>
											<Avatar
												alt={post.author.username.stringValue}
												src={post.author.imageUrl.stringValue}
												sx={{ width: "4rem", height: "4rem" }}
											/>
										</IconButton>
									</Link>
									<Box sx={{ display: "flex", flexDirection: "column", my: "auto" }}>
										<Link to={`/users/${post.info.author.stringValue}`} onClick={this.handleClick}>
											<Typography variant='h6' className={classes.hover} sx={{ display: "flex" }}>
												{post.author.username.stringValue}
											</Typography>
										</Link>
										<Link to='/social' onClick={this.handleClick}>
											<Box sx={{ display: "flex", flexDirection: "row" }}>
												<Typography variant='body2' sx={{ mr: "4px" }}>
													Posted {dayjs(post.info.createdAt.timestampValue).fromNow()}
												</Typography>
											</Box>
										</Link>
									</Box>
								</Box>
							</Box>
							<Typography
								variant='body1'
								sx={{
									p: "8px",
									width: "100%",
									boxSizing: "border-box",
									fontSize: "1.25rem"
								}}
							>
								{post.info.body.stringValue}
							</Typography>
							<Typography variant='subtitle2'>{post.info.vote.integerValue} likes</Typography>
						</Box>
					</Box>
				)}
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						mt: "auto",
						borderTop: "1px solid rgba(0, 0, 0, 0.15)",
						pt: "8px",
						boxSizing: "border-box"
					}}
				>
					<Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
						{post.info.title ? (
							<Fragment>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Link
										to={
											post.info.title ? (
												`/discuss/${post.info.id.stringValue}`
											) : (
												`/social/${post.info.id.stringValue}`
											)
										}
										onClick={this.handleClick}
									>
										<Button sx={{ display: "flex", flexDirection: "row" }}>
											<ChatRoundedIcon sx={{ mr: "8px" }} />
											<Typography>Comment</Typography>
										</Button>
									</Link>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Button sx={{ display: "flex", flexDirection: "row" }} onClick={this.handleShare}>
										<LinkRoundedIcon sx={{ mr: "8px" }} />
										<Typography>Share</Typography>
									</Button>
								</Grid>
							</Fragment>
						) : (
							<Fragment>
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Box
										sx={{
											width: "fit-content",
											display: "flex",
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										<Button
											sx={{ display: "flex", flexDirection: "row" }}
											onClick={this.handleLike}
										>
											{liked ? (
												<Fragment>
													<ThumbUpRoundedIcon sx={{ mr: "8px" }} />
													<Typography>UnLike</Typography>
												</Fragment>
											) : (
												<Fragment>
													<ThumbDownOffAltRoundedIcon
														sx={{ mr: "8px", transform: "scale(-1,-1)" }}
													/>
													<Typography>Like</Typography>
												</Fragment>
											)}
										</Button>
									</Box>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Link
										to={
											post.info.title ? (
												`/discuss/${post.info.id.stringValue}`
											) : (
												`/social/${post.info.id.stringValue}`
											)
										}
										onClick={this.handleClick}
									>
										<Button sx={{ display: "flex", flexDirection: "row" }}>
											<ChatRoundedIcon sx={{ mr: "8px" }} />
											<Typography>Comment</Typography>
										</Button>
									</Link>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<Button sx={{ display: "flex", flexDirection: "row" }} onClick={this.handleShare}>
										<LinkRoundedIcon sx={{ mr: "8px" }} />
										<Typography>Share</Typography>
									</Button>
								</Grid>
							</Fragment>
						)}
					</Grid>
					<Link
						to={`/social/${post.info.id.stringValue}`}
						style={{ margin: "auto 0", marginLeft: "auto" }}
						onClick={this.handleClick}
					>
						<Box sx={{ display: "flex", flexDirection: "row" }}>
							<ModeCommentRoundedIcon />
							<Typography>
								{post.replies ? (
									post.replies.length +
									post.replies.reduce((a, b) => a + (b.replies ? b.replies.length : 0), 0)
								) : (
									0
								)}
							</Typography>
						</Box>
					</Link>
				</Box>
				<Snackbar
					open={this.state.open}
					autoHideDuration={3000}
					onClose={this.handleClose}
					message='Copied link to clipboard'
					action={action}
				/>
			</Paper>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	likeSocialPost: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	likeSocialPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
