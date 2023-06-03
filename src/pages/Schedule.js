import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";

import { connect } from "react-redux";
import { getRelationData } from "../redux/actions/relationActions";

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
	form: {
		padding: `2px 4px`,
		display: "flex",
		alignItems: "center"
	},
	progress: {
		position: "absolute"
	}
});

class Schedule extends Component {
	componentDidMount () {
		this.props.getRelationData();
	}

	render () {
		dayjs.extend(relativeTime);
		const { classes, UI: { loading }, relation } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const stages = [ "Applied", "OA", "Phone", "Final", "Offer", "Rejected" ];

		let dates2 = [];
		if (!relation.loading) {
			const companies = relation.allRelations.map((a) => a.company);
			const dates = relation.allRelations.map((a, i) => {
				return {
					dates: a.info.dates.arrayValue.values,
					idx: i,
					stage: parseInt(a.info.stage.integerValue),
					id: a.info.id.stringValue
				};
			});
			dates.forEach((a) => {
				dates2 = [
					...dates2,
					...a.dates
						.map((date, idx) => {
							return { date: date.stringValue, company: companies[a.idx], idx, id: a.id };
						})
						.filter((d) => d.date !== "")
						.filter((d) => d.idx <= a.stage)
				];
			});
			dates2.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});
		}

		const times = relation.loading ? (
			<Typography>loading</Typography>
		) : dates2.length === 0 ? (
			<Typography>nothing to schedule</Typography>
		) : (
			dates2.map((date) => (
				<Link to={`/plan/${date.id}`} key={`${date.idx}-${date.company.id.stringValue}`}>
					<Paper
						sx={{
							display: "flex",
							flexDirection: "row",
							minHeight: "4rem",
							width: "100%",
							padding: "4px",
							boxSizing: "border-box",
							mb: "16px"
						}}
					>
						<Box sx={{ display: "flex", flexDirection: "row", minWidth: "20rem", maxWidth: "25rem" }}>
							{date.company.domain.stringValue !== "-1" ? (
								<img
									height='40px'
									src={`https://logo.clearbit.com/${date.company.domain.stringValue}`}
									alt={`${date.company.name.stringValue} logo`}
									onError={({ currentTarget }) => {
										currentTarget.onerror = null;
										currentTarget.src =
											"https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media";
									}}
									style={{ maxWidth: "8rem", margin: "auto 8px" }}
								/>
							) : (
								<img
									height='40px'
									src='https://firebasestorage.googleapis.com/v0/b/jobdps-79841.appspot.com/o/public%2Funknown-business-logo.png?alt=media'
									alt={`${date.company.name.stringValue} logo`}
									style={{ margin: "auto 8px" }}
								/>
							)}
							<Box sx={{ m: "auto", textAlign: "center", textTransform: "capitalize" }}>
								<Typography>{date.company.name.stringValue}</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								m: "auto",
								minWidth: "18rem"
							}}
						>
							<Box sx={{ mr: "8px" }}>
								{date.idx === 0 ? (
									<ForwardToInboxRoundedIcon />
								) : date.idx === 1 ? (
									<FactCheckRoundedIcon />
								) : date.idx === 2 ? (
									<PermPhoneMsgRoundedIcon />
								) : date.idx === 3 ? (
									<ContactsRoundedIcon />
								) : date.idx === 4 ? (
									<MonetizationOnRoundedIcon />
								) : date.idx === 5 ? (
									<CancelRoundedIcon />
								) : (
									<span />
								)}
							</Box>
							<Typography sx={{ fontWeight: 700, mr: "4px" }}>{stages[date.idx]}</Typography>
							<Typography sx={{ ml: "auto" }}>{new Date(date.date).toDateString()}</Typography>
						</Box>
					</Paper>
				</Link>
			))
		);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box className={classes.main} sx={{ minWidth: { xs: "4rem", sm: "6rem", md: "36rem" } }}>
						<Paper>
							<Paper className={classes.form} elevation={0}>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder='Search'
									inputProps={{ "aria-label": "search" }}
								/>
								<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
									<SearchIcon />
								</IconButton>
								<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
								<Link to='/plan'>
									<Button
										color='primary'
										sx={{ p: "10px", ml: "12px" }}
										aria-label='create'
										disabled={loading3 || !authenticated}
										variant='outlined'
									>
										<AddIcon />
										Schedule Event
									</Button>
								</Link>
							</Paper>
							<Box sx={{ display: "flex", p: "8px", mb: "16px" }}>
								<Typography>Oldest – Newest</Typography>
							</Box>
						</Paper>
						<Box>{times}</Box>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Schedule.propTypes = {
	classes: PropTypes.object.isRequired,
	getRelationData: PropTypes.func.isRequired,
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
	getRelationData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Schedule));
