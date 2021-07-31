/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

import { Button, IconButton, Grid, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

var currID = 0;

const styles = (theme) => ({
	buttonLeft: {
		textAlign: "left"
	},
	buttonRight: {
		textAlign: "right"
	},
});

export class DependecyTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: "",
			result: "",
			depth: [1],
			disableSearch: false,
		};
	};

	buttonCheck = () => {
		const { input, depth, currID } = this.state;

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
				"level" : depth[currID]
			};
	
			axios.post("/threat/search", request, {
				baseURL: "http://localhost:5000",
				headers: {"Content-Type": "application/json"},
				timeout: 120000
			}).then(response => {
				this.setState({ result: JSON.stringify(response.data, null, 4) });
				this.setState({ disableSearch: false });
			});
		}
		else {
			this.setState({ result: "Input must be in the form PACKAGE1, PACKAGE2, PACKAGE3..."});
			this.setState({ disableSearch: false });
		}
		
	};

	buttonClear = () => {
		this.setState({ input: "" });
		this.setState({ result: "" });
	};

	updateValue = (e) => {
		var newStr = e.target.value;
		this.setState({ input: newStr });
	}

	incrementDepth = () => {
		const { depth } = this.state;
		var newDepth = depth;

		if(depth[currID] < 4) {
			newDepth[currID]++;
			this.setState({ depth: newDepth });
		};
	}

	decrementDepth = () => {
		const { depth } = this.state;
		var newDepth = depth;

		if(depth[currID] > 1) {
			newDepth[currID]--;
			this.setState({ depth: newDepth });
		};
	}

	// adds extra entities to the state array
	extendArray = (num, arr, contents) => {
		var difference = num - arr.length;
		var content = contents;
		for(var i = 0; i <= difference; i++) {
			arr.push(content);
		}

		this.setState({ depth: arr })
		return arr;
	}

	render() {
		const { input, result, disableSearch, depth } = this.state;
		const { id } = this.props;

		currID = id;
		if(currID >= depth.length) {
			this.extendArray(currID, depth, 1);
		}

		//repeat for input and result

		return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Enter your package names"
							value={input}
							multiline
							rows={5}
							rowsMax={5}
							onChange={this.updateValue}
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
						<TextField 
							value={`Search depth: ${depth[currID]}`}
							textAlign="center"
							variant="outlined"
						/>
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
							value={result}
							rows={30}
							rowsMax={30}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

DependecyTab.propTypes = {
	classes: PropTypes.object.isRequired,
	toggleDragging: PropTypes.func.isRequired
};

export default withStyles(styles)(DependecyTab);