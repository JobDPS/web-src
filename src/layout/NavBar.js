import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { logoutUser } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.spread,
	root: {
		display: "flex"
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	mainLink: {
		display: "flex",
		marginLeft: "16px"
	},
	searchIcon: {
		padding: "5px 0 0 3px",
		position: "absolute",
		color: theme.palette.primary[500]
	},
	link: {
		transition: `all 0.3s ease-in-out`,
		"&:hover": {
			boxShadow: "0 -2px 0 white inset"
		}
	}
});

function NavBar (props) {
	const classes = props.classes;
	const { loading } = props.UI;
	const { authenticated, loading: loading2 } = props.user;
	const pages = [ "explore", "discuss", "plan", "schedule", "social", "companies" ];
	const settings = [ "Profile", "Settings", "Logout" ];

	const [ anchorElNav, setAnchorElNav ] = React.useState(null);
	const [ anchorElUser, setAnchorElUser ] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		props.logoutUser();
	};

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
		if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const user = authenticated ? (
		<div>
			<Tooltip title='Open settings'>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar
						alt='Remy Sharp'
						src={!authenticated || loading2 ? "" : props.user.credentials.imageUrl.stringValue}
					/>
				</IconButton>
			</Tooltip>
			<Menu
				sx={{ mt: "45px" }}
				id='menu-appbar'
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right"
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right"
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map(
					(setting) =>
						setting === "Logout" ? (
							<MenuItem key={setting} onClick={handleLogout}>
								<Typography textAlign='center'>{setting}</Typography>
							</MenuItem>
						) : setting === "Profile" ? (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Link to={`/users/${props.user.credentials.userId}`} onClick={handleClick}>
									<Typography textAlign='center'>{setting}</Typography>
								</Link>
							</MenuItem>
						) : (
							<MenuItem key={setting} onClick={handleCloseUserMenu}>
								<Typography textAlign='center'>{setting}</Typography>
							</MenuItem>
						)
				)}
			</Menu>
		</div>
	) : (
		<div style={{ display: "flex", flexDirection: "row" }}>
			<Link to='/login' className={classes.link} onClick={handleClick}>
				<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
					Login
				</Button>
			</Link>
			<Link to='/signup' className={classes.link} onClick={handleClick}>
				<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
					Sign Up
				</Button>
			</Link>
		</div>
	);

	return (
		<div className={classes.root} id='back-to-top-anchor'>
			<AppBar>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<Link
								to={authenticated ? "/explore" : "/"}
								className={classes.mainLink}
								onClick={handleClick}
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
							</Link>
						</Box>

						<Box sx={{ display: { xs: "flex", md: "none" } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='inherit'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" }
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Link to={`/${page}`} onClick={handleClick}>
											<Typography textAlign='center' sx={{ textTransform: "capitalize" }}>
												{page}
											</Typography>
										</Link>
									</MenuItem>
								))}
							</Menu>
						</Box>

						<Box sx={{ display: { xs: "flex", md: "none" }, mx: "auto" }}>
							<Link
								to={authenticated ? "/explore" : "/"}
								className={classes.mainLink}
								onClick={handleClick}
							>
								<WorkRoundedIcon sx={{ mr: 1, mt: 0.4 }} />
								<SearchRoundedIcon
									sx={{ mr: 1, mt: 0.4 }}
									className={classes.searchIcon}
									viewBox='0 0 32 32'
								/>
								<Typography
									variant='h5'
									noWrap
									sx={{
										mr: 2,
										fontWeight: 700,
										letterSpacing: ".3rem",
										color: "inherit",
										textDecoration: "none",
										display: { xs: "none", sm: "flex" }
									}}
								>
									JobDPS
								</Typography>
							</Link>
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<div className={classes.link} key={page}>
									<Link to={`/${page}`} onClick={handleClick}>
										<Button
											onClick={handleCloseNavMenu}
											sx={{ my: 2, color: "white", display: "block" }}
										>
											{page}
										</Button>
									</Link>
								</div>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>{user}</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	classes: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	// loginUser
	// createServer
	logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavBar));
