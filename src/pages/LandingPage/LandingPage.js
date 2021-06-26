import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

import { Header } from "../../components/Header";
import { AssetBar } from "../../components/AssetBar";
import { Canvas } from "../../components/Canvas";

const styles = (theme) => ({
	bodyContainer: {
		height: "calc(100vh - 5rem)"
	},
	canvasBase: {
		backgroundColor: "#F2F2F2",
		backgroundSize: "30px 30px",
		backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
		backgroundRepeat: "repeat"
	},
	assetBarContainer: {
		height: "100%"
	},
	blockAsset: {
		width: "8rem",
		height: "8rem",
		margin: "0.5rem 0"
	}
});

export class LandingPage extends React.Component {

	constructor(props) {
		super(props);
        
		this.state = {
			assets: []
		};
	}

	componentDidMount() {

	}

	handleAddAsset = (x, y) => {
		const { classes } = this.props;

		const newAsset = React.createElement(
			Draggable,
			{style: {left: x, top: y}},
			React.createElement(Paper, { elevation: 3, className: classes.blockAsset })
		)
		this.setState({ assets: [...this.state.assets, newAsset] });
	};

	render() {
		const { classes } = this.props;
		const { assets } = this.state;

		return (
			<React.Fragment>
				<Header />
				<Grid container className={classes.bodyContainer}>
					<Grid item xs={2} xl={1} className={classes.assetBarContainer}>
						<AssetBar handleAddAsset={this.handleAddAsset}/>
					</Grid>
					<Grid item xs={10} xl={11} className={classes.canvasBase}>
						<Canvas>
							{ assets.map((a) => { return a })}
						</Canvas>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

LandingPage.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);