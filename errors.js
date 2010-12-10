//Status codes from http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
exports.statusCodes = [400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,500,501,502,503,504,505]

exports.defaultResponses = { 400 : {'Content-Type' : 'text/plain', 'Body' : 'Bad Request'},
			     401 : {'Content-Type' : 'text/plain', 'Body' : 'Unauthorized'},
			     402 : {'Content-Type' : 'text/plain', 'Body' : 'Payment Required'},
			     403 : {'Content-Type' : 'text/plain', 'Body' :'Forbidden'},
			     404 : {'Content-Type' : 'text/plain', 'Body' :'Not Found'},
			     405 : {'Content-Type' : 'text/plain', 'Body' :'Method Not Allowed'},
			     406 : {'Content-Type' : 'text/plain', 'Body' :'Not Acceptable'},
			     407 : {'Content-Type' : 'text/plain', 'Body' :'Proxy Authentication Required'},
			     408 : {'Content-Type' : 'text/plain', 'Body' :'Request Timeout'},
			     409 : {'Content-Type' : 'text/plain', 'Body' :'Conflict'},
			     410 : {'Content-Type' : 'text/plain', 'Body' :'Gone'},
			     411 : {'Content-Type' : 'text/plain', 'Body' :'Length Required'},
			     412 : {'Content-Type' : 'text/plain', 'Body' :'Precondition Failed'},
			     413 : {'Content-Type' : 'text/plain', 'Body' :'Request Entity Too Large',},
			     414 : {'Content-Type' : 'text/plain', 'Body' :'Request-URI Too Long'},,
			     415 : {'Content-Type' : 'text/plain', 'Body' :'Unsupported Media Type'},
			     416 : {'Content-Type' : 'text/plain', 'Body' :'Request Range Not Satisfiable'},
			     417 : {'Content-Type' : 'text/plain', 'Body' :'Expectation Failed'},
			     500 : {'Content-Type' : 'text/plain', 'Body' :'Internal Server Error'},
			     501 : {'Content-Type' : 'text/plain', 'Body' :'Not Implemented'},
			     502 : {'Content-Type' : 'text/plain', 'Body' :'Bad Gateway'},
			     503 : {'Content-Type' : 'text/plain', 'Body' :'Service Unavailable'},
			     504 : {'Content-Type' : 'text/plain', 'Body' :'Gateway Timeout'},
			     505 : {'Content-Type' : 'text/plain', 'Body' :'HTTP Version Not Supported'},
			   };

exports.errors = function (user_error_responses) {
    //user error responses should be a js object and each response should havea 'Content-Type' and 'Body' field
    //use defaultResponses to fill in the gaps in user_error_responses
    var error_responses = {}
    for (statusCode in exports.defaultResponses) {
	if (exports.defaultResponses.hasOwnProperty(statusCode)) {
	    if (user_errors_responses.hasOwnProperty(statusCode)) {
		error_responses[statusCode] = user_errors_responses[statusCode];
	    }
	    else {
		error_responses[statusCode] = exports.defaultResponses[statusCode];
	    }
	}
    }

    var sendError = function(response, statusCode) {
	if(!error_responses.hasOwnProperty(statusCode)) {
	    throw('Response not found for status code ' + statusCode)
	}
	//if the provided response doesn't have a content-type, use text/plain
	//TODO: make the hasOwnProperty test case-insensitive
	response_content_type = (error_responses[statusCode].hasOwnProperty('Content-Type')) ? error_responses[statusCode]['Content-Type'] : 'text/plain';

	response.writeHead(statusCode, {'Content-Type' : response_content_type});
	response.end(error_responses[statusCode])
    }

    return {'responses' = error_responses, 'sendError' : sendError};
}
