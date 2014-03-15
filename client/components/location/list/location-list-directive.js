goog.provide('tripbuddy.components.location.list.LocationListDirective');

goog.require('tripbuddy.components.location.LocationDataService');
goog.require('tripbuddy.core.page.PageStateService');


goog.scope(function() {

/**
 * @param {tripbuddy.core.page.PageStateService} pageState
 * @returns {{restrict: string, templateUrl: string, link: link}}
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.components.location.list.LocationListDirective = function(pageState, locationData) {
    return {
        restrict: 'E',
        templateUrl: '/components/location/list/location-list-directive.html',
        link: function(scope, el, attr) {
            /** @export */
            scope.locationData = locationData;

            /** @export */
            scope.refresh = function() {
                locationData.list();
            };

            scope.refresh();
        }
    }
};

});  // goog.scope
