import React from "react";
import PropTypes from "prop-types";
import Xarrow from "react-xarrows";

import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const styles = () => ({
	arrow: {
		color: "rgb(52, 85, 235, 0.3)",
		position: "absolute",
		bottom: 0,
		margin: "0 25% -12px",
		"&:hover": {
			color: "rgb(52, 85, 235, 0.8)"
		}
	}
});

function TopArrowHandler({ classes, componentId, componentRef, toggleArrowHovered, toggleArrowDragging, offset }) {
	const ref = React.createRef();
	const [isBeingDragged, setIsBeingDragged] = React.useState(false);
	const [position, setPosition] = React.useState({});

	const onDragStart = (e) => {
		e.dataTransfer.setData("parent", componentId);
		toggleArrowDragging();
		setIsBeingDragged(true);
	};

	const onDrag = (e) => {
		const x = e.clientX - e.target.parentElement.parentElement.parentElement.parentElement.offsetLeft - offset.left;
		const y = e.clientY - e.target.parentElement.parentElement.parentElement.parentElement.offsetTop - offset.top;
		setPosition({
			position: "absolute",
			left: x + "px",
			top: y + "px",
			opacity: 0
		});
	};

	const onDragEnd = () => {
		toggleArrowDragging();
		setIsBeingDragged(false);
		setPosition({});
	};

	return (
		<React.Fragment>
			<div
				ref={ref}
				style={{...position}}
				className={classes.arrow}
				onMouseEnter={toggleArrowHovered}
				onMouseLeave={toggleArrowHovered}
				onDragStart={onDragStart}
				onDrag={onDrag}
				onDragEnd={onDragEnd}
				draggable
			>
				<ArrowDropDownIcon fontSize={"large"} />
			</div>
			{ isBeingDragged && <Xarrow start={componentRef} end={ref}/>}
		</React.Fragment>
	);

}

TopArrowHandler.propTypes = {
	classes: PropTypes.object.isRequired,
	componentRef: PropTypes.object.isRequired,
	toggleArrowHovered: PropTypes.func.isRequired,
	toggleArrowDragging: PropTypes.func.isRequired,
	offset: PropTypes.object.isRequired,
	componentId: PropTypes.string.isRequired
};

export default withStyles(styles)(TopArrowHandler);

