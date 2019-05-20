import BaseService from "./base";

class Job extends BaseService {
	constructor() {
		super('/job');
	}

	getOwnCompany(cb) {
		this.request('get', '/company/me', null, cb);
	}

	changeCandidatureStatus(data, cb) {
		this.request('post', '/candidatures/status/update', data, cb);
	}

	addArray(data, cb) {
		this.request('post', '/array/add', data, cb);
	}

	comment(data, cb) {
		this.request('post', '/candidatures/comment', data, cb);
	}

	deleteCategory(data, cb) {
		this.request('post', '/category/delete', data, cb);
	}

	createOffer(data, cb) {
		this.request('post', '/create', data, cb);
	}

	getCandidatureById(id, cb) {
		this.request('get', '/candidatures/' + id, null, cb);
	}

	addCompany(data, cb) {
		this.request('post', '/company/add', data, cb);
	}
}

export default new Job();