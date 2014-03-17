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

    /**
     * @export
     * @type {{data: string, enableRowSelection: boolean, multiSelect: boolean, enableCellEdit: boolean, enableCellEditOnFocus: boolean, columnDefs: *[], selectedItems: Array}}
     */
    this.gridOptions = {
        data: 'data',
        enableRowSelection: true,
        multiSelect: false,
        enableCellEdit: true,
        columnDefs: [
            {field: 'id', displayName: 'ID', enableCellEdit: false, enableCellSelection: false},
            {field:'name', displayName:'Name', enableCellEdit: true, enableCellSelection: true},
            {field:'address.street', displayName:'Street', enableCellEdit: true, enableCellSelection: true},
            {field:'address.city', displayName:'City', enableCellEdit: true, enableCellSelection: true},
            {field:'address.state', displayName:'State', enableCellEdit: true, enableCellSelection: true},
            {field:'address.zip', displayName:'Zip', enableCellEdit: true, enableCellSelection: true},
            {field:'geopt.lat', displayName:'Latitude', enableCellEdit: true, enableCellSelection: true},
            {field:'geopt.lon', displayName:'Longitude', enableCellEdit: true, enableCellSelection: true},
            {field:'image_url', displayName:'Feature Image URL', enableCellEdit: true, enableCellSelection: true},
            {field:'url', displayName:'Web URL', enableCellEdit: true, enableCellSelection: true},
            {field:'notes', displayName:'Notes', enableCellEdit: true, enableCellSelection: true}],
        selectedItems: []
    };
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
 * @export
 */
LocationDataService.prototype.save = function(location) {
    console.log(location);
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
    this.http_({method: 'post', url: '/data/location/create', responseType: 'json', data: {'location': location}}).
        success(angular.bind(this, function(data, status) {
            location['id'] = data['id'];
            this.locations.push(location);
        })).
        error(angular.bind(this, function(data, status) {
            console.log(status);
            console.log(data);
        }));
};

/**
 *
 * @param location
 * @export
 */
LocationDataService.prototype.update = function(location) {
    this.http_({method: 'post', url: '/data/location/update', responseType: 'json', data: {'location': location}}).
        success(angular.bind(this, function(data, status) {
            console.log(data);
        })).
        error(angular.bind(this, function(data, status) {
            console.log(status);
            console.log(data);
        }));
};

/**
 *
 * @param location
 * @export
 */
LocationDataService.prototype.delete = function(location) {
    var data = {'id': location['id']};

    this.http_({method: 'get', url: '/data/location/delete', responseType: 'json', params: data}).
        success(angular.bind(this, function(data, status) {
            this.locations.splice(this.locations.indexOf(location), 1);
            console.log(data);
        })).
        error(angular.bind(this, function(data, status) {
            console.log(status);
            console.log(data);
        }));
};

});  // goog.scope
