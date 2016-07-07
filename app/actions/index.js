//@flow
"use strict";

export const SAVE_TODO = 'SAVE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_FILER = 'UPDATE_FILTER';
export const HYDRATE_STATE = 'HYDRATE_STATE';
import type {_todo} from 'components/Todo'

export function addTodo() {
	return {
		type: ADD_TODO
	}
}
export function saveTodo(id:number, newTodo:_todo) {
	return {
		type: SAVE_TODO,
		id,
		newTodo
	}
}
export function updateFilter(newValue: string) {
	return {
		type: UPDATE_FILER,
		newValue
	}
}