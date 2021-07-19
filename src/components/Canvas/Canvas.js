import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Xarrow from "react-xarrows";

import { CanvasAsset } from "../CanvasAsset";

const styles = () => ({
	base: {
		maxWidth: "100%",
		height: "100%",
		backgroundColor: "#F2F2F2",
		backgroundSize: "30px 30px",
		backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
		backgroundRepeat: "repeat"
	},
	asset: {
		height: "100%",
		width: "100%"
	}
});

export class Canvas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mouseOver: false,
			assets: [],
			arrows: [],
			isArrowBeingDrawn: false
		};
	}

	onDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
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
		if (e.dataTransfer.getData("string") === "asset") {
			this.addAsset(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop, e.dataTransfer.getData("name"));
			e.preventDefault();
			e.stopPropagation();
		}
	};

	addAsset = (x, y, name) => {
		const { assets } = this.state;
		const assetId = assets.length > 0 
			? parseInt(assets[assets.length-1].id.split("-").pop()) + 1 
			: 0;
		const newAsset = {
			id: `asset-${assetId}`,
			x: x,
			y: y,
			type: name.toLowerCase(),
			name: name
		};

		this.setState({ assets: [...this.state.assets, newAsset] });
	};

	addArrow = (startRef, endRef) => {
		const { arrows } = this.state;

		const arrowId = arrows.length > 0 
			? parseInt(arrows[arrows.length-1].id.split("-").pop()) + 1 
			: 0;
		const newArrow = {
			id: `arrow-${arrowId}`,
			startRef: startRef,
			endRef: endRef
		};

		this.setState({ arrows: [...arrows, newArrow] });
		return `arrow-${arrowId}`;
	}

	deleteArrow = (id) => {
		this.setState((prevState) => ({
			arrows: prevState.arrows.filter(a => a.id !== id)
		}));
	}

	render() {
		const { classes } = this.props;
		const { assets, arrows, isArrowBeingDrawn, isAssetBeingDragged } = this.state;

		return (
			<Container
				className={classes.base}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				{ assets.map((a) => {
					return (
						<CanvasAsset
							key={a.id}
							id={a.id}
							metadata={a}
							isArrowBeingDrawn={isArrowBeingDrawn}
							toggleArrowDrawn={() => {
								this.setState({ isArrowBeingDrawn: !isArrowBeingDrawn });
							}}
							addArrow={this.addArrow}
							deleteArrow={this.deleteArrow}
							toggleAssetBeingDragged={() => {
								this.setState({ isAssetBeingDragged: !isAssetBeingDragged });
							}}
						/>
					);
				}) }
				{ arrows.map((a) => {
					return <Xarrow key={a.id} id={a.id} start={a.startRef} end={a.endRef} />;
				}) }
			</Container>
		);
	}

}

Canvas.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired
};

export default withStyles(styles)(Canvas);