/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import _ from "lodash";

import { withStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CircularProgress from "@material-ui/core/CircularProgress";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
	buttonLeft: {
		textAlign: "left"
	},
	buttonRight: {
		textAlign: "right"
	},
	inputGrid: {
		position: "relative",
		marginBottom: "0.5em"
	},
	clearButton: {
		position: "absolute",
		bottom: 0,
		right: 0
	},
	depthText: {
		marginRight: "0.5em"
	},
	depthNumber: {
		fontWeight: "bold",
		margin: "0 0.25em"
	},
	depthToggleGrid: {
		border: "1px solid #AAAAAA",
		width: "fit-content",
		borderRadius: "5px"
	},
	checkButtonContainer: {
		width: "fit-content",
		marginBottom: "1em",
		marginRight: 0,
		padding: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	checkProgress: {
		position: "absolute"
	},
	resultsGrid: {
		height: "fit-content",
		maxHeight: "calc(100vh - 23em)",
		overflowY: "scroll",
		backgroundColor: "#DEDEDE",
		padding: "0.5em 0",
		borderRadius: "5px"
	},
	accordionBase: {
		width: "100%",
		marginBottom: "0.5em"
	},
	accordianSubtitle: {
		margin: "0 auto 0.25em auto"
	},
	vulnTable: {
		marginBottom: "1em"
	}
});

export class DependencyTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isSearching: false,
		};
	}

	buttonCheck = () => {
		const { asset, onUpdate } = this.props;

		const depth = asset.dependencyOptions.depth; 
		const input = asset.dependencyOptions.input; 

		this.setState({ isSearching: true });
		onUpdate(asset.id, "result", null);

		const regexp = new RegExp("[a-z]+(,\s*[a-z]+)*");

		if (regexp.test(input)) {
			var array = input.trim().split(",").map(function(item) {
				return item.trim();
			});

			const request = {
				"package_manager_type" : "npm",
				"package_list" : array,
				"level" : depth,
				"severity": ["CRITICAL"],
				"date": "None"
			};
	
			axios
				.post(
					"/threat/search",
					request, 
					{ 
						baseURL: "http://dependency.eba-5uazmhpj.ap-southeast-2.elasticbeanstalk.com"
					}
				).then(response => {
					this.setState({ disableSearch: false }, () => {
						onUpdate(asset.id, "result", response.data);
					});
				}).catch((error) => {
					console.log(error);
				}).finally(() => {
					this.setState({ isSearching: false });
				});
		}
		else {
			this.setState({ result: "Input must be in the form PACKAGE1, PACKAGE2, PACKAGE3..."});
			this.setState({ isSearching: false });
		}
		
	};

	buttonClear = () => {
		const { onUpdate, asset } = this.props;

		onUpdate(asset.id, "all", {
			input: "",
			result: null,
			depth: 1
		});
	};

	incrementDepth = () => {
		const { asset, onUpdate } = this.props;

		const depth = asset.dependencyOptions.depth; 

		if(depth < 4) {
			onUpdate(asset.id, "depth", depth + 1);
		}
	};

	decrementDepth = () => {
		const { asset, onUpdate } = this.props;
		
		const depth = asset.dependencyOptions.depth; 

		if(depth > 1) {
			onUpdate(asset.id, "depth", depth - 1);
		}
	};

	renderVulnerabilityResults = (data) => {
		const { classes } = this.props;

		return (
			Object.keys(data).map((p) => {
				return (
					<div key={p} className={classes.accordionBase}>
						<Accordion id={p}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
							>
								<Typography>{p}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container direction={"column"}>
									<Grid container item>
										<Typography className={classes.accordianSubtitle}>Vulnerabilities</Typography>
										<TableContainer className={classes.vulnTable} component={Paper}>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>CVE ID</TableCell>
														<TableCell>Base Score</TableCell>
														<TableCell>Base Severity</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{ data[p][1].length > 0 ? (
														data[p][1].map((v) => {
															return (
																<TableRow key={v.cve_id}>
																	<TableCell>{v.cve_id}</TableCell>
																	<TableCell>{v.base_score}</TableCell>
																	<TableCell>{v.base_severity}</TableCell>
																</TableRow>
															);
														})
													) : (
														<TableRow>
															<TableCell colSpan={3}>No vulnerabilities found</TableCell>
														</TableRow>
													)}
													
												</TableBody>
											</Table>
										</TableContainer>
									</Grid>
									<Grid container item>
										{ !_.isEmpty(data[p][0]) && <Typography className={classes.accordianSubtitle}>Dependencies</Typography> }
										{ this.renderVulnerabilityResults(data[p][0]) }
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>	
					</div>
				);
			})
		);
	}

	render() {
		const { isSearching } = this.state;
		const { classes, asset, onUpdate } = this.props;

		const dependencyOptions = asset.dependencyOptions;

		return (
			<Grid container direction={"column"}>
				<Grid item className={classes.inputGrid}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Enter your package names"
						value={dependencyOptions.input}
						multiline
						rows={5}
						rowsMax={5}
						onChange={(e) => onUpdate(asset.id, "input", e.target.value)}
					/>
					<Button
						className={classes.clearButton}
						color={"primary"}
						onClick={this.buttonClear}
					>
						{"Clear"}
					</Button>
				</Grid>
				<Grid container item>
					<Grid item>
						<Typography variant={"h6"} className={classes.depthText}>Depth</Typography>
					</Grid>
					<Grid container item className={classes.depthToggleGrid}>
						<IconButton 
							onClick={this.incrementDepth}
							size="small"
						>
							<AddIcon/>
						</IconButton>
						<Typography variant={"h6"} className={classes.depthNumber}>{dependencyOptions.depth}</Typography>
						<IconButton 
							onClick={this.decrementDepth}
							size="small"
						>
							<RemoveIcon/>
						</IconButton>
					</Grid>
				</Grid>
				<Grid container item alignItems={"center"}>
					<Container className={classes.checkButtonContainer}>
						{ isSearching && (
							<CircularProgress className={classes.checkProgress} size={30}/>
						)}
						<Button
							color={"primary"}
							variant={"contained"}
							onClick={this.buttonCheck}
							disabled={isSearching}
						>
							{"Check Packages"}
						</Button>
					</Container>
				</Grid>
				{ dependencyOptions.result && (
					<Grid className={classes.resultsGrid} container item>
						<Container>
							{ this.renderVulnerabilityResults(dependencyOptions.result) }
						</Container>
					</Grid>
				)}
			</Grid>
		);
	}
}

DependencyTab.propTypes = {
	classes: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
	asset: PropTypes.object.isRequired
};

export default withStyles(styles)(DependencyTab);