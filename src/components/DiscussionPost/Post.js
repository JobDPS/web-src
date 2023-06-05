import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
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
import Divider from "@mui/material/Divider";

import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { connect } from "react-redux";
import { likeDiscussPost2, dislikeDiscussPost2 } from "../../redux/actions/discussActions";

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

	handleLike = (e) => {
		e.stopPropagation();
		e.preventDefault();
		this.props.likeDiscussPost2(this.props.post.info.id.stringValue);
	};
	handleDislike = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.dislikeDiscussPost2(this.props.post.info.id.stringValue);
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		let liked = false;
		let disliked = false;
		if (
			!loading3 &&
			authenticated &&
			this.props.user.credentials.likes.arrayValue.values &&
			this.props.user.credentials.likes.arrayValue.values
				.map((id) => id.stringValue)
				.includes(this.props.post.info.id.stringValue)
		) {
			liked = true;
		}
		if (
			!loading3 &&
			authenticated &&
			this.props.user.credentials.dislikes.arrayValue.values &&
			this.props.user.credentials.dislikes.arrayValue.values
				.map((id) => id.stringValue)
				.includes(this.props.post.info.id.stringValue)
		) {
			disliked = true;
		}

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
							<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
								<Link to={`/discuss/${this.props.post.info.id.stringValue}`}>
									<Box sx={{ display: "flex", flexDirection: "row" }}>
										<Typography variant='h4' sx={{ wordBreak: "break-all" }}>
											{this.props.post.info.title.stringValue}
										</Typography>
										<Box sx={{ display: "flex", flexDirection: "row", ml: "auto" }}>
											<Button
												size='small'
												sx={(theme) => ({
													minWidth: "fit-content",
													p: 0,
													mr: "4px",
													color: `${liked
														? theme.palette.primary[500]
														: "rgba(0, 0, 0, 0.26)"}`
												})}
												disabled={!authenticated}
												onClick={this.handleLike}
											>
												<KeyboardArrowUpRoundedIcon size='small' />
											</Button>
											<Typography
												sx={(theme) => ({
													m: "auto",
													mr: "4px",
													color: `${liked || disliked
														? theme.palette.primary[500]
														: "rgba(0, 0, 0, 0.87)"}`
												})}
											>
												{this.props.post.info.vote ? this.props.post.info.vote.integerValue : 0}
											</Typography>
											<Button
												size='small'
												sx={(theme) => ({
													minWidth: "fit-content",
													p: 0,
													color: `${disliked
														? theme.palette.primary[500]
														: "rgba(0, 0, 0, 0.26)"}`
												})}
												disabled={!authenticated}
												onClick={this.handleDislike}
											>
												<KeyboardArrowDownRoundedIcon size='small' />
											</Button>
										</Box>
									</Box>
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
										{this.props.post.info.body.stringValue}
									</Typography>
								</Link>
								<Divider sx={{ mb: "4px" }} />
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${this.props.post.info.author.stringValue}`}>
										<Box sx={{ display: "flex", flexDirection: "row" }}>
											<IconButton sx={{ p: 0, mr: "4px" }}>
												<Avatar
													alt='Remy Sharp'
													src={this.props.post.author.imageUrl.stringValue}
												/>
											</IconButton>
											<Typography variant='body2' sx={{ my: "auto" }}>
												{this.props.post.author.username.stringValue} posted{" "}
												{dayjs(this.props.post.info.createdAt.timestampValue).fromNow()}
											</Typography>
										</Box>
									</Link>

									<Box sx={{ ml: "auto", my: "auto" }}>
										<Link to={`/discuss/${this.props.post.info.id.stringValue}`}>
											<Box sx={{ display: "flex", flexDirection: "row" }}>
												<ModeCommentRoundedIcon />
												<Typography sx={{ m: "auto", px: "4px" }}>
													{this.props.post.replies ? (
														this.props.post.replies.length +
														this.props.post.replies.reduce(
															(a, b) => a + (b.replies ? b.replies.length : 0),
															0
														)
													) : (
														0
													)}
												</Typography>
											</Box>
										</Link>
									</Box>
								</Box>
							</Box>
						</Box>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Post.propTypes = {
	classes: PropTypes.object.isRequired,
	likeDiscussPost2: PropTypes.func.isRequired,
	dislikeDiscussPost2: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

const mapActionsToProps = {
	likeDiscussPost2,
	dislikeDiscussPost2
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
