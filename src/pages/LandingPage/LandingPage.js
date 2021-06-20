import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Header } from "../../components/Header";

const styles = (theme) => ({
	baseContainer: {
		marginTop: "2rem",
	},
	formContainer: {
		width: "fit-content",
		marginRight: "1rem"
	},
	textField: {
		display: "flex",
		width: "25rem",
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: theme.palette.primary.main
		},
	},
	input: {
		color: "#FFFFFF"
	},
	button: {
		marginTop: "1rem",
		float: "right"
	},
	resultsContainer: {
		marginTop: "2rem",
		marginLeft: "1rem",
		width: "30rem",
		height: "20rem",
	},
	resultsPaper: {
		width: "100%",
		height: "100%",
		backgroundColor: "#262626"
	},
	resultsTitlePaper: {
		width: "fit-content",
		padding: "0 0.5rem",
		position: "absolute",
		backgroundColor: "#303030"
	},
	resultsTitle: {
		color: "#FF9900"
	}
});

export class LandingPage extends React.Component {

	constructor(props) {
		super(props);
        
		this.state = {};
	}

	componentDidMount() {
		document.body.style.backgroundColor = "#121212";
	}

	render() {
		const { classes } = this.props;

		return (
			<React.Fragment>
				<Header />
				<Grid container>
					<Grid container item xs={6}>
						<Container className={classes.baseContainer}>
							<Container className={classes.formContainer}>
								<TextField
									className={classes.textField}
									multiline
									variant={"outlined"}
									rows={10}
									InputProps={{
										className: classes.input
									}}
								/>
								<Button className={classes.button} variant={"contained"} color={"primary"}>
									<Typography>Go</Typography>
								</Button>
							</Container>
						</Container>
					</Grid>
					<Grid item xs={6}>
						<Container className={classes.resultsContainer}>
							<Paper className={classes.resultsTitlePaper}>
								<Typography 
									className={classes.resultsTitle}
									variant={"overline"}
								>
									Results
								</Typography>
							</Paper>
							<Paper className={classes.resultsPaper}>
							
							</Paper>
						</Container>
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