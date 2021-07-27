import React, { Children } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Xarrow from "react-xarrows";

import { CanvasAsset } from "../CanvasAsset";
import { Drawer, AppBar, Tabs, Tab } from "@material-ui/core";

import { DependecyTab, ConfigTab } from "../Tabs";

const drawerWidth = 600;
var prevAssetID = "asset-0";
var currAssetID;

const styles = (theme) => ({
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
		padding: "1rem"
	},
	headingStyle: {
		textAlign: "left",
	},
	tab: {
		minWidth: "33%",
		height: "20%",
		borderRight: "2px solid #FF9900"
	},
	activeTab: {
		backgroundColor: "rgb(255, 153, 0, 0.3)",
		borderRight: "4px solid #FF9900"
	},
	tabs: {
		width: "100%",
		"& .MuiTabs-flexContainerHorizontal": {
			width: "10%"
		}
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
			menuOpen: false,
			tabValue: 0,
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

	setDrawerButton = (id) => {
		const { menuOpen } = this.state;

		var currID = 0;
		var prevID = 0;
		// extracts the integer ID from assetID
		currID = id.match(/\d/g);
		currID = parseInt(currID.join(""));

		prevID = prevAssetID.match(/\d/g);
		prevID = parseInt(prevID.join(""));

		if(currID != prevID && menuOpen == true) {
			//quick refresh of drawer to current asset
			this.setDrawer(false);
			this.setDrawer(true);
		}
		else {
			this.setDrawer(!menuOpen);
		}
		currAssetID = id;
		prevAssetID = currAssetID;
	};

	changeTab = (event, newTab) => {
		console.log(newTab);
		const { tabValue } = this.state;
		this.setState({ tabValue: newTab });
	}

	handleChange = (event, index) => {
		console.log(index);
		const { tabValue } = this.state;
		this.setState({tabValue: index});
	}

	renderTab = (value) => {
		switch(value) {
			case 0:
				return (
					<DependecyTab
						id={ currAssetID }
					/>
				)

			case 1:
				return (
					<ConfigTab/>
				)

			case 2:
				return(
					<div>hello</div>
				)
			default: {
				return(
					<DependecyTab/>
				)
			}
		}
	}

	// try work out how to use material-ui tabs, react tabs look crap
	// but im sick of trying rn so this is a functional workaround
	DrawerContents = () => {
		const { classes } = this.props;
		const { tabValue } = this.state;
		return (
			<div className={classes.drawerStyle}>
				<h2 className={classes.headingStyle}>
					{currAssetID}
				</h2>

				<AppBar position="static">
					<Tabs 
						variant={"fullWidth"}
						value={tabValue} 
						onChange={this.handleChange} 
						aria-label="simple tabs example"
					>
						<Tab label="item 1" className={clsx(classes.tab, tabValue === 0 && classes.activeTab)} value={0}/>
						<Tab label="item 2" className={clsx(classes.tab, tabValue === 1 && classes.activeTab)} value={1}/>
						<Tab label="item 3" className={clsx(classes.tab, tabValue === 2 && classes.activeTab)} value={2}/>
					</Tabs>
				</AppBar>
				<div>
					{ this.renderTab(tabValue) }
				</div>
			</div>
		);
	};

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
				<Drawer 
					anchor="right"
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
	children: PropTypes.array.isRequired,
};

export default withStyles(styles)(Canvas);