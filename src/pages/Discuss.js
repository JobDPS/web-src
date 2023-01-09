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

import { connect } from "react-redux";
import { getDiscussData, createPost } from "../redux/actions/discussActions";
import Post from "../components/DiscussionPost/Post";

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
		display: "flex",
		alignItems: "center"
	},
	progress: {
		position: "absolute"
	}
});

class Discuss extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {
		this.props.getDiscussData();
	}

	handleNewPost = () => {
		this.props.createPost({ body: "test post body 3", title: "test post title 3" });
	};

	render () {
		const { classes, UI: { loading }, discuss: { allPosts, loading: loading2 } } = this.props;
		const { errors } = this.state;
		const posts = !loading2 ? (
			allPosts.map((p, idx) => {
				return (
					<Post
						key={p.info.id.stringValue}
						author={p.author}
						title={p.info.title.stringValue}
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
						<Paper component='form' elevation={0} className={classes.form}>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder='Search'
								inputProps={{ "aria-label": "search" }}
							/>
							<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
								<SearchIcon />
							</IconButton>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							<Button color='primary' sx={{ p: "10px" }} aria-label='create' onClick={this.handleNewPost}>
								<AddIcon />
								New Post
							</Button>
						</Paper>
						<Box>{posts}</Box>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Discuss.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	// clearErrors: PropTypes.func.isRequired,
	createPost: PropTypes.func.isRequired,
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
	getDiscussData,
	createPost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Discuss));
