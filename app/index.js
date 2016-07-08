//@flow
'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Map, List, fromJS} from 'immutable';
import {fetch, patch} from 'util/sync'
import {HYDRATE_STATE} from 'actions'

import App from 'containers/App'

type _state = {
	todos: List<{
		label: string,
		content: string
	}>,
	filter:? string
};

let id = -1;

const initialState: _state = fromJS({
	todos: [{
		label: 'label',
		content: 'content'
	}],
	filter: undefined
});
let store = configureStore(initialState);
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('todos')
);

watchStorage();

//$FlowIssue
let cachedState = initialState;
store.subscribe(()=> {
	if (store.getState().equals(cachedState)) return void(0);
	const result = patch(store.getState().toJS());
	cachedState = fromJS(result.store);
	id = result.id;
});

function fetchFromStorage() {
	const result = fetch(id);

	if (result) {
		id = result.id;
		const immutableStore = fromJS(result.store);
		cachedState = immutableStore;
		store.dispatch({
			type: HYDRATE_STATE,
			state: immutableStore
		});

	}
}

function watchStorage () {
	fetchFromStorage();
	window.addEventListener('storage', (e) => e.key === 'id' && fetchFromStorage());
}
