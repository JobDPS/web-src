import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";

import { connect } from "react-redux";
import { loginUser, clearErrors } from "../redux/actions/userActions";

const styles = (theme) => ({
	...theme.spread,
	content: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#00252e",
		minHeight: "100vh"
	},
	toolbar: {
		...theme.mixins.toolbar
	},
	main: {
		margin: "0 auto",
		padding: `${theme.spacing(16)} 0`
	},
	form: {
		display: "flex",
		flexDirection: "column"
	},
	progress: {
		position: "absolute"
	}
});

class Login extends Component {
	state = {
		email: "",
		password: "",
		errors: {}
	};

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const newUserData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(newUserData);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};

	render () {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box
						className={classes.main}
						component='form'
						sx={{ minWidth: { xs: "4rem", sm: "6rem", md: "36rem" } }}
						onSubmit={this.handleSubmit}
					>
						<Paper className={classes.form} sx={{ padding: { xs: "1rem", sm: "2rem", md: "5rem" } }}>
							<Typography variant='h6' sx={{ mb: 2 }}>
								Welcome back
							</Typography>
							<Box sx={{ mb: 2 }}>
								<Input
									placeholder='Email Address'
									name='email'
									id='email'
									error={errors.email || errors.error ? true : false}
									value={this.state.email}
									onChange={this.handleChange}
									fullWidth
								/>
								<FormHelperText error={errors.email ? true : false}>{errors.email}</FormHelperText>
							</Box>
							<Box sx={{ mb: 2 }}>
								<Input
									placeholder='Password'
									type='password'
									name='password'
									id='password'
									error={errors.password || errors.error ? true : false}
									value={this.state.password}
									onChange={this.handleChange}
									fullWidth
								/>
								<FormHelperText error={errors.password || errors.error ? true : false}>
									{errors.password} {errors.error}
								</FormHelperText>
							</Box>
							<Box sx={{ display: "flex", flexDirection: "row", mb: 4 }}>
								<FormControlLabel
									control={<Checkbox value='remember' color='primary' />}
									label='Remember me'
								/>
								<Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
									<Link to='/login'>
										<Typography color='primary'>Forgot password?</Typography>
									</Link>
								</Box>
							</Box>
							<Button type='submit' variant='outlined' size='large' sx={{ mb: 1 }} disabled={loading}>
								Sign in
								{loading && <CircularProgress size={30} className={classes.progress} />}
							</Button>
							<Box sx={{ display: "flex", flexDirection: "row", mx: "auto" }}>
								<Typography variant='caption'>
									Don't have an account?
									<Link to='/signup'>
										<Typography variant='caption' color='primary' sx={{ fontWeight: 700, ml: 1 }}>
											Sign up
										</Typography>
									</Link>
								</Typography>
							</Box>
						</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser,
	clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login));
