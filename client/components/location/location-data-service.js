goog.provide('tripbuddy.components.location.LocationDataService');


goog.scope(function() {

/**
 * @ngInject
 * @export
 */
tripbuddy.components.location.LocationDataService = function($http) {
    this.http_ = $http;

    /**
     * @export
     * @type {Array}
     */
    this.locations = [];
};
var LocationDataService = tripbuddy.components.location.LocationDataService;

/**
 * @export
 */
LocationDataService.prototype.list = function() {
    this.http_({method: 'get', url: '/data/location/list', responseType: 'json'}).
        success(angular.bind(this, function(data, status) {
            // The array is merged, not replaced, to preserve bindings.
            this.locations.splice(0, this.locations.length);
            $.merge(this.locations, data);
        })).
        error(angular.bind(this, function(data, status) {
            console.log(status);
        }));
};

});  // goog.scope
