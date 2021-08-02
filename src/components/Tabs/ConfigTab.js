/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

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
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
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
	}
});

export class ConfigTab extends React.Component {

	constructor(props) {
		super(props);
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
				<FormControl>
					<InputLabel>{field.propertyId}</InputLabel>
					<Select
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


	render() {
		const { classes, asset, onRuleUpdate } = this.props;

		return (
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
											<Grid item xs={10}>
												<Typography>{k}</Typography>
											</Grid>
											<Grid container item xs={2} justify={"flex-end"}>
												<IconButton
													size={"small"}
													disabled={asset.configurationOptions.options[k].required}
												>
													<CloseIcon />
												</IconButton>
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
				</Grid>
			</Grid>
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