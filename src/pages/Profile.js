import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

import { connect } from "react-redux";
import {
	getProfileData,
	getSocialData,
	getCompanyData,
	getDiscussData,
	getFollowersData,
	getFollowingData,
	followUser,
	uploadImage
} from "../redux/actions/profileActions";

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
		margin: `${theme.spacing(8)} auto`,
		width: "75%"
	},
	form: {
		padding: `2px 4px`,
		display: "flex",
		flexDirection: "column"
	},
	progress: {
		position: "absolute"
	},
	link: {
		width: "10rem",
		height: "10rem",
		flexGrow: 1
	},
	link2: {
		width: "100%",
		height: "100%"
	},
	paper: {
		display: "flex",
		flexDirection: "row",
		transition: `all 0.15s ease-in-out`,
		backgroundColor: "#ffffff",
		"&:hover": {
			backgroundColor: "#eeeeee"
		}
	}
});

class Profile extends Component {
	componentDidMount () {
		this.props.getProfileData(this.props.match.params.userId);
		this.props.getDiscussData(this.props.match.params.userId);
		this.props.getSocialData(this.props.match.params.userId);
		this.props.getCompanyData(this.props.match.params.userId);
		this.props.getFollowingData(this.props.match.params.userId);
		this.props.getFollowersData(this.props.match.params.userId);
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.props.getProfileData(this.props.match.params.userId);
			this.props.getDiscussData(this.props.match.params.userId);
			this.props.getSocialData(this.props.match.params.userId);
			this.props.getCompanyData(this.props.match.params.userId);
			this.props.getFollowingData(this.props.match.params.userId);
			this.props.getFollowersData(this.props.match.params.userId);
		}
	}

	handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	handleFollow = () => {
		this.props.followUser(this.props.match.params.userId);
	};

	handleChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append("image", image, image.name);
		this.props.uploadImage(formData, this.props.user.credentials.userId);
	};
	handleEditPicture = () => {
		document.getElementById("imageInput").click();
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, profile } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;

		const socPosts = profile.social.loading ? (
			<Typography>loading</Typography>
		) : profile.social.posts.length === 0 ? (
			<Typography>no posts yet</Typography>
		) : (
			profile.social.posts.slice(0, 2).map((post) => {
				return (
					<Link
						to={`/social/${post.info.id.stringValue}`}
						className={classes.link}
						key={post.info.id.stringValue}
						onClick={this.handleClick}
					>
						<Paper
							className={classes.paper}
							sx={{
								width: "100%",
								height: "100%",
								boxSizing: "border-box",
								padding: "4px"
							}}
						>
							<Typography variant='h4' sx={{ my: "auto" }}>
								{post.info.vote ? post.info.vote.integerValue : 0}
							</Typography>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									m: "auto 0"
								}}
							>
								<Typography
									variant='body1'
									sx={{
										maxWidth: "500px",
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: "6",
										overflow: "hidden",
										textOverflow: "ellipsis"
									}}
								>
									{post.info.body.stringValue}
								</Typography>
								<Box sx={{ display: "flex", flexDirection: "row", ml: "auto" }}>
									<ModeCommentRoundedIcon />
									{post.replies ? (
										post.replies.length +
										post.replies.reduce((a, b) => a + (b.replies ? b.replies.length : 0), 0)
									) : (
										0
									)}
								</Box>
							</Box>
						</Paper>
					</Link>
				);
			})
		);

		const posts = profile.discuss.loading ? (
			<Typography>loading</Typography>
		) : profile.discuss.posts.length === 0 ? (
			<Typography>no posts yet</Typography>
		) : (
			profile.discuss.posts.slice(0, 2).map((post) => {
				return (
					<Link
						to={`/discuss/${post.info.id.stringValue}`}
						className={classes.link}
						key={post.info.id.stringValue}
						onClick={this.handleClick}
					>
						<Paper
							className={classes.paper}
							sx={{
								width: "100%",
								height: "100%",
								boxSizing: "border-box",
								padding: "4px"
							}}
						>
							<Typography variant='h4' sx={{ my: "auto" }}>
								{post.info.vote ? post.info.vote.integerValue : 0}
							</Typography>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "row",
									m: "auto 0"
								}}
							>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Typography
										variant='h4'
										sx={{
											display: "-webkit-box",
											WebkitBoxOrient: "vertical",
											WebkitLineClamp: "1",
											overflow: "hidden",
											textOverflow: "ellipsis",
											wordBreak: "break-all"
										}}
									>
										{post.info.title.stringValue}
									</Typography>
									<Typography
										variant='body1'
										sx={{
											display: "-webkit-box",
											WebkitBoxOrient: "vertical",
											WebkitLineClamp: "4",
											overflow: "hidden",
											textOverflow: "ellipsis",
											wordBreak: "break-all"
										}}
									>
										{post.info.body.stringValue}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", flexDirection: "row", ml: "auto" }}>
									<ModeCommentRoundedIcon />
									{post.replies ? (
										post.replies.length +
										post.replies.reduce((a, b) => a + (b.replies ? b.replies.length : 0), 0)
									) : (
										0
									)}
								</Box>
							</Box>
						</Paper>
					</Link>
				);
			})
		);

		const companies = profile.companies.loading ? (
			<Typography>loading</Typography>
		) : profile.companies.companies.length === 0 ? (
			<Typography>no companies yet</Typography>
		) : (
			profile.companies.companies.slice(0, 2).map((company) => {
				return (
					<Card sx={{ height: "168px", width: "50%" }} key={company.id.stringValue}>
						<CardContent>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								{company.domain.stringValue !== "-1" ? (
									<img
										height='40px'
										src={`https://logo.clearbit.com/${company.domain.stringValue}`}
										alt={`${company.name.stringValue} logo`}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null;
											currentTarget.src =
												"https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media";
										}}
										style={{ maxWidth: "8rem" }}
									/>
								) : (
									<img
										height='40px'
										src='https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media'
										alt={`${company.name.stringValue} logo`}
									/>
								)}

								<Box sx={{ ml: "auto" }}>
									<a href={`https://${company.link.stringValue}`} target='_blank' rel='noreferrer'>
										<IconButton sx={{ width: "32px" }}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												viewBox='0 0 24 24'
											>
												<path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
											</svg>
										</IconButton>
									</a>
								</Box>
							</Box>

							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Typography sx={{ textTransform: "capitalize", marginRight: "8px", paddingTop: "4px" }}>
									{company.name.stringValue}
								</Typography>
							</Box>

							<Typography variant='body2' sx={{ textTransform: "capitalize" }}>
								{company.industry.stringValue}
							</Typography>

							<Typography variant='body2' sx={{ textTransform: "capitalize" }}>
								{company.size.stringValue} employees
							</Typography>
						</CardContent>
					</Card>
				);
			})
		);

		const following = profile.following.loading ? (
			<Typography>loading</Typography>
		) : profile.following.following.length === 0 ? (
			<Typography>not following anyone yet</Typography>
		) : (
			profile.following.following.slice(0, 5).map((user) => {
				return (
					<Paper
						className={classes.paper}
						sx={{
							width: "20%",
							height: "100%",
							boxSizing: "border-box",
							padding: "4px",
							paddingTop: "8px"
						}}
						onClick={this.handleClick}
						key={user.credentials.id.stringValue}
					>
						<Link to={`/users/${user.credentials.id.stringValue}`} className={classes.link2}>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									textAlign: "center",
									alignItems: "center"
								}}
							>
								<Avatar alt='Remy Sharp' src={user.credentials.imageUrl.stringValue} />
								<Typography>{user.credentials.username.stringValue}</Typography>
							</Box>
						</Link>
					</Paper>
				);
			})
		);

		const followers = profile.followers.loading ? (
			<Typography>loading</Typography>
		) : profile.followers.followers.length === 0 ? (
			<Typography>no followers yet</Typography>
		) : (
			profile.followers.followers.slice(0, 5).map((user) => {
				return (
					<Paper
						className={classes.paper}
						sx={{
							width: "20%",
							height: "100%",
							boxSizing: "border-box",
							padding: "4px",
							paddingTop: "8px"
						}}
						onClick={this.handleClick}
						key={user.credentials.id.stringValue}
					>
						<Link to={`/users/${user.credentials.id.stringValue}`} className={classes.link2}>
							<Box
								sx={{
									width: "100%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									textAlign: "center",
									alignItems: "center"
								}}
							>
								<Avatar alt='Remy Sharp' src={user.credentials.imageUrl.stringValue} />
								<Typography>{user.credentials.username.stringValue}</Typography>
							</Box>
						</Link>
					</Paper>
				);
			})
		);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box className={classes.main} sx={{ minWidth: { xs: "4rem", sm: "6rem", md: "36rem" } }}>
						<Paper className={classes.form}>
							<Box sx={{ display: "flex", flexDirection: "row", m: "8px" }}>
								<Avatar
									alt='Remy Sharp'
									src={
										profile.credentials.loading ? (
											""
										) : (
											profile.credentials.credentials.imageUrl.stringValue
										)
									}
									sx={(theme) => ({
										mr: "8px",
										width: "10rem",
										height: "10rem",
										border: `4px solid ${theme.palette.primary[500]}`
									})}
								/>
								{!loading3 &&
								!profile.credentials.loading &&
								(authenticated &&
									this.props.user.credentials.userId ===
										profile.credentials.credentials.id.stringValue) ? (
									<Fragment>
										<IconButton
											sx={{
												display: "block",
												position: "absolute",
												width: "3rem",
												height: "3rem",
												mt: "8rem",
												ml: "8rem"
											}}
											onClick={this.handleEditPicture}
										>
											<AddPhotoAlternateRoundedIcon />
										</IconButton>
										<input
											type='file'
											id='imageInput'
											hidden='hidden'
											onChange={this.handleChange}
										/>
									</Fragment>
								) : (
									<span />
								)}
								<Typography variant='h6' sx={{ mt: "auto" }}>
									{profile.credentials.loading ? (
										"loading"
									) : (
										profile.credentials.credentials.username.stringValue
									)}
								</Typography>
								<Box sx={{ ml: "auto", display: "flex", flexDirection: "column" }}>
									<Box sx={{ mt: "auto", display: "flex", flexDirection: "row" }}>
										<Typography sx={{ m: "auto 0", mr: "8px" }}>
											{profile.followers.loading ? (
												""
											) : profile.followers.followers.length === 1 ? (
												`${profile.followers.followers.length} follower`
											) : (
												`${profile.followers.followers.length} followers`
											)}
										</Typography>
										{profile.credentials.loading ||
										profile.followers.loading ||
										loading3 ||
										!authenticated ||
										profile.credentials.credentials.id.stringValue ===
											this.props.user.credentials.userId ? (
											<span />
										) : (
											<Button
												size='large'
												variant='contained'
												color='primary'
												onClick={this.handleFollow}
											>
												<Typography>
													{profile.followers.followers
														.map((a) => a.credentials.id.stringValue)
														.includes(this.props.user.credentials.userId) ? (
														"Unfollow"
													) : (
														"Follow"
													)}
												</Typography>
											</Button>
										)}
									</Box>
								</Box>
							</Box>
							<Divider sx={{ mb: "8px" }} />
							<Paper sx={{ m: "8px", backgroundColor: "#eeeeee" }}>
								<Typography sx={{ m: "8px" }}>Recent Social Posts</Typography>
								<Paper
									sx={{
										m: "8px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										justifyContent: "center"
									}}
								>
									{socPosts}
								</Paper>
							</Paper>
							<Paper sx={{ m: "8px", backgroundColor: "#eeeeee" }}>
								<Typography sx={{ m: "8px" }}>Recent Discussion Posts</Typography>
								<Paper
									sx={{
										m: "8px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										justifyContent: "center"
									}}
								>
									{posts}
								</Paper>
							</Paper>
							<Paper sx={{ m: "8px", backgroundColor: "#eeeeee" }}>
								<Typography sx={{ m: "8px" }}>Company Interests</Typography>
								<Paper
									sx={{
										m: "8px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap",
										justifyContent: "center"
									}}
								>
									{companies}
								</Paper>
							</Paper>
							<Paper sx={{ m: "8px", backgroundColor: "#eeeeee" }}>
								<Typography sx={{ m: "8px" }}>Recently followed</Typography>
								<Paper
									sx={{
										m: "8px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap"
									}}
								>
									{following}
								</Paper>
							</Paper>
							<Paper sx={{ m: "8px", backgroundColor: "#eeeeee" }}>
								<Typography sx={{ m: "8px" }}>Recent followers</Typography>
								<Paper
									sx={{
										m: "8px",
										display: "flex",
										flexDirection: "row",
										flexWrap: "wrap"
									}}
								>
									{followers}
								</Paper>
							</Paper>
						</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
	getProfileData: PropTypes.func.isRequired,
	getSocialData: PropTypes.func.isRequired,
	getCompanyData: PropTypes.func.isRequired,
	getDiscussData: PropTypes.func.isRequired,
	getFollowersData: PropTypes.func.isRequired,
	getFollowingData: PropTypes.func.isRequired,
	followUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	profile: state.profile
});

const mapActionsToProps = {
	getProfileData,
	getSocialData,
	getCompanyData,
	getDiscussData,
	getFollowersData,
	getFollowingData,
	followUser,
	uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
