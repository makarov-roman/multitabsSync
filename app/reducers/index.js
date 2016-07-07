//@flow
"use strict";

import {combineReducers} from 'redux-immutable';
import {Map, List} from 'immutable'
import {
	SAVE_TODO,
	ADD_TODO,
	UPDATE_FILER
} from 'actions'


function todos(state = List(), action) {
	switch (action.type){
		case SAVE_TODO:
			return state.set(action.id, Map(action.newTodo));
		case ADD_TODO:
			return state.push(Map({label: 'label', content: 'content'}));
		default:
			return state
	}
}
function filter(state = '', action) {
	switch (action.type){
		case UPDATE_FILER:
			return action.newValue;
		default:
			return state
	}
}
export default combineReducers({
	todos,
	filter
});
