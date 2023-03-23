import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { connect } from "react-redux";
import { clearErrors, openForm } from "../../redux/actions/userActions";
import { editRelation } from "../../redux/actions/relationActions";
import CustomStep from "./CustomStep";

const styles = (theme) => ({
	...theme.spread,
	item: {
		margin: "0 4px",
		padding: "4px",
		"&:hover": {
			backgroundColor: "#e0e0e0"
		}
	},
	progress: {
		position: "absolute"
	},
	accordionSummary: {
		cursor: "default"
	},
	iconButton: {
		marginLeft: "auto"
	}
});

class Relation extends Component {
	state = {
		errors: {},
		status: "0",
		expanded: this.props.disableLink,
		editing: false,
		newNote: ""
	};

	componentDidMount () {
		if (this.props.post.info.status.integerValue !== this.state.status)
			this.setState({ status: this.props.post.info.status.integerValue });
		if (this.props.post.info.notes.stringValue !== this.state.newNote)
			this.setState({ newNote: this.props.post.info.notes.stringValue });
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.post.info.status.integerValue !== this.state.status)
			this.setState({ status: this.props.post.info.status.integerValue });

		if (this.state.editing && this.props.UI.closeForm) {
			this.setState({ editing: false });
			this.props.openForm();
		}
	}

	handleStar = (event) => {
		const newRelationData = {
			starred: event.target.checked ? 1 : 0
		};
		this.props.editRelation(this.props.post.info.id.stringValue, newRelationData);
	};

	handleStatusChange = (event) => {
		const newRelationData = {
			status: parseInt(event.target.value)
		};
		this.props.editRelation(this.props.post.info.id.stringValue, newRelationData);
	};

	stopBubbling = (event) => {
		event.stopPropagation();
	};

	toggleAccordion = (event) => {
		if (!this.props.disableLink) this.setState({ expanded: !this.state.expanded });
	};

	handleEdit = () => {
		this.setState({ editing: true });
	};
	handleEditCancel = () => {
		this.setState({ editing: false });
		this.props.clearErrors();
	};
	handleEditSubmit = (event) => {
		const newRelationData = {
			notes: this.state.newNote
		};
		this.props.editRelation(this.props.post.info.id.stringValue, newRelationData);
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		if (this.props.UI.errors) this.props.clearErrors();
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		const stages = [ "Applied", "OA", "Phone", "Final", "Offer", "Rejected" ];

		return (
			<Accordion expanded={this.state.expanded}>
				<AccordionSummary
					expandIcon={
						this.props.disableLink ? (
							<span />
						) : (
							<IconButton>
								<ExpandMoreIcon />
							</IconButton>
						)
					}
					aria-controls='panel1a-content'
					id='panel1a-header'
					onClick={this.toggleAccordion}
				>
					<Typography variant='h5'>
						{this.props.disableLink ? "" : `${this.props.num + 1}. `}
						{this.props.post.info.company.stringValue}
					</Typography>
					<Box sx={{ ml: "auto", display: "flex", flexDirection: "row" }}>
						<Select
							id='relationStatus'
							value={this.state.status}
							onChange={this.handleStatusChange}
							onClick={this.stopBubbling}
						>
							<MenuItem value={"0"}>In-Progress</MenuItem>
							<MenuItem value={"1"}>To-Do</MenuItem>
							<MenuItem value={"2"}>Ghosted</MenuItem>
							<MenuItem value={"3"}>Canceled</MenuItem>
							<MenuItem value={"4"}>Finished</MenuItem>
						</Select>

						<Checkbox
							icon={<StarBorderRoundedIcon />}
							checkedIcon={<StarRoundedIcon />}
							checked={this.props.post.info.starred.integerValue === "1"}
							inputProps={{ "aria-label": "star company" }}
							onChange={this.handleStar}
							sx={{ width: "40px", height: "40px", m: "auto 0" }}
							onClick={this.stopBubbling}
						/>
						<Typography variant='body2'>
							Added {new Date(this.props.post.info.createdAt.timestampValue).toLocaleDateString()}
						</Typography>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={{ xs: 1, sm: 1, md: 2 }}>
						<Grid item xs={12} sm={12} md={12}>
							<Box display='flex' justifyContent='center' alignItems='center'>
								<Stepper
									activeStep={parseInt(this.props.post.info.stage.integerValue)}
									alternativeLabel
									sx={{ width: "100%" }}
								>
									{stages.map((label, idx) => {
										return (
											<Step key={idx}>
												<CustomStep
													index={idx}
													label={label}
													id={this.props.post.info.id.stringValue}
													activeStep={parseInt(this.props.post.info.stage.integerValue)}
													date={this.props.post.info.dates.arrayValue.values[idx].stringValue}
													post={this.props.post}
												/>
											</Step>
										);
									})}
								</Stepper>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Box display='flex' justifyContent='center' alignItems='center'>
								<Typography>Company website and socials...</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<Box display='flex' justifyContent='center' alignItems='center'>
								<Paper sx={{ width: "100%", minHeight: "10rem", padding: "16px" }}>
									{this.state.editing ? (
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<Typography sx={{ mb: "8px" }}>Notes</Typography>
											<TextField
												placeholder='Write your notes here...'
												multiline
												rows={2}
												error={
													errors[this.props.post.info.id.stringValue] || errors.error ? (
														true
													) : (
														false
													)
												}
												name='newNote'
												id='newNote'
												value={this.state.newNote}
												onChange={this.handleChange}
												fullWidth
												variant='outlined'
												sx={{ mb: "8px" }}
											/>
											<FormHelperText
												error={
													errors[this.props.post.info.id.stringValue] || errors.error ? (
														true
													) : (
														false
													)
												}
												sx={{ mb: "8px" }}
											>
												{errors[this.props.post.info.id.stringValue]} {errors.error}
											</FormHelperText>

											<Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
												<Button
													onClick={this.handleEditCancel}
													variant='outlined'
													sx={{ mr: "auto" }}
													disabled={loading}
												>
													Cancel
												</Button>
												<Button
													variant='outlined'
													disabled={loading}
													color='success'
													onClick={this.handleEditSubmit}
												>
													Save Note
													{loading && (
														<CircularProgress
															size={30}
															className={classes.progress}
															color='success'
														/>
													)}
												</Button>
											</Box>
										</Box>
									) : (
										<Box>
											<Box sx={{ display: "flex", flexDirection: "row" }}>
												<Typography>Notes</Typography>
												<IconButton
													aria-label='edit'
													sx={{ ml: "auto" }}
													color='primary'
													onClick={this.handleEdit}
												>
													<EditRoundedIcon />
												</IconButton>
											</Box>
											{this.props.post.info.notes.stringValue === "" ? (
												<Typography variant='caption' sx={{ fontStyle: "italic" }}>
													{"<empty>"}
												</Typography>
											) : (
												<Typography>{this.props.post.info.notes.stringValue}</Typography>
											)}
										</Box>
									)}
								</Paper>
							</Box>
						</Grid>
						{this.props.disableLink ? (
							<span />
						) : (
							<Grid item xs={12} sm={12} md={12}>
								<IconButton
									size='small'
									component={Link}
									to={`/plan/${this.props.post.info.id.stringValue}`}
									target='_blank'
									sx={{ display: "block", float: "right", width: "40px" }}
								>
									<OpenInNewRoundedIcon fontSize='small' sx={{ paddingTop: "4px" }} />
								</IconButton>
							</Grid>
						)}
					</Grid>
				</AccordionDetails>
			</Accordion>
		);
	}
}

Relation.defaultProps = {
	disableLink: false
};

Relation.propTypes = {
	classes: PropTypes.object.isRequired,
	editRelation: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	openForm: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	relation: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	relation: state.relation
});

const mapActionsToProps = {
	editRelation,
	clearErrors,
	openForm
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Relation));
