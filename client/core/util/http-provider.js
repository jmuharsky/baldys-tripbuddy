/**
 * Modifies the http POST behavior to send encoded strings.  This works as expected with App Engine's request handlers.
 * Copied and modified from http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
 */
goog.provide('tripbuddy.core.util.HttpPostFix');

goog.scope(function() {

/**
 *
 * @param $httpProvider
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.core.util.HttpPostFix = function($httpProvider) {

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var convertToFormUrlEncoded = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    /**
     * Override $http service's default transformRequest
      * @type {*[]}
     */
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? convertToFormUrlEncoded(data) : data;
    }];

    };
});  // goog.scope
