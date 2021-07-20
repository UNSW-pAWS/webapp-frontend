import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Rnd } from "react-rnd";

import { vpc } from "../../icons/resources/vpc";

const styles = () => ({
	vpcBorder: {
		height: "100%",
		width: "100%",
		border: "2px solid #4D4D4D",
		borderRadius: "4px"
	},
	asset: {
		height: "70px",
		width: "70px",
		position: "absolute",
		top: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column"
	}
});

export class CanvasAsset extends React.Component {

	constructor(props) {
		super(props);

		this.componentRef = React.createRef();

		this.state = {
			offset: {
				left: this.props.metadata.x - 30,
				top: this.props.metadata.y - 30
			},
		};
	}

	onResize = (e, dir, refToElement, delta, position) => {
		this.props.toggleAssetBeingDragged();
		this.setState({
			offset: {
				left: position.x,
				top: position.y
			}
		});
	};

	onDrag = (_, data) => {
		this.props.toggleAssetBeingDragged();
		this.setState({
			offset: {
				left: this.state.offset.left + data.deltaX,
				top: this.state.offset.top + data.deltaY
			}
		});
	};

	render() {
		const { classes, id, metadata } = this.props;

		const ResourceIcon = vpc;

		return (
			<React.Fragment>
				<Rnd
					default={{
						x: metadata.x - 30,
						y: metadata.y - 30,
						height: 120,
						width: 120
					}}
					bounds={"parent"}
					enableResizing={{
						bottom: false,
						bottomLeft: true,
						bottomRight: true,
						left: false,
						right: false,
						top: false,
						topLeft: true,
						topRight: true
					}}
					onDrag={this.onDrag}
					onResize={this.onResize}
				>
					<div
						className={classes.vpcBorder}
					/>
					<Paper
						id={id}
						className={classes.asset}
					>
						<ResourceIcon />
						<Typography>{metadata.name}</Typography>
					</Paper>
				</Rnd>
			</React.Fragment>
		);
	}

}

CanvasAsset.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	metadata: PropTypes.object.isRequired
};

export default withStyles(styles)(CanvasAsset);
