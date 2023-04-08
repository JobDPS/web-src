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
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";

import { connect } from "react-redux";
import { createPost } from "../../redux/actions/discussActions";

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

	componentDidMount () {
		// this.props.getDiscussData();
	}

	render () {
		dayjs.extend(relativeTime);
		const { classes } = this.props;

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
								{this.props.post.info.vote ? this.props.post.info.vote.integerValue : 0}
							</Typography>
							<Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
								<Link to={`/discuss/${this.props.post.info.id.stringValue}`}>
									<Typography variant='h4' sx={{ wordBreak: "break-all" }}>
										{this.props.post.info.title.stringValue}
									</Typography>
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
								<Box sx={{ display: "flex", flexDirection: "row" }}>
									<Link to={`/users/${this.props.post.info.author.stringValue}`}>
										<Box sx={{ display: "flex", flexDirection: "row" }}>
											<IconButton sx={{ p: 0 }}>
												<Avatar
													alt='Remy Sharp'
													src={this.props.post.author.imageUrl.stringValue}
												/>
											</IconButton>
											<Typography variant='body2'>
												{this.props.post.author.username.stringValue} posted{" "}
												{dayjs(this.props.post.info.createdAt.timestampValue).fromNow()}
											</Typography>
										</Box>
									</Link>

									<Box sx={{ ml: "auto" }}>
										<Link to={`/discuss/${this.props.post.info.id.stringValue}`}>
											<ModeCommentRoundedIcon />
											{this.props.post.replies ? (
												this.props.post.replies.length +
												this.props.post.replies.reduce(
													(a, b) => a + (b.replies ? b.replies.length : 0),
													0
												)
											) : (
												0
											)}
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
	// loginUser: PropTypes.func.isRequired,
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
	// clearErrors
	// getDiscussData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));
