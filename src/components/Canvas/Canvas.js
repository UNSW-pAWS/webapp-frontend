import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Xarrow from "react-xarrows";

import { CanvasAsset } from "../CanvasAsset";
import { Button, Drawer, Grid, TextField } from "@material-ui/core";
import { AppBar } from "@material-ui/core";
import { Tabs } from "@material-ui/core";

const drawerWidth = 500;
var prevAssetID = "asset-0";
var currAssetID;

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
	}, 
	drawerStyle: {
		width: drawerWidth,
		padding: "2rem",
	},
	headingStyle: {
		textAlign: "left",
	},
	buttonStyle: {
		textAlign: "left"
	}

});

export class Canvas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mouseOver: false,
			assets: [],
			arrows: [],
			isArrowBeingDrawn: false,
			menuOpen: false
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
		this.setDrawer(false);
	};

	onDrop = (e) => {
		if (e.dataTransfer.getData("string") === "asset") {
			this.addAsset(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
			e.preventDefault();
			e.stopPropagation();
		}
	};

	addAsset = (x, y) => {
		const { assets } = this.state;
		const assetId = assets.length > 0 
			? parseInt(assets[assets.length-1].id.split("-").pop()) + 1 
			: 0;
		const newAsset = {
			id: `asset-${assetId}`,
			x: x,
			y: y
		};
		this.setDrawer(false);
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

	setDrawer = (isOpen) => {
		const { menuOpen } = this.state;
		this.setState({ menuOpen: isOpen });
		return;
	};

	sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

	setDrawerButton = (id) => {
		const { menuOpen } = this.state;

		var currID = 0;
		var prevID = 0;

		// extracts the integer ID from assetID
		currID = id.match(/\d/g);
		currID = parseInt(currID.join(""));

		prevID = prevAssetID.match(/\d/g);
		prevID = parseInt(prevID.join(""));

		//console.log(currID + " " + prevID);

		if(currID != prevID && menuOpen == true) {
			//flash refresh of drawer
			this.setDrawer(false);
			this.setDrawer(true);
		}
		else {
			this.setDrawer(!menuOpen);
		}
		currAssetID = id;
		prevAssetID = currAssetID;
	};

	DrawerContents = () => (
		<div className={this.props.classes.drawerStyle}>
			<AppBar position="static">
			<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
				<Tab label="Item One" {...a11yProps(0)} />
				<Tab label="Item Two" {...a11yProps(1)} />
				<Tab label="Item Three" {...a11yProps(2)} />
			</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
			Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
			Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
			Item Three
			</TabPanel>
			<h2 className={this.props.classes.headingStyle}>
				{currAssetID}
			</h2>
			<Grid item xs={12}>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Enter your package names"
					multiline
					rows={10}
					rowsMax={10}
				/>
			</Grid>
			<p></p>
			<div className={this.props.classes.buttonStyle}>
				<Button 
					size="medium"
					variant="contained"
				>
					{"check packages"}
				</Button>
			</div>
		</div>
	);

	render() {
		const { classes } = this.props;
		const { assets, arrows, isArrowBeingDrawn, isAssetBeingDragged, menuOpen } = this.state;

		return (
			
			<Container
				className={classes.base}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDragEnd={this.onDragEnd}
				onDrop={this.onDrop}
			>
				<Drawer anchor="right"
				variant="persistent"
				open={menuOpen}
				onClose={() => this.setDrawer(false)}
				className={classes.drawerStyle}
				>
					{this.DrawerContents()}
				</Drawer>

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
							setDrawerButton={this.setDrawerButton}
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