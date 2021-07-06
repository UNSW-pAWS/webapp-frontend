import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import { Rnd } from "react-rnd";

const styles = (theme) => ({
	base: {
		width: "100%",
		height: "100%",
		backgroundColor: "#F2F2F2",
		backgroundSize: "30px 30px",
		backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
		backgroundRepeat: "repeat"
	},
	asset: {
		height: "100%",
		width: "100%"
	}
});

export class Canvas extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mouseOver: false,
			assets: []
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
	};

	onDrop = (e) => {
		this.addAsset(e.clientX - e.target.offsetLeft, e.clientY - e.target.offsetTop);
		e.preventDefault();
		e.stopPropagation();
	};

	addAsset = (x, y) => {
		const newAsset = {
			x: x,
			y: y
		};

		this.setState({ assets: [...this.state.assets, newAsset] });
	};

	render() {
		const { classes } = this.props;
		const { assets } = this.state;

		return (
			<Container
				className={classes.base}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				{ assets.map((a) => {
					return (
						<Rnd
							default={{
								x: a.x,
								y: a.y,
								height: 80,
								width: 80
							}}
						>
							<Paper className={classes.asset}/>
						</Rnd>
					);
				}) }
			</Container>
		);
	}

}

Canvas.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.array.isRequired
};

export default withStyles(styles)(Canvas);