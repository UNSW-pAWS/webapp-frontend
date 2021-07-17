import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Rnd } from "react-rnd";

import { TopArrowHandler, RightArrowHandler, BottomArrowHandler, LeftArrowHandler } from "../ArrowHandlers";
import { Grid, Tooltip } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { IconButton } from "@material-ui/core";


const styles = () => ({
	assetOverlay: {
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "relative"
	},
	assetBorderGlow: {
		border: "1px solid #4195FC",
		boxShadow: "0px 0px 5px #4195FC"
	},
	asset: {
		height: "80%",
		width: "80%"
	},
	drawerStyle: {
		width: 200,
	}
});

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

	onDragEnter = (e) => {
		e.preventDefault();
	};

	onDragOver = (e) => {
		e.preventDefault();
	};

	onDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log("1");
	};

	onDrop = (e) => {
		this.props.addArrow(e.dataTransfer.getData("parent"), this.componentRef);
		e.preventDefault();
		e.stopPropagation();
		console.log("1");
	};

	render() {
		const { classes, id, metadata, isArrowBeingDrawn, toggleArrowDrawn } = this.props;
		const { hovered, arrowHovered, offset } = this.state;

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
						{ hovered && (
							<div className={classes.arrowContainer}>
								<TopArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
								/>
								<RightArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
								/>
								<BottomArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
								/>
								<LeftArrowHandler
									componentId={id}
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={toggleArrowDrawn}
									offset={offset}
								/>
							</div>
						)}
						
						<Paper
							id={id}
							className={clsx(classes.asset, isArrowBeingDrawn && classes.assetBorderGlow)}
							onDragEnter={this.onDragEnter}
							onDragOver={this.onDragOver}
							onDragLeave={this.onDragLeave}
							onDrop={this.onDrop}
						>
							<Tooltip title="Open menu">
								<Grid  item xs={1}>
									<IconButton size="small" onClick={() => this.props.setDrawerButton()}>
										<ArrowDropDownIcon fontSize="inherit"/>
									</IconButton>
								</Grid>
							</Tooltip>
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
