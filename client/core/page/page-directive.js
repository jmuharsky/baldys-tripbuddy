goog.provide('tripbuddy.core.page.PageDirective');

goog.require('tripbuddy.core.page.PageStateService');

/**
 * @param {tripbuddy.core.page.PageStateService} pageState
 * @param $state
 * @returns {!PageHeaderDirective}
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.core.page.PageDirective = function(pageState, $state) {
    return {
        restrict: 'E',
        templateUrl: '/core/page/page-directive.html',
        link: function(scope) {
            scope.pageState = pageState;

            scope.$watch(
                'pageState.activePage',
                angular.bind(this, function(new_val) {
                    $state.go(new_val);
                }));
        }
    }
};