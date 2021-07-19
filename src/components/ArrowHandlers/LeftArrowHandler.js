import React from "react";
import PropTypes from "prop-types";
import Xarrow from "react-xarrows";

import { withStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";

const styles = () => ({
	arrow: {
		color: "rgb(52, 85, 235, 0.3)",
		position: "absolute",
		left: 0,
		marginLeft: "-12px",
		marginTop: "42px",
		"&:hover": {
			color: "rgb(52, 85, 235, 0.8)"
		}
	}
});

function LeftArrowHandler({ classes, componentId, componentRef, toggleArrowHovered, toggleArrowDragging, offset, parentSize }) {
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
				style={{
					...position,
					marginTop: `${(parentSize.height-39)/2}px`
				}}
				className={classes.arrow}
				onMouseEnter={toggleArrowHovered}
				onMouseLeave={toggleArrowHovered}
				onDragStart={onDragStart}
				onDrag={onDrag}
				onDragEnd={onDragEnd}
				draggable
			>
				<ArrowLeftIcon fontSize={"large"} />
			</div>
			{ isBeingDragged && <Xarrow start={componentRef} end={ref}/>}
		</React.Fragment>
	);

}

LeftArrowHandler.propTypes = {
	classes: PropTypes.object.isRequired,
	componentRef: PropTypes.object.isRequired,
	toggleArrowHovered: PropTypes.func.isRequired,
	toggleArrowDragging: PropTypes.func.isRequired,
	offset: PropTypes.object.isRequired,
	componentId: PropTypes.string.isRequired,
	parentSize: PropTypes.object.isRequired
};

export default withStyles(styles)(LeftArrowHandler);

