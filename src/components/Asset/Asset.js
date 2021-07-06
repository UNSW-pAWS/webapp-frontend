import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
	asset: {
		height: 80,
		width: 80,
		margin: "1rem"
	}
});

export function Asset({ classes }) {

	return (
		<React.Fragment>
			<Paper elevation={3} className={classes.asset} draggable={"true"}/>
		</React.Fragment>
	);

}

Asset.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Asset);