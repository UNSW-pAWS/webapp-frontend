/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

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

const styles = (theme) => ({
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
	}
});

export class DependencyTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isSearching: false,
		};
	};

	buttonCheck = () => {
		const { asset, onUpdate } = this.props

		const depth = asset.dependencyOptions.depth; 
		const input = asset.dependencyOptions.input; 

		this.setState({ isSearching: true });

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
		};
		
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
			onUpdate(asset.id, "depth", depth + 1)
		};
	};

	decrementDepth = () => {
		const { asset, onUpdate } = this.props;
		
		const depth = asset.dependencyOptions.depth; 

		if(depth > 1) {
			onUpdate(asset.id, "depth", depth - 1)
		};
	};

	render() {
		const { isSearching } = this.state;
		const { classes, asset, onUpdate } = this.props;

		const dependencyOptions = asset.dependencyOptions;

		return (
			<Grid container direction={"column"}>
				<Grid item xs={12} className={classes.inputGrid}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Enter your package names"
						value={dependencyOptions.input}
						multiline
						rows={5}
						rowsMax={5}
						onChange={(e) => { onUpdate(asset.id, "input", e.target.value)}}
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
				<Grid container item xs={12} alignItems={"center"}>
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
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="filled"
							multiline
							value={dependencyOptions.result ? JSON.stringify(dependencyOptions.result, null, 4): ""}
							rows={10}
							rowsMax={10}
						/>
					</Grid>
				</Grid>
			</Grid>
		);
	};
};

DependencyTab.propTypes = {
	classes: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
	asset: PropTypes.object.isRequired
};

export default withStyles(styles)(DependencyTab);