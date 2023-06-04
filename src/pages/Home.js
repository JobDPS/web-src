import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

import backgroundImage from "../assets/bg6.png";
import ss1 from "../assets/screenshot1.png";
import ss2 from "../assets/screenshot2.png";
import ss3 from "../assets/screenshot3.png";

import { connect } from "react-redux";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "column"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	searchIcon: {
		padding: "5px 0 0 3px",
		position: "absolute",
		color: "#c3e7e7"
	},
	intro: {
		backgroundColor: "#c3e7e7",
		background: `url(${backgroundImage}) right center no-repeat`,
		// backgroundSize: "contain",
		backgroundSize: "1024px 1024px",
		// Top - Right - Bottom - Left
		padding: `${theme.spacing(16)} ${theme.spacing(3)} ${theme.spacing(32)} ${theme.spacing(8)}`,
		// clipPath: "polygon(0 100%, 100% 90%, 100% 0, 0 0)"
		clipPath: "polygon(0 90%, 100% 100%, 100% 0, 0 0)",
		minHeight: "20rem"
	},
	divider1: {
		height: "4.2rem",
		marginTop: "-3.36rem",
		marginBottom: "-0.1rem",
		// clipPath: "polygon(0 100%, 0 80%, 100% 0, 100% 100%)",
		clipPath: "polygon(0 100%, 100% 100%, 100% 80%, 0 0)",
		backgroundColor: "#f3f4f6"
	},
	divider2: {
		marginTop: theme.spacing(24),
		height: "4.2rem",
		// marginTop: "-3.36rem",
		marginBottom: "-0.1rem",
		clipPath: "polygon(0 100%, 0 80%, 100% 0, 100% 100%)",
		backgroundColor: theme.palette.primary[100]
	},
	shadowWrap: {
		filter: "drop-shadow(0 -2px 1px rgba(0, 0, 0, 0.2))"
	},
	shadowWrap2: {
		filter: "drop-shadow(0 2px 1px rgba(0, 0, 0, 0.2))"
	},
	highlight: {
		color: theme.palette.primary[300]
	},
	highlight2: {
		color: theme.palette.primary[500],
		fontSize: "1.25rem",
		fontWeight: 500
	},
	image: {
		opacity: 1,
		transition: "all .2s ease-in-out",
		"&:hover": {
			opacity: 0.75
		}
	}
});

