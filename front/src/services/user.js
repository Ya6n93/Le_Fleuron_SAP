import BaseService from './base';

class UserService extends BaseService {
	constructor() {
		super('/user');
	}
}

export default new UserService();