/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";

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

const styles = (theme) => ({
	buttonStyle: {
		textAlign: "left"
	},
});

export class ConfigTab extends React.Component {

	constructor(props) {
		super(props);
	}

	renderField = (field) => {
		switch (field.type) {
			case "free-text":
				return (
					<TextField
						label={field.propertyId}
						variant={"outlined"}
						value={field.value}
					/>
				);
			case "dropdown":
				return (
					<FormControl>
						<InputLabel>{field.propertyId}</InputLabel>
						<Select
							value={field.value}
						>
							{ field.values.map((v) => {
								return (
									<MenuItem value={v}>{v}</MenuItem>
								)
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
					/>
				);
			case "json":
				return (
					<TextField
						multiline
						rows={3}
						label={field.propertyId}
						variant={"outlined"}
						value={field.value}
					/>
				);
			default:
				return;
		}
	}


	render() {
		const { classes, asset } = this.props;

		console.log(asset)

		return (
			<Grid container>
				<Grid container item xs={12} direction={"column"}>
					<Grid item>
						<Typography>Select which AWS Managed Rules to include in your conformance pack:</Typography>
					</Grid>
					<Grid item>
						<FormGroup>
							{ asset.configurationOptions.rules.map((r) => {
								return (
									<FormControlLabel
										key={`${asset.id}-${r.ruleName}`}
										control={<Checkbox checked={r.selected} />}
										label={r.ruleName}
									/>
								)
							})}
						</FormGroup>
						<Divider />
					</Grid>
				</Grid>
				<Grid container item xs={12} direction={"column"}>
					{ Object.keys(asset.configurationOptions.options).map((k) => {
						return (
							<Grid container key={k}>
								<Grid item>
									<Typography>{k}</Typography>
								</Grid>
								<Grid>
									{ asset.configurationOptions.options[k].properties.map((p) => {
										return this.renderField(p);
									})}
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
		);
	}

}

ConfigTab.propTypes = {
	classes: PropTypes.object.isRequired,
	asset: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfigTab);