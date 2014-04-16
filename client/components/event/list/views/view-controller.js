goog.provide('tripbuddy.components.event.list.EventListViewCtrl');


goog.scope(function() {
  /**
   *
   * @param $scope
   * @param $state
   * @param eventData
   * @param eventListPage
   * @ngInject
   * @export
   * @constructor
   */
  tripbuddy.components.event.list.EventListViewCtrl = function($scope, $state, eventData, eventListPage) {
    $scope.data = eventData.events;
    $scope.eventListPage = eventListPage;

    $scope.oldEvent = null;

    /** @export @type {ngGrid.GridOptions} */
    $scope.gridOptions = eventData.gridOptions;

    /**
     * @export
     */
    $scope.refresh =  function() {
      eventData.list();
    };

    /**
     * @export
     */
    $scope.open = function() {
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
    $scope.openMap = function() {
      console.log('openMap');
      if ($scope.gridOptions.selectedItems && $scope.gridOptions.selectedItems.length == 1) {
        var event = $scope.gridOptions.selectedItems[0];

        if (event.location && event.location.geopt) {
          url = 'https://maps.google.com?q=' + event.location.geopt.lat + ',' + event.location.geopt.lon;
          window.open(url, '_blank');
        }
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
      eventData.save({'name': 'Untitled event'});
    };

    /**
     * @export
     */
    $scope.delete = function() {
      if (window.confirm('Are you sure you want to delete this event?  This action cannot be undone.')) {
        eventData.delete($scope.gridOptions.selectedItems[0]);
      }
    };

    $scope.$on('ngGridEventStartCellEdit', function(evt){
      $scope.oldEvent = angular.copy(evt.targetScope.row.entity);
    });

    $scope.$on('ngGridEventEndCellEdit', function(evt){
      var updatedEvent = evt.targetScope.row.entity
      var needs_update = !angular.equals($scope.oldEvent, updatedEvent);

      if (needs_update) {
        eventData.save(updatedEvent);
      }
    });

    $scope.refresh();
  };
  var EventListViewCtrl = tripbuddy.components.event.list.EventListViewCtrl;

});  // goog.scope
