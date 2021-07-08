import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Rnd } from "react-rnd";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const styles = () => ({
	assetOverlay: {
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	asset: {
		height: "80%",
		width: "80%"
	},
	arrow: {
		color: "rgb(52, 85, 235, 0.3)",
		"&:hover": {
			color: "rgb(52, 85, 235, 0.8)"
		}
	},
	topArrow: {
		position: "absolute",
		transform: "rotate(-90deg)",
		top: 0,
		marginTop: "-12px"
	},
	rightArrow: {
		position: "absolute",
		right: 0,
		marginRight: "-12px"
	},
	bottomArrow: {
		position: "absolute",
		transform: "rotate(90deg)",
		bottom: 0,
		marginBottom: "-12px"
	},
	leftArrow: {
		position: "absolute",
		transform: "rotate(180deg)",
		left: 0,
		marginLeft: "-12px"
	}
});

export class CanvasAsset extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hovered: false,
			arrowClicked: false
		};
	}

	render() {
		const { classes, metadata } = this.props;
		const { hovered, arrowClicked } = this.state;

		return (
			<Rnd
				default={{
					x: metadata.x - 30,
					y: metadata.y - 30,
					height: 120,
					width: 120
				}}
				bounds={"parent"}
				disableDragging={arrowClicked}
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
			>
				<div
					className={classes.assetOverlay}
					onMouseEnter={() => { this.setState({ hovered: true }); }} 
					onMouseLeave={() => { this.setState({ hovered: false }); }}
				>
					<Paper 
						className={classes.asset}
					/>
					{ hovered && (
						<>
							<div 
								className={clsx(classes.arrow, classes.topArrow)}
								onMouseOver={() => { this.setState({ arrowClicked: true }); }}
								onMouseLeave={() => { this.setState({ arrowClicked: false }); }}
								onDragEnd={() => { this.setState({ arrowClicked: false }); }}
								draggable
							>
								<ArrowRightIcon fontSize={"large"}/>
							</div>
							<div 
								className={clsx(classes.arrow, classes.rightArrow)}
								onMouseOver={() => { this.setState({ arrowClicked: true }); }}
								onMouseLeave={() => { this.setState({ arrowClicked: false }); }}
								onDragEnd={() => { this.setState({ arrowClicked: false }); }}
								draggable
							>
								<ArrowRightIcon fontSize={"large"}/>
							</div>
							<div 
								className={clsx(classes.arrow, classes.bottomArrow)}
								onMouseOver={() => { this.setState({ arrowClicked: true }); }}
								onMouseLeave={() => { this.setState({ arrowClicked: false }); }}
								onDragEnd={() => { this.setState({ arrowClicked: false }); }}
								draggable
							>
								<ArrowRightIcon fontSize={"large"}/>
							</div>
							<div 
								className={clsx(classes.arrow, classes.leftArrow)}
								onMouseOver={() => { this.setState({ arrowClicked: true }); }}
								onMouseLeave={() => { this.setState({ arrowClicked: false }); }}
								onDragEnd={() => { this.setState({ arrowClicked: false }); }}
								draggable
							>
								<ArrowRightIcon fontSize={"large"}/>
							</div>
						</>
					)}
				</div>
			</Rnd>
		);
	}

}

CanvasAsset.propTypes = {
	classes: PropTypes.object.isRequired,
	metadata: PropTypes.object.isRequired
};

export default withStyles(styles)(CanvasAsset);
