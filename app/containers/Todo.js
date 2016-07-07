//@flow
'use strict';
import React, {Component} from 'react';
import {Map, Record} from 'immutable';
import {connect} from 'react-redux';
import {saveTodo} from 'actions'
import {
	renderEditableTodo,
	renderStaticTodo
} from 'components/Todo'


type _todo = {
	todoItem: Map,
	id: number,
	dispatch: Function
}

class Todo extends Component {
	constructor(props:_todo) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({todo: nextProps.todoItem.toJS()}, this.forceUpdate());

	}
	state = {
		isEditing: false,
		todo: this.props.todoItem.toJS()
	};
	props:_todo;

	editTodo = () => {
		this.setState({isEditing: true});
	};

	saveTodo = () => {
		this.props.dispatch(saveTodo(this.props.id, this.state.todo));
		this.setState({isEditing: false})
	};

	updateTodo = (e: Event) => {
		const target = e.currentTarget;
		if(target instanceof HTMLInputElement) {
			const newValue = {};
			newValue[target.name] =  target.value;
			this.setState({todo: Object.assign({}, this.state.todo, newValue)})
		}
	};

	render() {
		if (this.state.isEditing) {
			return renderEditableTodo(this.state.todo, this.saveTodo, this.updateTodo)
		}
		return renderStaticTodo(this.state.todo, this.editTodo)

	}
}

export default connect()(Todo)