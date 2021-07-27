import React, { Children } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _ from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { Arrow } from "../Arrow";
import { CanvasAsset } from "../CanvasAsset";
import { Drawer, AppBar, Tabs, Tab } from "@material-ui/core";
import { VPCAsset } from "../VPCAsset";

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

		this.canvasRef = React.createRef();

		this.state = {
			mouseOver: false,
			assets: [],
			arrows: [],
			isArrowBeingDrawn: false,
			menuOpen: false,
			tabValue: 0,
			selectedItem: null,
			assetNextId: 0,
			arrowNextId: 0
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
		const offsetLeft = this.canvasRef.current ? this.canvasRef.current.offsetLeft : 0;
		const offsetTop = this.canvasRef.current ? this.canvasRef.current.offsetTop : 0;

		if (e.dataTransfer.getData("type") === "asset") {
			this.addAsset(e.clientX - offsetLeft, e.clientY - offsetTop, e.dataTransfer.getData("name"));
			e.preventDefault();
			e.stopPropagation();
		}
	};

	addAsset = (x, y, name) => {
		const { assets, assetNextId } = this.state;
		
		const newAsset = {
			id: `asset-${assetNextId}`,
			x: x,
			y: y,
			type: name.toLowerCase(),
			name: name
		};
		this.setDrawer(false);
		this.setState({ assets: [...this.state.assets, newAsset] });

		this.setState({
			assets: name.toLowerCase() === "vpc" ? [newAsset, ...assets] : [...assets, newAsset],
			assetNextId: assetNextId + 1
		});
	};

	deleteAsset = (id) => {
		if (id === this.state.selectedItem) {
			const assetsClone = _.cloneDeep(this.state.assets);
			const arrowsClone = _.cloneDeep(this.state.arrows);

			this.setState({
				assets: assetsClone.filter(a => a.id !== id),
				arrows: arrowsClone.filter(a => a.startRef !== id && a.endId !== id),
				selectedItem: null
			});
		}
	};

	addArrow = (startRef, endRef, endId) => {
		const { arrows, arrowNextId } = this.state;

		const newArrow = {
			id: `arrow-${arrowNextId}`,
			startRef: startRef,
			endRef: endRef,
			endId: endId
		};

		this.setState({
			arrows: [...arrows, newArrow],
			arrowNextId: arrowNextId + 1
		});
		return `arrow-${newArrow.id}`;
	}

	deleteArrow = (id) => {
		if (id === this.state.selectedItem) {
			const arrowsClone = _.cloneDeep(this.state.arrows);

			this.setState({
				arrows: arrowsClone.filter(a => a.id !== id),
				selectedItem: null
			});
		}
	}

	setSelectedItem = (id) => {
		this.setState({ selectedItem: id });
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
		const { tabValue } = this.state;
		this.setState({ tabValue: newTab });
	}

	handleChange = (event, index) => {
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
		const { assets, arrows, isArrowBeingDrawn, selectedItem, isAssetBeingDragged, menuOpen } = this.state;

		return (
			
			<Container
				ref={this.canvasRef}
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
						a.type === "vpc"
							? (
								<VPCAsset
									key={a.id}
									id={a.id}
									metadata={a}
									selectedItem={selectedItem}
									setSelectedItem={this.setSelectedItem}
									deleteAsset={this.deleteAsset}
									toggleAssetBeingDragged={() => {
										this.setState({ isAssetBeingDragged: !isAssetBeingDragged });
									}}
								/>
							) : (
								<CanvasAsset
									key={a.id}
									id={a.id}
									metadata={a}
									isArrowBeingDrawn={isArrowBeingDrawn}
									selectedItem={selectedItem}
									setSelectedItem={this.setSelectedItem}
									toggleArrowDrawn={(status) => {
										this.setState({ isArrowBeingDrawn: status });
									}}
									deleteAsset={this.deleteAsset}
									addArrow={this.addArrow}
									setDrawerButton={this.setDrawerButton}
									toggleAssetBeingDragged={() => {
										this.setState({ isAssetBeingDragged: !isAssetBeingDragged });
									}}
								/>
							)
					);
				}) }
				{ arrows.map((a) => {
					return (
						<Arrow
							key={a.id}
							id={a.id}
							start={a.startRef}
							end={a.endRef}
							selectedItem={selectedItem}
							setSelectedItem={this.setSelectedItem}
							deleteArrow={this.deleteArrow}
							toggleAssetBeingDragged={() => {
								this.setState({ isAssetBeingDragged: !isAssetBeingDragged });
							}}
							setDrawerButton={this.setDrawerButton}
						/>
					);
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