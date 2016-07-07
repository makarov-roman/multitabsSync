"use strict";
export function patch(store: Object) {
	console.log('patching');
	let storageId = parseInt(localStorage.getItem('id'));

	if (isNaN(storageId)) storageId = 0;

	localStorage.setItem('store', JSON.stringify(store), ++storageId);
	localStorage.setItem('id', storageId);
	return {id: storageId, store};
}
export function fetch(appId: Object) {
	let storageId = localStorage.getItem('id');

	if(storageId>appId) return {store: JSON.parse(localStorage.getItem('store')), id: storageId};
	return false;
}