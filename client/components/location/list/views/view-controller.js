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
        $scope.data = locationData.locations;

        $scope.oldLocation = null;

        $scope.gridOptions = locationData.gridOptions;

        /**
         * @export
         */
        $scope.refresh =  function() {
            locationData.list();
        };

        /**
         * @export
         */
        $scope.open = function() {
            console.log('open');
            if ($scope.gridOptions.selectedItems && $scope.gridOptions.selectedItems.length == 1) {
                console.log($scope.gridOptions.selectedItems[0]);
            } else {
                console.log('failed: Need one selectedItem.');
                console.log($scope.gridOptions);
                console.log($scope.data);
            }
        };

        /**
         * @export
         */
        $scope.create = function() {
            console.log('create');
            locationData.save({'name': 'Untitled location'});
        };

        /**
         * @export
         */
        $scope.delete = function() {
            if (window.confirm('Are you sure you want to delete this location?  This action cannot be undone.')) {
                locationData.delete($scope.gridOptions.selectedItems[0]);
            }
        };

        $scope.$on('ngGridEventEndCellEdit', function(evt){
            var updatedLocation = evt.targetScope.row.entity
            var needs_update = !angular.equals($scope.oldLocation, updatedLocation);

            if (needs_update) {
                locationData.save(updatedLocation);
            }
        });

        $scope.$on('ngGridEventStartCellEdit', function(evt){
            $scope.oldLocation = angular.copy(evt.targetScope.row.entity);
        });

        $scope.refresh();
    };
    var LocationListViewCtrl = tripbuddy.components.location.list.LocationListViewCtrl;

});  // goog.scope
