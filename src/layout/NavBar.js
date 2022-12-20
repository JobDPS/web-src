import * as React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
		marginRight: "16px"
	},
	searchIcon: {
		padding: "5px 0 0 3px",
		position: "absolute",
		color: theme.palette.primary.main
	}
});

function NavBar (props) {
	const classes = props.classes;
	const pages = [ "Explore", "Plan", "Schedule", "Discuss", "Social", "Companies" ];
	const settings = [ "Profile", "Settings", "Logout" ];
	// const theme = useTheme();
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

	return (
		<div className={classes.root}>
			{/* <CssBaseline /> */}
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<Link to='/' className={classes.mainLink} style={{ paddingLeft: "16px" }}>
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
										<Typography textAlign='center'>{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>

						<Box sx={{ display: { xs: "flex", md: "none" } }} style={{ margin: "0 auto" }}>
							<Link to='/' className={classes.mainLink}>
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
										textDecoration: "none"
									}}
								>
									JobDPS
								</Typography>
							</Link>
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
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
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign='center'>{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
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

// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NavBar));
export default withStyles(styles)(NavBar);
