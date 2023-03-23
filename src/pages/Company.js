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
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { connect } from "react-redux";
import { getCompanyData } from "../redux/actions/companyActions";
import CompanyRow from "../components/Company/CompanyRow";

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

class Company extends Component {
	state = {
		errors: {}
	};

	componentDidMount () {
		this.props.getCompanyData({ page: 0 });
	}

	render () {
		const { classes, UI: { loading }, company: { companies, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		// const posts =
		// 	allPosts && !loading2 ? (
		// 		allPosts.map((p, idx) => {
		// 			return (
		// 				<Post
		// 					key={p.info.id.stringValue}
		// 					post={p}
		// 					first={idx === 0 ? true : false}
		// 					last={idx === allPosts.length - 1 ? true : false}
		// 				/>
		// 			);
		// 		})
		// 	) : (
		// 		<Typography>loading</Typography>
		// 	);

		const companyRows =
			companies && !loading2 ? (
				companies.map((comp) => {
					return <CompanyRow company={comp} key={comp.info.id.stringValue} />;
				})
			) : (
				<Typography>loading</Typography>
			);

		return (
			<Fragment>
				<div className={classes.toolbar} />
				<div className={classes.content}>
					<Box className={classes.main}>
						<Paper>
							<Paper component='form' elevation={0} className={classes.form}>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder='Search'
									inputProps={{ "aria-label": "search" }}
								/>
								<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
									<SearchIcon />
								</IconButton>
							</Paper>
						</Paper>
						<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>{companyRows}</Box>
					</Box>
				</div>
			</Fragment>
		);
	}
}

Company.propTypes = {
	classes: PropTypes.object.isRequired,
	getCompanyData: PropTypes.func.isRequired,
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
	getCompanyData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Company));
