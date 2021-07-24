import React from "react";
import PropTypes from "prop-types";

import Xarrow from "react-xarrows";

export class Arrow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		window.addEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown = (e) => {
		const { selectedItem, setSelectedItem, deleteArrow, id } = this.props;

		if (e.key === "Escape" && (selectedItem === id)) {
			setSelectedItem("");
		} else if ((e.key === "Delete" || e.key === "Backspace") && (selectedItem === id)) {
			deleteArrow(id);
		}
	}

	handleSelect = () => {
		const { id, setSelectedItem } = this.props;

		setSelectedItem(id);
	}

	render() {
		const { id, start, end, selectedItem } = this.props;

		return (
			<div>
				<Xarrow
					key={id}
					id={id}
					start={start}
					end={end}
					onClick={this.handleSelect}
					strokeWidth={3}
					color={selectedItem === id ? "#32a852" : "#919191"}
				/>
			</div>
		);
	}
}

Arrow.propTypes = {
	id: PropTypes.string.isRequired,
	start: PropTypes.string.isRequired,
	end: PropTypes.object.isRequired,
	selectedItem: PropTypes.string,
	setSelectedItem: PropTypes.func.isRequired,
	deleteArrow: PropTypes.func.isRequired
};

export default Arrow;