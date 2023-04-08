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
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { connect } from "react-redux";
import { getRelationData } from "../redux/actions/relationActions";
import Relation from "../components/Plan/Relation";

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

class Plan extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {
		this.props.getRelationData();
	}

	render () {
		const { classes, UI: { loading }, relation: { allRelations, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		const posts =
			allRelations && !loading2 ? allRelations.length === 0 ? (
				<Typography>No Relations</Typography>
			) : (
				allRelations.map((p, idx) => {
					return <Relation post={p} num={idx} key={idx} />;
				})
			) : (
				<Typography>loading</Typography>
			);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Paper className={classes.main}>
						<Paper component='form' elevation={0} className={classes.form}>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder='Search'
								inputProps={{ "aria-label": "search" }}
							/>
							<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
								<SearchIcon />
							</IconButton>
							<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
							{authenticated ? (
								<Link to='/plan/new'>
									<Button
										color='primary'
										sx={{ p: "10px", ml: "12px" }}
										aria-label='create'
										disabled={loading3 || !authenticated}
										variant='outlined'
									>
										<AddIcon />
										New Relation
									</Button>
								</Link>
							) : (
								<Button
									color='primary'
									sx={{ p: "10px", ml: "12px" }}
									aria-label='create'
									disabled={loading3 || !authenticated}
									variant='outlined'
								>
									<AddIcon />
									New Relation
								</Button>
							)}
						</Paper>
						<Box>{posts}</Box>
					</Paper>
				</div>
			</Fragment>
		);
	}
}

Plan.propTypes = {
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
	// loginUser,
	// clearErrors
	getRelationData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Plan));
