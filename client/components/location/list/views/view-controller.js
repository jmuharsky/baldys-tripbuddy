goog.provide('tripbuddy.components.location.list.LocationListViewCtrl');


goog.scope(function() {
    /**
     *
     * @param $scope
     * @param locationData
     * @ngInject
     * @export
     * @constructor
     */
    tripbuddy.components.location.list.LocationListViewCtrl = function($scope, locationData) {
        this.scope_ = $scope;

        $scope.data = locationData.locations;

        $scope.gridOptions = {
            data: 'data'
        };

        /**
         * @type {LocationDataService}
         * @private
         */
        this.locationData_ = locationData;

        this.refresh();
    };
    var LocationListViewCtrl = tripbuddy.components.location.list.LocationListViewCtrl;

    LocationListViewCtrl.prototype.refresh = function() {
        this.locationData_.list();
    }
});  // goog.scope
