//Status codes from http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
exports.statusCodeNames = { 400 : 'Bad Request',
			    401 : 'Unauthorized',
			    402 : 'Payment Required',
			    403 : 'Forbidden',
			    404 : 'Not Found',
			    405 : 'Method Not Allowed',
			    406 : 'Not Acceptable',
			    407 : 'Proxy Authentication Required',
			    408 : 'Request Timeout',
			    409 : 'Conflict',
			    410 : 'Gone',
			    411 : 'Length Required',
			    412 : 'Precondition Failed',
			    413 : 'Request Entity Too Large',
			    414 : 'Request-URI Too Long',
			    415 : 'Unsupported Media Type',
			    416 : 'Request Range Not Satisfiable',
			    417 : 'Expectation Failed',
			    500 : 'Internal Server Error',
			    501 : 'Not Implemented',
			    502 : 'Bad Gateway',
			    503 : 'Service Unavailable',
			    504 : 'Gateway Timeout',
			    505 : 'HTTP Version Not Supported'
			  };

exports.sendError = function (response, statusCode, additional_explanation) {
    //TODO: reconsider using hasOwnProperty, cf Crockford 2008 p. 107
    if (!exports.statusCodeNames.hasOwnProperty(statusCode)) {
	throw('\'' + statusCode + 'not found in error status code list.');
    }
    response.writeHead(statusCode, {'Content-Type' : 'text/plain'});
    response.end(statusCode + ' ' + statusCodeNames[statusCode] + ((additional_explanation !== undefined) ? '\n' + additional_explanation : ''))
    return this;
};