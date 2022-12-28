import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

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
	}
});

class Signup extends Component {
	state = {
		email: "",
		password: "",
		confirmPassword: "",
		username: "",
		errors: {}
	};

	static getDerivedStateFromProps (props, state) {
		if (props.UI.errors) return { ...state, errors: props.UI.errors };
		return state;
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			username: this.state.username
		};
		this.props.signupUser(newUserData);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
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
							<Typography variant='h6'>Welcome to JobDPS!</Typography>
							<Typography variant='caption' sx={{ mb: 2 }}>
								Please fill in your details
							</Typography>
							<Box sx={{ mb: 2 }}>
								<Input
									placeholder='Username'
									name='username'
									id='username'
									error={errors.username ? true : false}
									value={this.state.username}
									onChange={this.handleChange}
									fullWidth
								/>
								<FormHelperText error={errors.username ? true : false}>
									{errors.username}
								</FormHelperText>
							</Box>
							<Box sx={{ mb: 2 }}>
								<Input
									placeholder='Email Address'
									name='email'
									id='email'
									error={errors.email ? true : false}
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
									error={errors.password ? true : false}
									value={this.state.password}
									onChange={this.handleChange}
									fullWidth
								/>
								<FormHelperText error={errors.password ? true : false}>
									{errors.password}
								</FormHelperText>
							</Box>
							<Box sx={{ mb: 4 }}>
								<Input
									placeholder='Confirm Password'
									type='password'
									name='confirmPassword'
									id='confirmPassword'
									error={errors.confirmPassword ? true : false}
									value={this.state.confirmPassword}
									onChange={this.handleChange}
									fullWidth
								/>
								<FormHelperText error={errors.confirmPassword ? true : false}>
									{errors.confirmPassword}
								</FormHelperText>
							</Box>
							<Button type='submit' variant='outlined' size='large' sx={{ mb: 1 }} disabled={loading}>
								Sign up
								{loading && <CircularProgress size={30} className={classes.progress} />}
							</Button>
							<Box sx={{ display: "flex", flexDirection: "row", mx: "auto" }}>
								<Typography variant='caption'>
									Already have an account?
									<Link to='/login'>
										<Typography variant='caption' color='primary' sx={{ fontWeight: 700, ml: 1 }}>
											Login
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

Signup.propTypes = {
	classes: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Signup));
