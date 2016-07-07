//@flow
'use strict';
import React, {Component} from 'react';
import {addTodo, updateFilter} from 'actions';
import {connect} from 'react-redux';

type _controls = {
	filter: string,
	dispatch: Function
}

class Controls extends Component {
	props:_controls;

	constructor() {
		super()
	}

	addTodo = () => {
		this.props.dispatch(addTodo())
	};
	updateFilter = (e: Event) => {
		const target = e.currentTarget;
		if (target instanceof HTMLInputElement) {
			this.props.dispatch(updateFilter(target.value))
		}
	};

	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="filter"
					value={this.props.filter}
					onChange={(e) => this.updateFilter(e)}/>
				<button onClick={this.addTodo}>Add Todo</button>
			</div>
		)
	}
}

function mapStateToProps(state:Map) {
	const filter = state.get('filter');

	return {
		filter
	}
}
export default connect(mapStateToProps)(Controls)