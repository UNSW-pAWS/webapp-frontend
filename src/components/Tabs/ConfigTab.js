/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = (theme) => ({
	buttonStyle: {
		textAlign: "left"
	},
});

export class ConfigTab extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		const { classes } = this.props;

		return (
			<div>
				<Button>i do nothing rn</Button>
			</div>
		);
	}

}

ConfigTab.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigTab);