/**
 * Util
 * Provides a set of utility functions used throughout the code base
 * 
 * @author Brian Hyder <brianhyder@gmail.com>
 * @copyright PencilBlue 2014, All Rights Reserved
 */
function Util(){};

Util.onPromisesOk = function(promises, cb){
	
	var cnt = 0;
	for(var i = 0; i < promises.length; i++){
		
		promises[i].then(function(result){
			
			pb.log.debug("Promise ["+cnt+"] Compelted");
			if(++cnt == promises.length){
				pb.log.debug("All promises Accounted for");
				cb();
			}
		});
	}
};

/**
 * Clones an object by serializing it and then re-parsing it.  
 * NOTE: This probably isn't very efficient.  Need to benchmark it.  
 * WARNING: Objects with circular dependencies will cause an error to be thrown.
 */
Util.clone = function(object){
    return JSON.parse(JSON.stringify(object));
};

/**
 * Assets Not Error.  If the object is an error the function will throw the error.  If the
 */
Util.ane = function(obj){
	if (util.isError(obj)) {
		throw obj;
	}
};

Util.urlJoin = function() {
	var url = '';
	for ( var i = 0; i < arguments.length; i++) {
		var segment = arguments[i];
		if (typeof segment !== 'string') {
			throw new TypeError('Arguments to path.join must be strings');
		}
		if (segment) {
			if (!url) {
				url += segment;
			} else {
				url += '/' + segment;
			}
		}
	}
	return url;
};

Util.getCustomUrl = function(prefix, url) {
	var index = prefix.lastIndexOf('/');
	if (index != prefix.length - 1) {
		prefix += '/';
	}
	
	index = url.lastIndexOf(prefix);
	if (index < 0) {
		return null;
	}
	
	//check for prefix at the end
	if (index == url.length - 1) {
		return '';
	}
	return url.substring(index + 1);
};

/**
 * Merges the properties from the first parameter into the second. This modifies
 * the second parameter instead of creating a new object.
 */
Util.merge = function(from, to) {
	for (var prop in from) {
		to[prop] = from[prop];
	}
};

Util.getTasks = function (iterable, getTaskFunction) {
	var tasks = [];
	for (var i = 0; i < iterable.length; i++) {
		tasks.push(getTaskFunction(iterable, i));
	}
	return tasks;
};

/**
 * Empty callback function just used as a place holder if a callback is required 
 * and the result is not needed.
 */
Util.cb = function(err, result){
	//do nothing
};

Util.uniqueId = function(){
	return new ObjectID();
};

Util.isObject = function(value) {
	return value != undefined && value != null && typeof value === 'object';
};

Util.TIME = {
	
	MILLIS_PER_SEC: 1000,
	MILLIS_PER_MIN: 60000,
	MILLIS_PER_HOUR: 3600000,
	MILLIS_PER_DAY: 86400000
};

module.exports = Util;
