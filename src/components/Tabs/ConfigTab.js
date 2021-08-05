/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetAppIcon from "@material-ui/icons/GetApp";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
	baseGrid: {
		border: "1px solid #BBBBBB",
		boxSizing: "border-box",
		padding: "0.75em",
		borderRadius: "5px"
	},
	buttonStyle: {
		textAlign: "left"
	},
	checkbox: {
		padding: "5px"
	},
	title: {
		width: "100%",
		textAlign: "left",
		fontWeight: "bold"
	},
	subtitle: {
		color: "#AAAAAA"
	},
	managedRulesGrid: {
		padding: "0 0.5em"
	},
	managedRulesForm: {
		marginBottom: "1em"
	},
	configurationGrid: {
		paddingTop: "0.5em"
	},
	resourceGrid: {
		margin: "0.5em 0"
	},
	resourcePaper: {
		padding: "1em",
		width: "100%"
	},
	resourceHeaderGrid: {
		marginBottom: "1em"
	},
	resourceOptionsRow: {
		margin: "0.5em 0"
	},
	submitButtonGrid: {
		margin: "1em 0.5em 0.5em 0.5em"
	},
	button: {
		margin: "0.5em"
	},
	checkProgress: {
		marginRight: "36px",
		marginTop: "16px",
		position: "absolute"
	}
});

