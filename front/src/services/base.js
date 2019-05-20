import axios from 'axios';
import Cookies from 'js-cookie';
import config from '../config';

export default class BaseService {
	constructor(path) {
		this.path = path;
	}

	request(method, uri, data, cb) {
		axios({
			method: method,
			url: config.uri.api + this.path + uri,
			data: data,
			headers: {
				'Auth-Token': Cookies.get("token")
			}
		})
			.then(response => {
				cb(null, response);
			})
			.catch(err => {
				cb(err, null);
			});
	}

	getMe(cb) {
		this.request('get', '/me', null, cb);
	}

	getAll(cb) {
		this.request('get', '/all', null, cb);
	}
}