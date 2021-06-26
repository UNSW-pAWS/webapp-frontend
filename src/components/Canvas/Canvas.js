import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({

});

export class Canvas extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				{ this.props.children }
			</React.Fragment>
		);
	}

}

Canvas.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired
};

export default withStyles(styles)(Canvas);