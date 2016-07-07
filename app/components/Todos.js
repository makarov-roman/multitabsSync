//@flow
'use strict';
import React from 'react';
import {Map} from 'immutable';
import Todo from 'containers/Todo'

type _todos = {
	todos: Map,
	filter?: string
}

export default ({todos, filter}: _todos) => (
	<ul>
		{filter && todos.filter(item => !!(item.get('label').indexOf(filter)+1)).map((item, i) => <Todo todoItem={item} key={i} id={i}/>)}
		{!filter && todos.map((item, i) => <Todo todoItem={item} key={i} id={i}/>)}
	</ul>
)