export class ConfigTab extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isSubmitting: false,
			readyForDownload: false,
			cfn: {},
			cfc: "",
			cfnLink: null,
			cfcLink: null
		};
	}

	renderField = (resource, field) => {
		const { classes, asset, onConfigUpdate } = this.props;

		switch (field.type) {
		case "free-text":
			return (
				<TextField
					label={field.propertyId}
					variant={"outlined"}
					value={field.value}
					onChange={(e) => onConfigUpdate(asset.id, resource, field.propertyId, e.target.value)}
				/>
			);
		case "dropdown":
			return (
				<FormControl variant={"outlined"}>
					<InputLabel id={`${field.propertyId}-label`}>{field.propertyId}</InputLabel>
					<Select
						labelId={`${field.propertyId}-label`}
						label={field.propertyId}
						value={field.value}
						onChange={(e) => onConfigUpdate(asset.id, resource, field.propertyId, e.target.value)}
					>
						{ field.values.map((v) => {
							return (
								<MenuItem key={v} value={v}>{v}</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			);
		case "integer":
			return (
				<TextField
					label={field.propertyId}
					variant={"outlined"}
					value={field.value}
					onChange={(e) => onConfigUpdate(asset.id, resource, field.propertyId, e.target.value)}
				/>
			);
		case "json":
			return (
				<TextField
					fullWidth
					multiline
					rows={3}
					label={field.propertyId}
					variant={"outlined"}
					value={field.value}
					onChange={(e) => onConfigUpdate(asset.id, resource, field.propertyId, e.target.value)}
				/>
			);
		case "boolean":
			return (
				<FormControlLabel
					control={
						<Checkbox
							color={"primary"}
							className={classes.checkbox}
							checked={field.value}
							onChange={(e) => onConfigUpdate(asset.id, resource, field.propertyId, e.target.checked)}
						/>
					}
					label={field.propertyId}
				/>
			);
		default:
			return;
		}
	}

	formatPayload = (payload) => {
		const payloadClone = _.cloneDeep(payload);
		Object.keys(payloadClone.options).forEach((r) => {
			delete payloadClone.options[r].multiple;
			delete payloadClone.options[r].required;
			payloadClone.options[r].properties.forEach((p) => {
				Object.keys(p).forEach((k) =>
					(k === "propertyId" || k === "value") || delete p[k]
				);
			});
		});
		return payloadClone;
	}

	handleSubmit = () => {
		const { asset } = this.props;

		this.setState({ isSubmitting: true });

		const payload = this.formatPayload(asset.configurationOptions);

		const cfnPost = axios.post(`https://paws-backend.link/config/generate/cfn?resource=${asset.type}`, payload);
		const cfcPost = axios.post("https://paws-backend.link/config/generate/cfc", payload);

		axios
			.all([cfnPost, cfcPost])
			.then(axios.spread((...responses) => {
				const cfnResponse = responses[0].data;
				const cfcResponse = responses[1].data;

				const cfnBlob = new Blob([JSON.stringify(cfnResponse, null, 2)]);
				const cfcBlob = new Blob([cfcResponse]);
				const cfnDownloadLink= URL.createObjectURL(cfnBlob);
				const cfcDownloadLink = URL.createObjectURL(cfcBlob);

				this.setState({
					readyForDownload: true,
					cfn: cfnResponse,
					cfc: cfcResponse,
					cfnLink: cfnDownloadLink,
					cfcLink: cfcDownloadLink
				});
			}))
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				this.setState({ isSubmitting: false });
			});
	}

	render() {
		const { classes, asset, onRuleUpdate } = this.props;
		const { readyForDownload, cfnLink, cfcLink, isSubmitting } = this.state;

		return (
			<React.Fragment>
				<Grid className={classes.baseGrid} container>
					<Grid container item xs={12} direction={"column"}>
						<Grid container item justify={"flex-start"}>
							<Typography className={classes.title}>AWS Managed Rules</Typography>
							<Typography className={classes.subtitle}>Please select which rules you would like to include</Typography>
						</Grid>
						<Grid className={classes.managedRulesGrid} item>
							<FormGroup className={classes.managedRulesForm}>
								{ asset.configurationOptions.rules.map((r) => {
									return (
										<FormControlLabel
											key={`${asset.id}-${r.ruleName}`}
											control={
												<Checkbox
													color={"primary"}
													className={classes.checkbox}
													checked={r.selected}
													onChange={(e) => onRuleUpdate(asset.id, r.ruleName, e.target.checked)}
												/>
											}
											label={r.ruleName}
										/>
									);
								})}
							</FormGroup>
							<Divider />
						</Grid>
					</Grid>
					<Grid className={classes.configurationGrid} container item xs={12}>
						<Grid container item xs={12} justify={"flex-start"}>
							<Typography className={classes.title}>Configuration</Typography>
							<Typography className={classes.subtitle}>Please select the configuration for each resource</Typography>
						</Grid>
						<Grid container item xs={12}>
							{ Object.keys(asset.configurationOptions.options).map((k) => {
								return (
									<Grid className={classes.resourceGrid} container item xs={12} key={k}>
										<Paper className={classes.resourcePaper}>
											<Grid className={classes.resourceHeaderGrid} container item xs={12}>
												<Grid item xs={12}>
													<Typography>{k}</Typography>
												</Grid>
											</Grid>
											<Grid container item xs={12}>
												{ _.chunk(asset.configurationOptions.options[k].properties, 2).map((propPair) => {
													return (
														<Grid key={`pair-${propPair[0].propertyId}`} className={classes.resourceOptionsRow} container item xs={12}>
															{ propPair.map((p) => {
																return (
																	<Grid key={p.propertyId} container item xs={6}>
																		{this.renderField(k, p)}
																	</Grid>
																);
															})}
														</Grid>
													);
												})}
											</Grid>
										</Paper>
									</Grid>
								);
							})}
						</Grid>
						<Grid container item xs={12} justify={"flex-end"}>
							{ isSubmitting && (
								<CircularProgress className={classes.checkProgress} size={30}/>
							)}
							<Button
								className={classes.submitButtonGrid}
								variant={"contained"}
								color={"primary"}
								onClick={this.handleSubmit}
								disabled={isSubmitting}
							>
								Submit
							</Button>

						</Grid>
					</Grid>
				</Grid>
				<Dialog
					open={readyForDownload}
					onClose={() => {
						this.setState({
							readyForDownload: false,
							cfn: {},
							cfc: "",
							cfnLink: null,
							cfcLink: null
						});
					}}
				>
					<DialogTitle>{`${asset.name}: Configuration files`}</DialogTitle>
					<DialogContent>
						<Grid container>
							<Grid container item>
								<a
									style={{ textDecoration: "none" }}
									href={cfnLink}
									download={`CFNTemplate-${asset.name}.json`}
								>
									<Button
										className={classes.button}
										variant={"contained"}
										color={"primary"}
										startIcon={<GetAppIcon />}
									>
										CloudFormation Template
									</Button>
								</a>
								<a
									style={{ textDecoration: "none" }}
									href={cfcLink}
									download={`ConformancePack-${asset.name}.yaml`}
								>
									<Button
										className={classes.button}
										variant={"contained"}
										color={"primary"}
										startIcon={<GetAppIcon />}
									>
										Conformance Pack
									</Button>
								</a>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							className={classes.button}
							onClick={() => {
								this.setState({
									readyForDownload: false,
									cfn: {},
									cfc: "",
									cfnLink: null,
									cfcLink: null
								});
							}}
						>
							Close
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		);
	}

}

ConfigTab.propTypes = {
	classes: PropTypes.object.isRequired,
	asset: PropTypes.object.isRequired,
	onConfigUpdate: PropTypes.func.isRequired,
	onRuleUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(ConfigTab);