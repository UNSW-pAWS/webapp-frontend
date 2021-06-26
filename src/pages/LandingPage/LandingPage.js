import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Header } from "../../components/Header";
import { AssetBar } from "../../components/AssetBar";

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
	}
});

export class LandingPage extends React.Component {

	constructor(props) {
		super(props);
        
		this.state = {};
	}

	componentDidMount() {
	}

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Header />
				<Grid container className={classes.bodyContainer}>
					<Grid item xs={2} xl={1} className={classes.assetBarContainer}>
						<AssetBar />
					</Grid>
					<Grid item xs={10} xl={11} className={classes.canvasBase}>

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