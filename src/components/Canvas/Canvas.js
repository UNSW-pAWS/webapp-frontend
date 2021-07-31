import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _, { get } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Drawer, AppBar, Tabs, Tab, Grid, Button } from "@material-ui/core";

import { Arrow } from "../Arrow";
import { CanvasAsset } from "../CanvasAsset";
import { VPCAsset } from "../VPCAsset";
import { DependecyTab, ConfigTab } from "../Tabs";

const drawerWidth = 800;
var prevAssetID = "asset-0";
var currAssetID = "asset-0";

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
			arrowNextId: 0,
			dependencyTab: [{
				input: "",
				result: "",
				depth: 1,
			}],
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
		const { assets, assetNextId, dependencyTab } = this.state;
		
		const newAsset = {
			id: `asset-${assetNextId}`,
			x: x,
			y: y,
			type: name.toLowerCase(),
			name: name
		};
		
		var newArr = dependencyTab;
		if(assetNextId >= newArr.length) {
			newArr.push({
				input: "",
				result: "",
				depth: 1
			});
		};

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
		this.setState({ menuOpen: isOpen });
	};

	setDrawerButton = (id) => {
		const { menuOpen } = this.state;

		var currID = 0;
		var prevID = 0;

		currID = this.getIntID(id);
		prevID = this.getIntID(prevAssetID);

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

		this.setState({ selectedItem: null });
	};

	getIntID = (id) => {
		var intID = id.match(/\d/g);
		intID = parseInt(intID.join(""));
		return intID;
	}

	changeTab = (event, index) => {
		this.setState({ tabValue: index });
	};

	updateDependencyTab = (id, input, result, depth) => {
		const { dependencyTab } = this.state;
		var newArr = dependencyTab;
		newArr[id].input = input;
		newArr[id].result = result;
		newArr[id].depth = depth;

		if(JSON.stringify(newArr[id]) != JSON.stringify(dependencyTab[id])) {
			this.setState({ dependencyTab: newArr });
		}
	}

	renderTab = (value) => {
		switch(value) {
		case 0:
			return (
				<DependecyTab
					id={this.getIntID(currAssetID)}
					updateTab={this.updateDependencyTab}
					data={this.state.dependencyTab[this.getIntID(currAssetID)]}
				/>
			);
		case 1:
			return (
				<ConfigTab/>
			);
		default: {
			return(
				<DependecyTab/>
			);
		};
		};
	};

	DrawerContents = () => {
		const { classes } = this.props;
		const { tabValue } = this.state;
		return (
			<div className={classes.drawerStyle}>
				<Grid container spacing={3}>
					<Grid item xs={2}>
						<h2 className={classes.headingStyle}>
							{currAssetID}
						</h2>
					</Grid>
					<Grid item xs={2}>
						<Button
							onClick={() => this.setDrawer(false)}
							size="small"
							variant="outlined"
						>
							Close menu
						</Button>
					</Grid>
				</Grid>

				<AppBar position="static">
					<Tabs 
						variant={"fullWidth"}
						value={tabValue} 
						onChange={this.changeTab} 
						aria-label="simple tabs example"
					>
						<Tab label="item 1" className={clsx(classes.tab, tabValue === 0 && classes.activeTab)} value={0}/>
						<Tab label="item 2" className={clsx(classes.tab, tabValue === 1 && classes.activeTab)} value={1}/>
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