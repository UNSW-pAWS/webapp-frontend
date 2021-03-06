import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _ from "lodash";

import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { SUPPORTED_RESOURCES } from "../../resources/SupportedResources";

import { Asset } from "../Asset";
import { ComputeSvg } from "../../icons/ComputeSvg";
import { DatabaseSvg } from "../../icons/DatabaseSvg";
import { StorageSvg } from "../../icons/StorageSvg";
import { NetworkSvg } from "../../icons/NetworkSvg";

const styles = (theme) => ({
	container: {
		height: "100%",
		width: "100%",
		borderRightWidth: "2px",
		borderRightStyle: "solid",
		borderRightColor: theme.palette.primary.main,
		padding: 0
	},
	tab: {
		minWidth: "100%",
		height: "20%",
		borderRight: "2px solid #FF9900"
	},
	activeTab: {
		backgroundColor: "rgb(255, 153, 0, 0.3)",
		borderRight: "4px solid #FF9900"
	},
	asset: {
		height: "5rem",
		width: "5rem",
		margin: "1rem"
	},
	tabs: {
		height: "100%",
		"& .MuiTabs-flexContainerVertical": {
			height: "100%"
		}
	}
});

export class AssetBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentTab: "compute"
		};
	}

	handleChangeTab = (_, newTab) => {
		this.setState({ currentTab: newTab });
	};

	renderTab = (type) => {
		const { toggleDragging } = this.props;
		const resources = SUPPORTED_RESOURCES.filter(r => r.type === type);

		return (
			_.chunk(resources, 2).map((pair) => {
				return (
					<Grid container item key={`pair-${pair[0].name}`}>
						{
							pair.map((r) => {
								return (
									<Grid container item xs={6} key={r.name}>
										<Asset toggleDragging={toggleDragging} name={r.name}/>
									</Grid>
								);
							})
						}
					</Grid>
				);
			})
		);
	}

	render() {
		const { classes } = this.props;
		const { currentTab } = this.state;

		return (
			<Grid container className={classes.container}>
				<Grid container item xs={3}>
					<Tabs
						orientation={"vertical"}
						variant={"fullWidth"}
						value={currentTab}
						onChange={this.handleChangeTab}
						className={classes.tabs}
						TabIndicatorProps={{
							style: {
								display: "none",
							},
						}}
					>
						<Tab className={clsx(classes.tab, currentTab === "compute" && classes.activeTab)} icon={<ComputeSvg />} value={"compute"}/>
						<Tab className={clsx(classes.tab, currentTab === "database" && classes.activeTab)} icon={<DatabaseSvg />} value={"database"}/>
						<Tab className={clsx(classes.tab, currentTab === "storage" && classes.activeTab)} icon={<StorageSvg />} value={"storage"}/>
						<Tab className={clsx(classes.tab, currentTab === "network" && classes.activeTab)} icon={<NetworkSvg />} value={"network"}/>
					</Tabs>
				</Grid>
				<Grid container item xs={9} direction={"column"}>
					{ this.renderTab(currentTab) }
				</Grid>
			</Grid>
		);
	}

}

AssetBar.propTypes = {
	classes: PropTypes.object.isRequired,
	toggleDragging: PropTypes.func.isRequired
};

export default withStyles(styles)(AssetBar);