import BaseService from './base';

class AuthService extends BaseService {
	constructor() {
		super('/auth');
	}

	signin(data, cb) {
		this.request('post', '/signin', data, cb);
	}

	signup(data, cb) {
		this.request('post', '/signup', data, cb);
	}
}

export default new AuthService()