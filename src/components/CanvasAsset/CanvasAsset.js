import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Rnd } from "react-rnd";

import { TopArrowHandler, RightArrowHandler, BottomArrowHandler, LeftArrowHandler } from "../ArrowHandlers";

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
	topArrow: {
		position: "absolute",
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
			arrowDragging: false,
			offset: {
				left: this.props.metadata.x - 30,
				top: this.props.metadata.y - 30
			}
		};
	}

	onDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	onDrag = (_, data) => {
		this.setState({
			offset: {
				left: this.state.offset.left + data.deltaX,
				top: this.state.offset.top + data.deltaY
			}
		});
	};

	onDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	onDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	onDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	onResize = (e, dir, refToElement, delta, position) => {
		this.setState({
			offset: {
				left: position.x,
				top: position.y
			}
		});
	}

	render() {
		const { classes, metadata } = this.props;
		const { hovered, arrowHovered, arrowDragging, offset } = this.state;

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
						<Paper
							className={clsx(classes.asset, arrowDragging && classes.assetBorderGlow)}
							onDragEnter={this.onDragEnter}
							onDragOver={this.onDragOver}
							onDragLeave={this.onDragLeave}
							onDrop={this.onDrop}
						/>
						{ hovered && (
							<>
								<TopArrowHandler
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={() => {
										this.setState({ arrowDragging: !arrowDragging });
									}}
									offset={offset}
								/>
								<RightArrowHandler
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={() => {
										this.setState({ arrowDragging: !arrowDragging });
									}}
									offset={offset}
								/>
								<BottomArrowHandler
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={() => {
										this.setState({ arrowDragging: !arrowDragging });
									}}
									offset={offset}
								/>
								<LeftArrowHandler
									componentRef={this.componentRef}
									toggleArrowHovered={() => {
										this.setState({ arrowHovered: !arrowHovered });
									}}
									toggleArrowDragging={() => {
										this.setState({ arrowDragging: !arrowDragging });
									}}
									offset={offset}
								/>
							</>
						)}
					</div>
				</Rnd>
			</React.Fragment>
		);
	}

}

CanvasAsset.propTypes = {
	classes: PropTypes.object.isRequired,
	metadata: PropTypes.object.isRequired,
	toggleArrowDrawn: PropTypes.func.isRequired,
	isArrowBeingDrawn: PropTypes.bool.isRequired,
	addArrow: PropTypes.func.isRequired,
	deleteArrow: PropTypes.func.isRequired
};

export default withStyles(styles)(CanvasAsset);
