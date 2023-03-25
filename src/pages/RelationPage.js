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
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

import { connect } from "react-redux";
import { clearErrors, openForm } from "../redux/actions/userActions";
import { editRelation, getRelation } from "../redux/actions/relationActions";
import Relation from "../components/Plan/Relation";
import withParams from "../util/withParams";

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
		margin: `${theme.spacing(16)} auto`,
		width: "75%"
	},
	progress: {
		position: "absolute"
	}
});

class RelationPage extends Component {
	componentDidMount () {
		this.props.getRelation(this.props.match.params.relationId);
	}

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, relation: { relation, loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const posts =
			relation && !loading2 ? Object.keys(relation).length === 0 ? (
				<Typography>No relation found</Typography>
			) : (
				<Relation post={relation} disableLink />
			) : (
				<Typography>loading</Typography>
			);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box className={classes.main}>
						<Box sx={{ m: "8px" }}>
							<Link to='/plan'>
								<Button>
									<ChevronLeftRoundedIcon />
									<Typography sx={{ marginRight: "8px" }}>View All Relations</Typography>
								</Button>
							</Link>
						</Box>
						<Paper>{posts}</Paper>
					</Box>
				</div>
			</Fragment>
		);
	}
}

RelationPage.propTypes = {
	classes: PropTypes.object.isRequired,
	getRelation: PropTypes.func.isRequired,
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
	getRelation
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(withParams(RelationPage)));
