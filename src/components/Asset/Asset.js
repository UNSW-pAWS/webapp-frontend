import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { ec2 } from "../../icons/resources/ec2";
import { lambda } from "../../icons/resources/lambda";
import { rds } from "../../icons/resources/rds";
import { s3 } from "../../icons/resources/s3";
import { vpc } from "../../icons/resources/vpc";

const styles = () => ({
	asset: {
		height: 80,
		width: 80,
		margin: "1rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column"
	}
});

const ICONS = {
	ec2,
	lambda,
	rds,
	s3,
	vpc
};

export function Asset({ classes, name }) {

	const onDragStart = (e) => {
		e.dataTransfer.setData("string", "asset");
		e.dataTransfer.setData("name", name);
	};

	const ResourceIcon = ICONS[name.toLowerCase()];

	return (
		<React.Fragment>
			<Paper elevation={3} className={classes.asset} onDragStart={onDragStart} draggable>
				{<ResourceIcon />}
				<Typography>{name}</Typography>
			</Paper>
		</React.Fragment>
	);

}

Asset.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired
};

export default withStyles(styles)(Asset);