import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
	container: {
		height: "100%",
		width: "100%",
		padding: "1rem",
		borderRightWidth: "2px",
		borderRightStyle: "solid",
		borderRightColor: theme.palette.primary.main
	},
	assetsContainer: {
		marginTop: "1rem",
		padding: "1rem",
		overflow: "auto",
		height: "calc(100% - 4rem)"
	},
	asset: {
		height: "8rem",
		margin: "0.5rem 0"
	}
});

export class AssetBar extends React.Component {

	constructor(props) {
		super(props);
	}

	handleState = (event) => {
		this.props.handleAddAsset(event.clientX, event.clientY);
	};

	render() {
		const { classes} = this.props;

		return (
			<Container className={classes.container}>
				<TextField
					id="asset-search"
					variant={"outlined"}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Container key="assets-container" className={classes.assetsContainer}>
					<Paper elevation={3} className={classes.asset} onMouseDown={this.handleState}/>
					<Paper elevation={3} className={classes.asset} onMouseDown={this.handleState}/>
					<Paper elevation={3} className={classes.asset} onMouseDown={this.handleState}/>
					<Paper elevation={3} className={classes.asset} onMouseDown={this.handleState}/>
				</Container>
			</Container>
		);
	}

}

AssetBar.propTypes = {
	classes: PropTypes.object.isRequired,
	handleAddAsset: PropTypes.func.isRequired
};

export default withStyles(styles)(AssetBar);