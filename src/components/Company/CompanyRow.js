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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeCommentRoundedIcon from "@mui/icons-material/ModeCommentRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { connect } from "react-redux";
import { clearErrors, openForm } from "../../redux/actions/userActions";
import { editRelation } from "../../redux/actions/relationActions";

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
	}
});

class CompanyRow extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {}

	handleStar = (event) => {
		const newRelationData = {
			starred: event.target.checked ? 1 : 0
		};
		this.props.editRelation(this.props.post.info.id.stringValue, newRelationData);
	};

	stopBubbling = (event) => {
		event.stopPropagation();
	};

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;

		return (
			<Card sx={{ width: "16rem", height: "16rem", margin: "8px" }}>
				<CardContent>
					<img
						height='40px'
						src={`https://logo.clearbit.com/${this.props.company.info.domain.stringValue}`}
						alt={`${this.props.company.info.name.stringValue} logo`}
					/>

					<Box sx={{ display: "flex", flexDirection: "row" }}>
						<Typography sx={{ textTransform: "capitalize", marginRight: "8px", paddingTop: "4px" }}>
							{this.props.company.info.name.stringValue}
						</Typography>
						<a
							href={`https://${this.props.company.info.link.stringValue}`}
							target='_blank'
							rel='noreferrer'
						>
							<IconButton sx={{ width: "32px" }}>
								<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
									<path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
								</svg>
							</IconButton>
						</a>
					</Box>

					<Typography variant='body2' sx={{ textTransform: "capitalize" }}>
						{this.props.company.info.industry.stringValue}
					</Typography>

					{/* <Typography variant='body2' sx={{ textTransform: "capitalize" }}>
						{this.props.company.info.founded.integerValue !== "-1" ? (
							`Founded ${this.props.company.info.founded.integerValue}`
						) : (
							""
						)}
					</Typography> */}

					<Typography variant='body2' sx={{ textTransform: "capitalize" }}>
						{this.props.company.info.size.stringValue} employees
					</Typography>
				</CardContent>
				{/* <CardActions>
					<Button size='small'>Learn More</Button>
				</CardActions> */}
			</Card>
		);
	}
}

CompanyRow.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CompanyRow));
