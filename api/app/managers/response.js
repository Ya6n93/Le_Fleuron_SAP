class ResponseManager {
	constructor() {
	}

	static respondWithSuccess(res, code, result = {}, messageCode = "") {
		let response = {
			success: true,
			code: messageCode,
			result: result
		};
		res.status(code).json(response);
	}

	static respondWithError(res, errorCode, result = {}, messageCode = 'UNKNOWN_ERROR') {
		let response = {
			success: false,
			code: messageCode,
			result: result
		};
		res.status(errorCode).json(response);
	}
}

module.exports = ResponseManager;