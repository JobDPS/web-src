import * as React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { connect } from "react-redux";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const styles = (theme) => ({
	...theme.spread,
	root: {
		backgroundColor: "#f3f4f6",
		display: "flex",
		flexDirection: "column",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(6),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(3)
	},
	mainLink: {
		display: "flex",
		marginLeft: "16px"
	},
	searchIcon: {
		padding: "5px 0 0 3px",
		position: "absolute",
		color: "#f3f4f6"
	},
	list: {
		display: "flex",
		flexDirection: "row"
	},
	link: {
		transition: `all 0.2s ease-in-out`,
		textDecoration: "underline",
		textDecorationColor: "transparent",
		"&:hover": {
			textDecorationColor: "inherit"
		}
	},
	separator: {
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	}
});

function Footer (props) {
	const classes = props.classes;
	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};
	return (
		<Paper square elevation={4} className={classes.root} sx={{ backgroundColor: "#f3f4f6" }}>
			<Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
				<Grid item xs={12} sm={12} md={4}>
					<Box display='flex' justifyContent='center' alignItems='center'>
						<div className={classes.mainLink}>
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
						</div>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Box display='flex' justifyContent='center' alignItems='center'>
						<div className={classes.list}>
							<Link to='/' className={classes.link}>
								<Typography
									noWrap
									sx={{
										fontWeight: 700,
										color: "inherit",
										textDecoration: "none"
									}}
									onClick={handleClick}
								>
									About Us
								</Typography>
							</Link>
							<span className={classes.separator} />
							<Link to='/' className={classes.link}>
								<Typography
									noWrap
									sx={{
										fontWeight: 700,
										color: "inherit",
										textDecoration: "none"
									}}
									onClick={handleClick}
								>
									Contact
								</Typography>
							</Link>
							<span className={classes.separator} />
							<Link to='/' className={classes.link}>
								<Typography
									noWrap
									sx={{
										fontWeight: 700,
										color: "inherit",
										textDecoration: "none"
									}}
									onClick={handleClick}
								>
									Help Center
								</Typography>
							</Link>
						</div>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Typography />
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Box display='flex' justifyContent='center' alignItems='center'>
						<Typography variant='caption'>
							Copyright <span style={{ fontFamily: "Roboto" }}>©</span> 2022-2023 JobDPS
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Typography />
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Box display='flex' justifyContent='center' alignItems='center'>
						<Typography variant='caption'>
							Company logos provided by{" "}
							<a href='https://clearbit.com' style={{ textDecoration: "underline" }}>
								Clearbit
							</a>
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={8}>
					{/* <Paper>xs=8</Paper> */}
				</Grid>
			</Grid>
		</Paper>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired
	// createServer: PropTypes.func.isRequired,
	// user: PropTypes.object.isRequired,
	// UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	// loginUser
	// createServer
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Footer));
