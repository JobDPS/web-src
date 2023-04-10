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

	handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};

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
				<Link to={`/users/${user.id.stringValue}`} key={user.id.stringValue} onClick={this.handleClick}>
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
				<Link to='/companies' key={comp.id.stringValue} onClick={this.handleClick}>
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
			explore.discuss.loading || explore.social.loading ? (
				<Typography>loading</Typography>
			) : allPosts.length === 0 ? (
				<Typography>no posts</Typography>
			) : (
				allPosts.map((post) => (
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
											<Link
												to={`/users/${post.info.author.stringValue}`}
												onClick={this.handleClick}
											>
												<IconButton sx={{ p: 0, mr: "8px" }}>
													<Avatar
														alt={post.author.username.stringValue}
														src={post.author.imageUrl.stringValue}
													/>
												</IconButton>
											</Link>
											<Box sx={{ display: "flex", flexDirection: "column", my: "auto" }}>
												<Link
													to={`/users/${post.info.author.stringValue}`}
													onClick={this.handleClick}
												>
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
															Posted {dayjs(post.info.createdAt.timestampValue).fromNow()}{" "}
															in
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
											<Link
												to={`/users/${post.info.author.stringValue}`}
												onClick={this.handleClick}
											>
												<IconButton sx={{ p: 0, mr: "8px" }}>
													<Avatar
														alt={post.author.username.stringValue}
														src={post.author.imageUrl.stringValue}
														sx={{ width: "4rem", height: "4rem" }}
													/>
												</IconButton>
											</Link>
											<Box sx={{ display: "flex", flexDirection: "column", my: "auto" }}>
												<Link
													to={`/users/${post.info.author.stringValue}`}
													onClick={this.handleClick}
												>
													<Typography
														variant='h6'
														className={classes.hover}
														sx={{ display: "flex" }}
													>
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
											<Button sx={{ display: "flex", flexDirection: "row" }}>
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
												<Button sx={{ display: "flex", flexDirection: "row" }}>
													<ThumbUpRoundedIcon sx={{ mr: "8px" }} />
													<Typography>Like</Typography>
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
											<Button sx={{ display: "flex", flexDirection: "row" }}>
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
					</Paper>
				))
			);

		const relations = this.props.relation.loading ? (
			<Typography>loading</Typography>
		) : this.props.relation.allRelations.length === 0 ? (
			<Typography>no relations yet</Typography>
		) : (
			this.props.relation.allRelations.slice(0, 5).map((relation) => (
				<Link
					to={`/plan/${relation.info.id.stringValue}`}
					key={relation.info.id.stringValue}
					onClick={this.handleClick}
				>
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
								<Link to={`/users/${this.props.user.credentials.userId}`} onClick={this.handleClick}>
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
								<Link to='/plan' onClick={this.handleClick}>
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
								<Link to='/companies' onClick={this.handleClick}>
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
