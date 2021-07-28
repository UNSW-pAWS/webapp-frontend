/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";

import { Button, Grid, TextField } from "@material-ui/core";

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
			results: [],
			level: [],
		}
	};

	//TODO
	// change button to loading button because api call is slow
	// pull user input from textfield into package_list - move to state

	buttonCheck = () => {
		const request = {
			"package_manager_type" : "npm",
			"package_list" : ["react"],
		}

		axios.post("http://localhost:5000/threat/search", request, {
			headers: {"Content-Type": "application/json"}
		}).then(response => {
			console.log(response.data);
		})

		
			
	};

	buttonClear = () => {
		console.log("clear");
	};

	updateValue = (e) => {
		var newStr = e.target.value;
		console.log(newStr);

	}

	render() {
		const { string } = this.state;

		return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							variant="outlined"
							placeholder="Enter your package names"
							value={string}
							multiline
							rows={10}
							rowsMax={10}
							onChange={this.updateValue}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={6}>
						<Button 
							size="medium"
							variant="contained"
							onClick={this.buttonCheck}
						>
							{"Check Packages"}
						</Button>
					</Grid>
					<Grid item xs={6}>
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
							rows={10}
							rowsMax={10}
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