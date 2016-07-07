//@flow
'use strict';
import React, {Component} from 'react';
import {Map, Record} from 'immutable';
/*
	Таким неудобным образом придется описывать модельки, что очень неудобно и не защищает от записи в value невалидного типа.
	Очень уязвимое место.
	Честно говоря, я еще не нашел как это решить. Т.е. или такой кастыль, или мы используем стандартные структуры, или иммутабельные, но без типизации.
	Частично можно отлавливать ошибки в рантайме, если задавать propTypes, но тоже кастыльно.

type _todoItemDeclaration = {
	label: string,
	content: string
}
const _todoItemProto: _todoItemDeclaration = {
	label: '',
	content: ''
};

const _todoItem = Record(_todoItemProto);
 */
export type _todo = {
	content: string,
	label: string,
};


export function renderStaticTodo({content, label}: _todo, editTodo: Function) {
	return (
		<li onClick={editTodo}>
			<span>
				<b>{label}</b>
			</span>
			{'   ' + content}
		</li>
	)
}

export function renderEditableTodo({content, label}: _todo, saveTodo: Function, updateTodo: Function) {
	return (
		<li>
			<input name='label' defaultValue={label} onChange={(e) => updateTodo(e)}/>
			<input name='content' defaultValue={content} onChange={(e) => updateTodo(e)}/>
			<button onClick={saveTodo}>Save</button>
		</li>)
}