import React, { Component, Fragment } from "react";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { connect } from "react-redux";
import { clearErrors, openForm } from "../../redux/actions/userActions";
import { editRelation, editRelationDate } from "../../redux/actions/relationActions";

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
	datePicker: {
		border: 0,
		padding: 0,
		maxWidth: "4.5rem",
		cursor: "pointer",
		textAlign: "center",
		margin: "0 auto",
		"&:focus": {
			outline: 0
		}
	}
});

function CustomStepIcon (props) {
	const handleClick = () => {
		let newStage = props.index;
		if (props.activeStep === props.index) {
			let idx = props.index - 1;
			while (idx >= 0 && props.dates[idx].stringValue === "") idx--;
			newStage = idx;
		}
		props.editRelation(props.id, { stage: newStage });

		if (props.date === "") {
			props.editRelationDate(props.id, { index: props.index, newDate: new Date().toISOString() });
		}
	};

	return (
		<Box
			sx={(theme) => ({
				background:
					(props.completed || props.active) && props.activeStep < 4
						? theme.palette.primary[500]
						: (props.completed || props.active) && props.activeStep === 5
							? theme.palette.error[500]
							: (props.completed || props.active) && props.activeStep === 4
								? theme.palette.success[500]
								: "#ccc",
				zIndex: 1,
				color: "#fff",
				height: 25,
				width: 25,
				display: "flex",
				borderRadius: "50%",
				justifyContent: "center",
				alignItems: "center",
				cursor: "pointer"
			})}
			onClick={handleClick}
		>
			{props.completed || props.active ? props.activeStep === 5 ? (
				<CloseRoundedIcon />
			) : (
				<CheckRoundedIcon />
			) : (
				props.index + 1
			)}
		</Box>
	);
}

class CustomStep extends Component {
	state = {
		date: ""
	};

	componentDidMount () {
		if (this.props.date !== this.state.date) this.setState({ date: this.props.date });
	}

	componentDidUpdate (prevProps) {
		if (prevProps.date !== this.props.date) this.setState({ date: this.props.date });
	}

	handleChange = (date) => {
		this.setState({ date });
	};

	handleAccept = () => {
		this.props.editRelationDate(this.props.id, { index: this.props.index, newDate: this.state.date });
	};

	render () {
		dayjs.extend(relativeTime);
		const CustomInput = (props) => {
			return (
				<input
					ref={props.inputRef}
					{...props.inputProps}
					value={props.value.replace(/\s+/g, "")}
					onClick={props.onClick}
					onChange={props.onChange}
					className={props.className}
				/>
			);
		};

		return (
			<Fragment>
				<StepLabel
					StepIconComponent={CustomStepIcon}
					StepIconProps={{
						index: this.props.index,
						editRelation: this.props.editRelation,
						editRelationDate: this.props.editRelationDate,
						id: this.props.id,
						activeStep: this.props.activeStep,
						date: this.props.date,
						dates: this.props.post.info.dates.arrayValue.values
					}}
				>
					<Box sx={{ display: "flex", flexDirection: "column" }}>
						{this.props.label}
						{this.props.index <= this.props.activeStep ? (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<MobileDatePicker
									value={dayjs(this.state.date)}
									onChange={this.handleChange}
									onAccept={this.handleAccept}
									orientation={"landscape"}
									slots={{ textField: CustomInput }}
									className={this.props.classes.datePicker}
								/>
							</LocalizationProvider>
						) : (
							<span />
						)}
					</Box>
				</StepLabel>
			</Fragment>
		);
	}
}

CustomStep.propTypes = {
	classes: PropTypes.object.isRequired,
	editRelation: PropTypes.func.isRequired,
	editRelationDate: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	openForm: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	relation: PropTypes.object.isRequired,

	index: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	activeStep: PropTypes.number.isRequired,
	date: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI,
	relation: state.relation
});

const mapActionsToProps = {
	editRelation,
	editRelationDate,
	clearErrors,
	openForm
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomStep));
