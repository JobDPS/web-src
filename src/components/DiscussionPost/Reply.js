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
		errors: {}
	};

	componentDidMount () {
		// this.props.getDiscussData();
	}

	render () {
		dayjs.extend(relativeTime);
		const { classes } = this.props;
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
								</Box>
							</Box>
						</Box>
						{replies}
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Reply.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Reply));
