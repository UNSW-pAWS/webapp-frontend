import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";

import { Header } from "../../components/Header";
import { AssetBar } from "../../components/AssetBar";
import { Canvas } from "../../components/Canvas";

const styles = () => ({
	bodyContainer: {
		height: "calc(100vh - 5rem)"
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
			assets: [],
			dragging: false
		};
	}

	render() {
		const { classes } = this.props;
		const { assets } = this.state;

		return (
			
			<React.Fragment>
				<Header />
				<Grid container className={classes.bodyContainer}>
					<Grid item xs={3} xl={2} className={classes.assetBarContainer}>
						<AssetBar toggleDragging={(val) => { this.setState({ dragging: val }); }}/>
					</Grid>
					<Grid item xs={9} xl={10}>
						<Canvas className="canvas">
							{ assets.map((a) => { return a; })}
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