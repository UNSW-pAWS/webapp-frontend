/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const styles = (theme) => ({
	buttonLeft: {
		textAlign: "left"
	},
	buttonRight: {
		textAlign: "right"
	},
});

export class DependencyTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			disableSearch: false,
		};
	};

	buttonCheck = () => {
		const { asset, onUpdate } = this.props
		const { input, depth } = this.state;

		this.setState({ disableSearch: true });
		this.setState({ result: "" });

		const regexp = new RegExp("[a-z]+(,\s*[a-z]+)*");

		if(regexp.test(input)) {
			var array = input.trim().split(",").map(function(item) {
				return item.trim();
			});

			const request = {
				"package_manager_type" : "npm",
				"package_list" : array,
				"level" : depth,
			};
	
			axios.post("/threat/search", request, {
				baseURL: "http://localhost:5000",
				headers: {"Content-Type": "application/json"},
				timeout: 120000
			}).then(response => {
				this.setState({ disableSearch: false }, () => {
					onUpdate(asset.id, "result", JSON.stringify(response.data, null, 4));
				});
			});
		}
		else {
			this.setState({ result: "Input must be in the form PACKAGE1, PACKAGE2, PACKAGE3..."});
			this.setState({ disableSearch: false });
		};
		
	};

	buttonClear = () => {
		const { onUpdate, asset } = this.props;

		onUpdate(asset.id, "input", "");
		onUpdate(asset.id, "result", "")
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
		const { disableSearch } = this.state;
		const { asset, onUpdate } = this.props;

		const dependencyOptions = asset.dependencyOptions;

		return (
			<React.Fragment>
				<Grid container spacing={3}>
					<Grid item xs={12}>
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
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<IconButton 
							onClick={this.incrementDepth}
							size="small"
						>
							<AddIcon/>
						</IconButton>
						<IconButton 
							onClick={this.decrementDepth}
							size="small"
						>
							<RemoveIcon/>
						</IconButton>
						<Typography>{`Search depth: ${dependencyOptions.depth}`}</Typography>
					</Grid>
					
					<Grid item xs={3}>
						<Button 
							size="medium"
							variant="contained"
							onClick={this.buttonCheck}
							disabled={disableSearch}
						>
							{"Check Packages"}
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button 
							size="medium"
							variant="contained"
							onClick={this.buttonClear}
						>
							{"Clear"}
						</Button>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="filled"
							multiline
							value={dependencyOptions.result ? JSON.stringify(dependencyOptions.result, null, 4): ""}
							rows={30}
							rowsMax={30}
						/>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	};
};

DependencyTab.propTypes = {
	classes: PropTypes.object.isRequired,
	onUpdate: PropTypes.func.isRequired,
	asset: PropTypes.object.isRequired
};

export default withStyles(styles)(DependencyTab);