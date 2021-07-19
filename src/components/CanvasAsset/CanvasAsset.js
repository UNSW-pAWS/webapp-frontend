import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Rnd } from "react-rnd";

import { TopArrowHandler, RightArrowHandler, BottomArrowHandler, LeftArrowHandler } from "../ArrowHandlers";

import { ec2 } from "../../icons/resources/ec2";
import { lambda } from "../../icons/resources/lambda";
import { rds } from "../../icons/resources/rds";
import { s3 } from "../../icons/resources/s3";
import { vpc } from "../../icons/resources/vpc";

const styles = () => ({
	assetOverlay: {
		height: "100%",
		width: "100%",
		position: "relative"
	},
	assetBorderGlow: {
		border: "1px solid #4195FC",
		boxShadow: "0px 0px 5px #4195FC"
	},
	asset: {
		height: "80%",
		width: "80%",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		position: "absolute",
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

export class CanvasAsset extends React.Component {

	constructor(props) {
		super(props);

		this.componentRef = React.createRef();

		this.state = {
			hovered: false,
			arrowClicked: false,
			arrowPositions: {
				top: {},
				right: {},
				bottom: {},
				left: {}
			},
			offset: {
				left: this.props.metadata.x - 30,
				top: this.props.metadata.y - 30
			},
			size: {
				width: 120,
				height: 120
			}
		};
	}

	onResize = (e, dir, refToElement, delta, position) => {
		this.props.toggleAssetBeingDragged();
		this.setState({
			offset: {
				left: position.x,
				top: position.y
			},
			size: {
				width: this.componentRef.current.offsetWidth,
				height: this.componentRef.current.offsetHeight
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

	onDragEnter = (e) => {
		e.preventDefault();
	};

	onDragOver = (e) => {
		e.preventDefault();
	};

	onDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	onDrop = (e) => {
		this.props.addArrow(e.dataTransfer.getData("parent"), this.componentRef);
		e.preventDefault();
		e.stopPropagation();
	};

	render() {
		const { classes, id, metadata, isArrowBeingDrawn, toggleArrowDrawn } = this.props;
		const { hovered, arrowHovered, offset, size } = this.state;

		const ResourceIcon = ICONS[metadata.type];

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
					disableDragging={arrowHovered}
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
						ref={this.componentRef}
						className={classes.assetOverlay}
						onMouseEnter={() => { this.setState({ hovered: true }); }} 
						onMouseLeave={() => { this.setState({ hovered: false }); }}
					>
						{ (
							<>
								<TopArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
									parentSize={size}
								/>
								<RightArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
									parentSize={size}
								/>
								<BottomArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
									parentSize={size}
								/>
								<LeftArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
									parentSize={size}
								/>
							</>
						)}
						<Paper
							id={id}
							className={clsx(classes.asset, isArrowBeingDrawn && classes.assetBorderGlow)}
							onDragEnter={this.onDragEnter}
							onDragOver={this.onDragOver}
							onDragLeave={this.onDragLeave}
							onDrop={this.onDrop}
						>
							<ResourceIcon />
							<Typography>{metadata.name}</Typography>
						</Paper>
					</div>
				</Rnd>
			</React.Fragment>
		);
	}

}

CanvasAsset.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	metadata: PropTypes.object.isRequired,
	toggleArrowDrawn: PropTypes.func.isRequired,
	isArrowBeingDrawn: PropTypes.bool.isRequired,
	addArrow: PropTypes.func.isRequired,
	deleteArrow: PropTypes.func.isRequired,
	toggleAssetBeingDragged: PropTypes.func.isRequired
};

export default withStyles(styles)(CanvasAsset);
