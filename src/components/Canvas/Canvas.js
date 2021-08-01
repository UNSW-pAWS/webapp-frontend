import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _, { get } from "lodash";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Arrow } from "../Arrow";
import { CanvasAsset } from "../CanvasAsset";
import { VPCAsset } from "../VPCAsset";
import { DependencyTab, ConfigTab } from "../Tabs";

import { LAMBDA_OPTIONS } from "../../resources/LambdaConfigOptions";
import { RDS_OPTIONS } from "../../resources/RDSConfigOptions";
import { S3_OPTIONS } from "../../resources/S3ConfigOptions";
import { VPC_OPTIONS } from "../../resources/VPCConfigOptions";
import { EC2_OPTIONS } from "../../resources/EC2ConfigOptions";

const drawerWidth = 600;

const CONFIG_OPTIONS_MAP = {
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
			currentDrawerAssetId: null,
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
		const { assets, assetNextId } = this.state;
		
		const newAsset = {
			id: `asset-${assetNextId}`,
			x: x,
			y: y,
			type: name.toLowerCase(),
			name: name,
			configurationOptions: CONFIG_OPTIONS_MAP[name],
			dependencyOptions: {
				input: "",
				result: null,
				depth: 1
			}
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

	setDrawerState = (assetId, state) => {
		this.setState({
			currentDrawerAssetId: assetId,
			menuOpen: state
		}, () => {
			this.setSelectedItem(null);
		});
	};

	changeTab = (_, index) => {
		this.setState({ tabValue: index });
	};

	onDependencyUpdate = (assetId, field, value) => {
		const { assets } = this.state;
		console.log(assetId, field, value)

		if (field !== "input" && field !== "result" && field !== "depth") {
			return;
		};

		const assetsClone = _.cloneDeep(assets);
		const updatedAssetIndex = assetsClone.findIndex((a) => a.id === assetId);
		
		assetsClone[updatedAssetIndex].dependencyOptions[field] = value;

		this.setState({ assets: assetsClone });
	};

	renderTab = (value) => {
		const { currentDrawerAssetId, assets } = this.state;

		const currentAsset = assets.find((a) => a.id === currentDrawerAssetId);

		switch(value) {
			case 0:
				return (
					<DependencyTab
						updateTab={this.onDependencyUpdate}
						asset={currentAsset}
					/>
				)

			case 1:
				return (
					<ConfigTab asset={currentAsset} />
				)

			case 2:
				return (
					<DependencyTab
						asset={currentAsset}
						onUpdate={this.onDependencyUpdate}
					/>
				)
			default: {
				return;
			}
		}
	}

	DrawerContents = () => {
		const { classes } = this.props;
		const { tabValue, currentDrawerAssetId } = this.state;

		return (
			<div className={classes.drawerStyle}>
				<Typography className={classes.headingStyle} variant={"h5"}>
					{currentDrawerAssetId}
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
				onDrop={this.onDrop}
			>
				{ menuOpen && (
					<Drawer 
						anchor="right"
						variant="persistent"
						open={menuOpen}
						onClose={() => this.setDrawerState(null, false)}
						className={classes.drawerStyle}
					>
						{this.DrawerContents()}
					</Drawer>
				)}

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
									setDrawerState={this.setDrawerState}
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