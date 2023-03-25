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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Slide from "@mui/material/Slide";
import Fab from "@mui/material/Fab";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { connect } from "react-redux";
import { getCompanyData, searchCompanies } from "../redux/actions/companyActions";
import CompanyCard from "../components/Company/CompanyCard";

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

function ListControls (props) {
	const { count, page, rowsPerPage, onPageChange, direction } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ display: "flex", p: "8px" }}>
			<Typography sx={{ paddingTop: "8px", marginRight: "auto", flex: 1 }}>
				{page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, count)} of {count}
			</Typography>

			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
				{direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
				{direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'
			>
				{direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'
			>
				{direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>

			<Box
				sx={{ marginLeft: "auto", display: "flex", flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
			>
				<Typography sx={{ paddingTop: "8px", marginRight: "8px" }}>Companies per page:</Typography>
				<FormControl size='small' variant='standard' sx={{ paddingTop: "8px", marginRight: "8px" }}>
					<Select
						labelId='rowsPerPage'
						id='rowsPerPage'
						value={rowsPerPage}
						label='Age'
						onChange={props.onRowsPerPageChange}
					>
						{props.rowsPerPageOptions.map((op) => (
							<MenuItem value={op} key={op}>
								{op}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
}

class Company extends Component {
	state = {
		errors: {},
		page: 0,
		pageSize: 10,
		companySearch: ""
	};

	componentDidMount () {
		this.props.getCompanyData({ page: this.state.page, pageSize: this.state.pageSize });
	}

	componentDidUpdate (prevProps, prevState) {
		if (prevState.page !== this.state.page || prevState.pageSize !== this.state.pageSize) {
			this.props.getCompanyData({ page: this.state.page, pageSize: this.state.pageSize });
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		// if (this.props.UI.errors) this.props.clearErrors();
	};

	handleChangePage = (e, newPage) => {
		this.setState({ page: newPage });
	};

	handleChangeRowsPerPage = (e) => {
		this.setState({ page: 0, pageSize: parseInt(e.target.value) });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.companySearch === "")
			this.props.getCompanyData({ page: this.state.page, pageSize: this.state.pageSize });
		else this.props.searchCompanies({ query: this.state.companySearch });
	};

	render () {
		const { classes, UI: { loading }, company: { companies, loading: loading2 } } = this.props;
		const { authenticated, loading: loading3 } = this.props.user;
		const { errors } = this.state;
		const companyRows =
			companies && !loading2 ? companies.length === 0 ? (
				<Typography>No companies found</Typography>
			) : (
				companies.map((comp) => {
					return (
						<CompanyCard
							company={comp}
							key={comp.id.stringValue}
							page={this.state.page}
							pageSize={this.state.pageSize}
						/>
					);
				})
			) : (
				<Typography>loading</Typography>
			);

		const ScrollTop = (props) => {
			const trigger = useScrollTrigger({
				disableHysteresis: true,
				threshold: 100
			});

			const handleClick = (event) => {
				const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
				if (anchor) anchor.scrollIntoView({ behavior: "smooth", block: "center" });
			};

			return (
				<Slide direction='up' in={trigger}>
					<Box
						onClick={handleClick}
						sx={(theme) => ({
							position: "fixed",
							bottom: theme.spacing(4),
							right: theme.spacing(4)
						})}
					>
						<Fab color='primary' size='medium' aria-label='scroll back to top'>
							<KeyboardArrowUpIcon />
						</Fab>
					</Box>
				</Slide>
			);
		};

		return (
			<Fragment>
				<div className={classes.toolbar} id='back-to-top-anchor' />
				<div className={classes.content}>
					<Box className={classes.main}>
						<Paper>
							<Paper
								component='form'
								elevation={0}
								className={classes.form}
								onSubmit={this.handleSubmit}
								onChange={this.handleChange}
							>
								<InputBase
									sx={{ ml: 1, flex: 1 }}
									placeholder='Search'
									inputProps={{ "aria-label": "search" }}
									id='companySearch'
									name='companySearch'
								/>
								<IconButton
									type='button'
									sx={{ p: "10px" }}
									aria-label='search'
									onClick={this.handleSubmit}
								>
									<SearchIcon />
								</IconButton>
							</Paper>
							<ListControls
								page={this.state.page}
								rowsPerPage={this.state.pageSize}
								rowsPerPageOptions={[ 10, 25, 100 ]}
								onPageChange={this.handleChangePage}
								onRowsPerPageChange={this.handleChangeRowsPerPage}
								count={498}
							/>
						</Paper>
						<Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>{companyRows}</Box>
					</Box>
				</div>
				<ScrollTop />
			</Fragment>
		);
	}
}

Company.propTypes = {
	classes: PropTypes.object.isRequired,
	getCompanyData: PropTypes.func.isRequired,
	searchCompanies: PropTypes.func.isRequired,
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
	getCompanyData,
	searchCompanies
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Company));
