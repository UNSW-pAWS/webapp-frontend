/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";


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
			strings: []
		}
	}


	buttonCheck = () => {
		console.log(this.props.id);
	};

	buttonClear = () => {
		console.log("clear");
	};

	updateValue = (e) => {
		const { strings } = this.state;
		var newStr = e.target.value;
		console.log(newStr);

	}

	render() {
		const { classes } = this.props;
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