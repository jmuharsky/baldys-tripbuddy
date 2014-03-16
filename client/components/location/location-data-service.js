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
            console.log(data);
        }));
};

/**
 * Calls create or update for a location, depending on the existence of an id.
 * @param location
 */
LocationDataService.prototype.save = function(location) {
    if (location['id']) {
        this.update(location);
    } else {
        this.create(location);
    }
};

/**
 *
 * @param location
 * @export
 */
LocationDataService.prototype.create = function(location) {
    this.http_({method: 'post', url: '/data/location/create', responseType: 'json', data: location}).
        success(angular.bind(this, function(data, status) {
            console.log('data: ');
            console.log(data);
            console.log('location: ');
            location['id'] = data['id'];
            this.locations.push(location);
        })).
        error(angular.bind(this, function(data, status) {
            console.log(status);
            console.log(data);
        }));
};

});  // goog.scope
