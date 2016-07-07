import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index.js'
import { Iterable } from 'immutable';
import {HYDRATE_STATE} from 'actions'



const stateTransformer = (state) => {
	if (Iterable.isIterable(state)) return state.toJS();
	else return state;
};

const logger = createLogger({
	stateTransformer
});

export default function configureStore(initialState) {
	const store = createStore(
		makeHydratable(rootReducer, HYDRATE_STATE),
		initialState,
		applyMiddleware(thunkMiddleware, logger)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}

function makeHydratable(reducer, hydrateActionType) {
	return function (state, action) {
		switch (action.type) {
			case hydrateActionType:
				return reducer(action.state, action);
			default:
				return reducer(state, action);
		}
	}
}