class Home extends Component {
	handleClick = () => {
		const anchor = document.querySelector("#info-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	render () {
		const classes = this.props.classes;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<div className={classes.shadowWrap2}>
						<div className={classes.intro}>
							<Box
								sx={(theme) => ({
									maxWidth: "50%",
									color: theme.palette.primary[900]
									// color: "#fff"
								})}
							>
								<Box
									sx={{
										display: "flex",
										cursor: "default"
									}}
								>
									<WorkRoundedIcon sx={{ mr: 1, mt: 0.4 }} />
									<SearchRoundedIcon
										sx={{ mr: 1, mt: 0.4 }}
										className={classes.searchIcon}
										viewBox='0 0 32 32'
									/>
									<Typography
										variant='h6'
										noWrap
										sx={{
											mr: 2,
											fontWeight: 700,
											letterSpacing: ".3rem",
											color: "inherit",
											textDecoration: "none"
										}}
									>
										JobDPS
									</Typography>
								</Box>

								<Typography variant='h2'>Tired of using spreadsheets?</Typography>
								<br />
								<Typography>
									JobDPS is the multi-platform tool to help discuss, plan, and schedule everything
									involved in your job search—without a messy spreadsheet.
								</Typography>
								<br />
								<Button size='large' variant='contained' onClick={this.handleClick}>
									Get Started
								</Button>
							</Box>
						</div>
					</div>
					<br />
					<Box
						sx={(theme) => ({
							display: "flex",
							backgroundColor: "#fff",
							flexDirection: "column",
							mx: "auto",
							mb: 0,
							paddingTop: theme.spacing(24)
						})}
						id='info-anchor'
					>
						<Typography
							variant='h4'
							sx={(theme) => ({
								color: theme.palette.primary[600],
								// textTransform: "uppercase",
								fontWeight: 500,
								textAlign: "center",
								mb: "16px",
								padding: "8px"
							})}
						>
							Job <span className={classes.highlight}>DISCUSS PLAN & SCHEDULE</span>
						</Typography>
						<Box sx={{ mx: "auto", mb: "12px" }}>
							<Link to='/signup'>
								<Button
									variant='contained'
									color='primary'
									endIcon={<ChevronRightRoundedIcon />}
									sx={{ width: "fit-content" }}
								>
									Create Account
								</Button>
							</Link>
						</Box>
						<Grid
							container
							spacing={{ xs: 1, sm: 1, md: 2 }}
							sx={{ justifyContent: "center", mx: "auto", padding: "64px", paddingBottom: 0 }}
						>
							<Grid item xs={12} sm={12} md={4}>
								<Typography variant='h6' color='primary' sx={{ mb: "8px" }}>
									💼 What is JobDPS
								</Typography>
								<Typography>
									JobDPS is the all in one app for anyone searching for a job including the tools to
									enhance your search to make it easier and faster.
									<br />
									<br />
									<span className={classes.highlight2}>D</span> - Discuss - Openly and freely confer
									with your peers out in the industry about any questions, queries or concerns about
									hiring companies, interview questions, job life, or anything at all!
									<br />
									<br />
									<span className={classes.highlight2}>P</span> - Plan - Organize all companies hiring
									and any companies your interested in, keep track of your relation to them, and
									monitor all processes you're involved in.
									<br />
									<br />
									<span className={classes.highlight2}>S</span> - Schedule - Keep track of the
									hundreds of deadlines involving applications, online assessments, phone interview,
									final interviews and offers.
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<Typography variant='h6' color='primary' sx={{ mb: "8px" }}>
									🎯 About Us and Our Goal
								</Typography>
								<Typography>
									This project was made by three college students as their Honors Capstone project and
									a culmination of their full stack development skills. We all went through the
									grueling process that is job finding and never found any tool or website that made
									the process easier. This was our main motivation in creating JobDPS and hope the
									tool can help our peers, whether fresh graduates or a seasoned professional, make
									job finding easier.
								</Typography>
								<Link to='/about'>
									<Button variant='text' sx={{ padding: 0, mt: "4px" }}>
										Learn more in the About Us page
										<ArrowOutwardRoundedIcon sx={{ paddingLeft: "4px", paddingBottom: "2px" }} />
									</Button>
								</Link>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<Typography variant='h6' color='primary' sx={{ mb: "8px" }}>
									✨ Features
								</Typography>
								<List sx={{ listStyleType: "disc", padding: 0, ml: "20px" }}>
									<ListItem sx={{ display: "list-item" }}>
										JobDPS is fully Open Source and available on
										<Button
											variant='text'
											sx={{ padding: 0 }}
											href='https://github.com/JobDPS'
											target='_blank'
										>
											Github
										</Button>
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Responsive and modern frontend made with React and Material UI
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Intuitive and secure account creation with Google Firebase Authentication
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Custom-made dashboard to keep track of your company relations and application
										progress
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Social media and discussion forum features to interact with your peers
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Curated list of top companies to browse
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										Multi-platform concurrent data stored in Google Firebase Firestore database
									</ListItem>
									<ListItem sx={{ display: "list-item" }}>
										<Button
											variant='text'
											sx={{ padding: 0 }}
											href='https://github.com/JobDPS/firebase-api'
											target='_blank'
										>
											Custom API
											<ArrowOutwardRoundedIcon
												sx={{ paddingLeft: "4px", paddingBottom: "2px" }}
											/>
										</Button>{" "}
										for data handling made with Express
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</Box>
					<div className={classes.shadowWrap}>
						<div className={classes.divider2} />
					</div>
					<Box
						sx={(theme) => ({
							backgroundColor: theme.palette.primary[100],
							pt: theme.spacing(24),
							pb: `calc(${theme.spacing(24)} + 67.2px)`,
							display: "flex",
							flexDirection: "column"
						})}
					>
						<Button
							variant='contained'
							color='primary'
							sx={{ mx: "auto", mb: "32px", width: "fit-content" }}
							endIcon={<ChevronRightRoundedIcon />}
						>
							Explore
						</Button>
						<Box sx={{ mx: "auto" }}>
							<ImageListItem sx={{ width: "60vw", mb: "16px" }} className={classes.image}>
								<img src={ss1} alt='Explore page' />
							</ImageListItem>
							<ImageListItem sx={{ width: "60vw", mb: "16px" }} className={classes.image}>
								<img src={ss2} alt='Plan/Relations page' />
							</ImageListItem>
							<ImageListItem sx={{ width: "60vw" }} className={classes.image}>
								<img src={ss3} alt='Companies page' />
							</ImageListItem>
						</Box>
					</Box>
					<div className={classes.shadowWrap}>
						<div className={classes.divider1} />
					</div>
				</div>
			</Fragment>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
	// loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
	// UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
	// UI: state.UI
});

const mapActionsToProps = {
	// loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));
