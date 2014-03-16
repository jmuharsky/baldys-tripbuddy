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

        $scope.gridOptions = {
            data: 'data',
            enableRowSelection: true,
            multiSelect: false,
            enableCellEdit: true,
            enableCellEditOnFocus: true,
            columnDefs: [
                {field: 'id', displayName: 'ID', enableCellEdit: false, enableCellSelection: false},
                {field:'name', displayName:'Name', enableCellEdit: true, enableCellSelection: true}]
        };

        /**
         * @export
         */
        $scope.refresh =  function() {
            locationData.list();
        };

        /**
         * @export
         */
        $scope.create = function() {
            console.log('create');
            locationData.save({'name': 'new creation.'});
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

        /**
         * @export
         */
        $scope.refresh();
    };
    var LocationListViewCtrl = tripbuddy.components.location.list.LocationListViewCtrl;

});  // goog.scope
