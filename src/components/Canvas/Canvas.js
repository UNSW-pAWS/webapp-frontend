import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _, { get } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
<<<<<<< HEAD
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
=======
import { Drawer, AppBar, Tabs, Tab, Grid, Button } from "@material-ui/core";
>>>>>>> b5a928d128b149c0ade86b67463c26048fbf0044

import { Arrow } from "../Arrow";
import { CanvasAsset } from "../CanvasAsset";
import { VPCAsset } from "../VPCAsset";
import { DependecyTab, ConfigTab } from "../Tabs";

<<<<<<< HEAD
import { LAMBDA_OPTIONS } from "../../resources/LambdaConfigOptions";
import { RDS_OPTIONS } from "../../resources/RDSConfigOptions";
import { S3_OPTIONS } from "../../resources/S3ConfigOptions";
import { VPC_OPTIONS } from "../../resources/VPCConfigOptions";
import { EC2_OPTIONS } from "../../resources/EC2ConfigOptions";

const drawerWidth = 600;
=======
const drawerWidth = 800;
>>>>>>> b5a928d128b149c0ade86b67463c26048fbf0044
var prevAssetID = "asset-0";
var currAssetID = "asset-0";

const OPTIONS_MAP = {
	"EC2": EC2_OPTIONS,
	"Lambda": LAMBDA_OPTIONS,
	"RDS": RDS_OPTIONS,
	"S3": S3_OPTIONS,
	"VPC": VPC_OPTIONS
}

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
		marginBottom: "0.25em",
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
			currentDrawerAsset: {},
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
			name: name,
			options: OPTIONS_MAP[name]
		};
		
		// dynamically extend array
		if(assetNextId >= dependencyTab.length) {
			dependencyTab.push({
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
		this.setState({ selectedItem: null });
	};

	setDrawerButton = (id) => {
		const { assets } = this.state;

		const currAsset = assets.find((a) => a.id === id)

		this.setState({
			currentDrawerAsset: currAsset,
			menuOpen: true
		});
	};

	getIntID = (id) => {
		var intID = id.match(/\d/g);
		intID = parseInt(intID.join(""));
		return intID;
	};

	changeTab = (event, index) => {
		this.setState({ tabValue: index });
	};

	updateDependencyTab = (id, input, result, depth) => {
		const { dependencyTab } = this.state;
		var newArr = [...dependencyTab];
		newArr[id].input = input;
		newArr[id].result = result;
		newArr[id].depth = depth;
		
		if(JSON.stringify(newArr[id]) != JSON.stringify(dependencyTab[id])) {
			this.setState({ dependencyTab: newArr });
			return;
		};
	};

	renderTab = (value) => {
		const { currentDrawerAsset } = this.state;

		switch(value) {
			case 0:
				return (
					<DependecyTab
						asset={currentDrawerAsset}
					/>
				)

			case 1:
				return (
					<ConfigTab asset={currentDrawerAsset} />
				)

			case 2:
				return (
					<DependecyTab
						asset={currentDrawerAsset}
					/>
				)
			default: {
				return;
			}
		}
	}

	DrawerContents = () => {
		const { classes } = this.props;
		const { tabValue, currentDrawerAsset } = this.state;

		return (
			<div className={classes.drawerStyle}>
				<Typography className={classes.headingStyle} variant={"h5"}>
					{currentDrawerAsset && currentDrawerAsset.id}
				</Typography>
				<AppBar position="static">
					<Tabs 
						variant={"fullWidth"}
						value={tabValue} 
						onChange={this.changeTab} 
						aria-label="simple tabs example"
					>
						<Tab label="General" className={clsx(classes.tab, tabValue === 0 && classes.activeTab)} value={0}/>
						<Tab label="Configuration" className={clsx(classes.tab, tabValue === 1 && classes.activeTab)} value={1}/>
						<Tab label="Dependency Checker" className={clsx(classes.tab, tabValue === 2 && classes.activeTab)} value={2}/>
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