//@flow
"use strict";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Todos from 'components/Todos';
import Controls from 'containers/Controls';

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<Controls />
				<Todos todos={this.props.todos} filter={this.props.filter}/>
			</div>
		)
	}
}
function mapStateToProps(state:Map) {
	const todos = state.get('todos');
	const filter = state.get('filter');

	return {
		todos,
		filter
	}
}
export default connect(mapStateToProps)(App);
