import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

import Post from "../components/Explore/Post";

import { connect } from "react-redux";
import { getUserData, getCompanyData, getDiscussData, getSocialData } from "../redux/actions/exploreActions";
import { getRelationData } from "../redux/actions/relationActions";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "row",
		// backgroundColor: "#00252e",
		minHeight: "100vh"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	main: {
		margin: `${theme.spacing(8)} auto`,
		width: "85%"
	},
	form: {
		padding: `2px 4px`,
		display: "flex",
		flexDirection: "column"
	},
	progress: {
		position: "absolute"
	},
	compCard: {
		transition: `all 0.15s ease-in-out`,
		backgroundColor: "#ffffff",
		"&:hover": {
			backgroundColor: "#eeeeee"
		}
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

class Explore extends Component {
	componentDidMount () {
		this.props.getUserData();
		this.props.getCompanyData();
		this.props.getDiscussData();
		this.props.getSocialData();
		this.props.getRelationData();
	}

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, explore } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;

		const users = explore.user.loading ? (
			<Typography>loading</Typography>
		) : explore.user.users.length === 0 ? (
			<Typography>no users</Typography>
		) : (
			explore.user.users.map((user) => (
				<Link to={`/users/${user.id.stringValue}`} key={user.id.stringValue}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							minHeight: "4rem",
							width: "100%",
							padding: "4px",
							boxSizing: "border-box"
						}}
						className={classes.compCard}
					>
						<Avatar alt='Remy Sharp' src={user.imageUrl.stringValue} sx={{ margin: "auto 8px" }} />
						<Box sx={{ m: "auto", textAlign: "center" }}>
							<Typography>{user.username.stringValue}</Typography>
							<Typography>
								{!user.followers.arrayValue.values ? (
									"0 followers"
								) : user.followers.arrayValue.values.length === 1 ? (
									`${user.followers.arrayValue.values.length} follower`
								) : (
									`${user.followers.arrayValue.values.length} followers`
								)}
							</Typography>
						</Box>
					</Box>
				</Link>
			))
		);

		const companies = explore.companies.loading ? (
			<Typography>loading</Typography>
		) : explore.companies.companies.length === 0 ? (
			<Typography>no companies</Typography>
		) : (
			explore.companies.companies.map((comp) => (
				<Link to='/companies' key={comp.id.stringValue}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							minHeight: "4rem",
							width: "100%",
							padding: "4px",
							boxSizing: "border-box"
						}}
						className={classes.compCard}
					>
						{comp.domain.stringValue !== "-1" ? (
							<img
								height='40px'
								src={`https://logo.clearbit.com/${comp.domain.stringValue}`}
								alt={`${comp.name.stringValue} logo`}
								onError={({ currentTarget }) => {
									currentTarget.onerror = null;
									currentTarget.src =
										"https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media";
								}}
								style={{ maxWidth: "6rem", margin: "auto 8px" }}
							/>
						) : (
							<img
								height='40px'
								src='https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media'
								alt={`${comp.name.stringValue} logo`}
								style={{ margin: "auto 8px" }}
							/>
						)}
						<Typography sx={{ m: "auto", textTransform: "capitalize" }}>{comp.name.stringValue}</Typography>
					</Box>
				</Link>
			))
		);

		let allPosts = [];
		if (!explore.discuss.loading && !explore.social.loading)
			allPosts = [ ...explore.discuss.posts, ...explore.social.posts ].sort((a, b) => {
				return new Date(b.info.createdAt.timestampValue) - new Date(a.info.createdAt.timestampValue);
			});

		const posts =
			loading3 || explore.discuss.loading || explore.social.loading ? (
				<Typography>loading</Typography>
			) : allPosts.length === 0 ? (
				<Typography>no posts</Typography>
			) : (
				allPosts.map((post) => <Post post={post} key={post.info.id.stringValue} />)
			);

		const relations = this.props.relation.loading ? (
			<Typography>loading</Typography>
		) : this.props.relation.allRelations.length === 0 ? (
			<Typography>no relations yet</Typography>
		) : (
			this.props.relation.allRelations.slice(0, 5).map((relation) => (
				<Link to={`/plan/${relation.info.id.stringValue}`} key={relation.info.id.stringValue}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							minHeight: "4rem",
							width: "100%",
							padding: "4px",
							boxSizing: "border-box"
						}}
						className={classes.compCard}
					>
						{relation.company.domain.stringValue !== "-1" ? (
							<img
								height='40px'
								src={`https://logo.clearbit.com/${relation.company.domain.stringValue}`}
								alt={`${relation.company.name.stringValue} logo`}
								onError={({ currentTarget }) => {
									currentTarget.onerror = null;
									currentTarget.src =
										"https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media";
								}}
								style={{ maxWidth: "8rem", margin: "auto 8px" }}
							/>
						) : (
							<img
								height='40px'
								src='https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media'
								alt={`${relation.company.name.stringValue} logo`}
								style={{ margin: "auto 8px" }}
							/>
						)}
						<Box sx={{ m: "auto", textAlign: "center", textTransform: "capitalize" }}>
							<Typography>{relation.company.name.stringValue}</Typography>
						</Box>
					</Box>
				</Link>
			))
		);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box
						className={classes.main}
						sx={{
							minWidth: { xs: "4rem", sm: "6rem", md: "36rem" },
							display: "flex",
							flexDirection: "row"
						}}
					>
						<Box
							className={classes.form}
							sx={{
								width: "66%",
								mr: "16px",
								boxSizing: "border-box"
							}}
						>
							<Typography variant='h6' sx={{ mb: "8px" }}>
								Welcome!
							</Typography>
							{posts}
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "33%",
								boxSizing: "border-box"
							}}
						>
							<Paper
								className={classes.form}
								sx={{
									width: "100%",
									mb: "16px",
									display: "flex",
									flexDirection: "column",
									padding: "8px",
									boxSizing: "border-box"
								}}
							>
								<Link to={`/users/${this.props.user.credentials.userId}`}>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row"
										}}
									>
										<Avatar
											alt='Remy Sharp'
											src={
												!authenticated || loading3 ? (
													""
												) : (
													this.props.user.credentials.imageUrl.stringValue
												)
											}
											sx={(theme) => ({
												mr: "8px",
												border: `1px solid ${theme.palette.primary[700]}`
											})}
										/>
										<Typography variant='h6' sx={{ my: "auto" }} className={classes.hover2}>
											{this.props.user.credentials.username.stringValue}
										</Typography>
									</Box>
								</Link>
								<Typography sx={{ ml: "auto", my: "auto" }}>
									{loading3 ? (
										""
									) : !this.props.user.credentials.followers.arrayValue.values ? (
										"0 followers"
									) : this.props.user.credentials.followers.arrayValue.values.length === 1 ? (
										`${this.props.user.credentials.followers.arrayValue.values.length} follower`
									) : (
										`${this.props.user.credentials.followers.arrayValue.values.length} followers`
									)}
								</Typography>
							</Paper>
							<Paper
								className={classes.form}
								sx={{
									width: "100%",
									mb: "16px",
									backgroundColor: "#eeeeee",
									boxSizing: "border-box",
									padding: "8px"
								}}
							>
								<Link to='/plan'>
									<Typography sx={{ fontWeight: 700, mb: "8px" }} className={classes.hover2}>
										Your Relations
									</Typography>
								</Link>
								{relations}
							</Paper>
							<Paper
								className={classes.form}
								sx={{
									width: "100%",
									mb: "16px",
									backgroundColor: "#eeeeee",
									boxSizing: "border-box",
									padding: "8px"
								}}
							>
								<Typography sx={{ fontWeight: 700, mb: "8px" }}>Recommended Users</Typography>
								{users}
							</Paper>
							<Paper
								className={classes.form}
								sx={{
									width: "100%",
									backgroundColor: "#eeeeee",
									boxSizing: "border-box",
									padding: "8px"
								}}
							>
								<Link to='/companies'>
									<Typography sx={{ fontWeight: 700, mb: "8px" }} className={classes.hover2}>
										Browse Companies
									</Typography>
								</Link>
								{companies}
							</Paper>
						</Box>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Explore.propTypes = {
	classes: PropTypes.object.isRequired,
	getUserData: PropTypes.func.isRequired,
	getCompanyData: PropTypes.func.isRequired,
	getDiscussData: PropTypes.func.isRequired,
	getSocialData: PropTypes.func.isRequired,
	getRelationData: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	explore: PropTypes.object.isRequired,
	relation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	explore: state.explore,
	relation: state.relation
});

const mapActionsToProps = {
	getUserData,
	getCompanyData,
	getDiscussData,
	getSocialData,
	getRelationData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Explore));
