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
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { connect } from "react-redux";
import { searchCompanies, clearCompanies } from "../redux/actions/companyActions";
import { createRelation } from "../redux/actions/relationActions";
import { clearErrors } from "../redux/actions/userActions";
import withHistory from "../util/withHistory";

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
	}
});

class DiscussNew extends Component {
	state = {
		errors: {},
		company: {},
		hits: []
	};

	componentDidUpdate (prevProps, prevState) {
		if (this.props.UI.errors && JSON.stringify(this.props.UI.errors) !== JSON.stringify(this.state.errors))
			this.setState({ errors: this.props.UI.errors });
		if (
			Object.keys(this.props.company).includes("companies") &&
			!(
				this.props.company.companies.length === this.state.hits.length &&
				this.props.company.companies.every(
					(comp, idx) => JSON.stringify(comp) === JSON.stringify(this.state.hits[idx])
				)
			)
		) {
			this.setState({ hits: this.props.company.companies });
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if (Object.keys(this.state.company).length > 0) {
			const newRelationData = {
				id: this.state.company.id.stringValue
			};
			this.props.createRelation(newRelationData, this.props.history);
		}
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};
	handleCancel = () => {
		this.props.history.push("/plan");
	};

	handleChoiceChange = (e) => {
		if (e.target.value && e.target.value !== "") this.props.searchCompanies({ query: e.target.value });
		else this.props.clearCompanies();
	};
	handleSubmitChoice = (e, v) => {
		this.setState({ company: v });
	};

	render () {
		const { classes, UI: { loading } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
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
							<Typography variant='h6' sx={{ mx: "auto", mb: 2 }}>
								Create relation
							</Typography>
							<Box sx={{ mb: 2 }}>
								<Typography variant='body1'>Company</Typography>
								<Autocomplete
									disablePortal
									id='company'
									options={this.state.hits}
									sx={{ width: "100%" }}
									renderInput={(params) => <TextField {...params} />}
									onInputChange={this.handleChoiceChange}
									onChange={this.handleSubmitChoice}
									getOptionLabel={(option) =>
										option.name.stringValue.replace(/(\b\w)/g, function (m, p1) {
											return p1.toUpperCase();
										})}
									loading={this.props.company.loading}
									isOptionEqualToValue={(option, value) =>
										option.name.stringValue === value.name.stringValue}
									renderOption={(props, option, { selected }) => (
										<Box {...props} sx={{ display: "flex", flexDirection: "row" }}>
											<Box sx={{ minWidth: "8rem", marginRight: "8px" }}>
												{option.domain.stringValue !== "-1" ? (
													<img
														height='40px'
														src={`https://logo.clearbit.com/${option.domain.stringValue}`}
														alt={`${option.name.stringValue} logo`}
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
														alt={`${option.name.stringValue} logo`}
													/>
												)}
											</Box>
											<Typography sx={{ textTransform: "capitalize" }}>
												{option.name.stringValue}
											</Typography>
										</Box>
									)}
								/>
								<FormHelperText error={errors.relationCompany ? true : false}>
									{errors.relationCompany}
								</FormHelperText>
							</Box>
							<Box sx={{ display: "flex", flexDirection: "row" }}>
								<Button
									variant='outlined'
									size='large'
									sx={{ mb: 1, mr: "auto" }}
									disabled={loading}
									onClick={this.handleCancel}
								>
									<Typography variant='body1'>Cancel</Typography>
								</Button>
								<Button type='submit' variant='outlined' size='large' sx={{ mb: 1 }} disabled={loading}>
									<Typography variant='body1' sx={{ mr: "8px" }}>
										Save
									</Typography>
									<SendRoundedIcon />
									{loading && <CircularProgress size={30} className={classes.progress} />}
								</Button>
							</Box>
						</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

DiscussNew.propTypes = {
	classes: PropTypes.object.isRequired,
	clearErrors: PropTypes.func.isRequired,
	createRelation: PropTypes.func.isRequired,
	searchCompanies: PropTypes.func.isRequired,
	clearCompanies: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	company: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	company: state.company
});

const mapActionsToProps = {
	clearErrors,
	searchCompanies,
	createRelation,
	clearCompanies
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withHistory(DiscussNew)));
