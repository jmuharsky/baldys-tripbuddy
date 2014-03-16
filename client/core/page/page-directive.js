goog.provide('tripbuddy.core.page.PageDirective');

goog.require('tripbuddy.core.page.PageStateService');

/**
 * @param {tripbuddy.core.page.PageStateService} pageState
 * @returns {!PageHeaderDirective}
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.core.page.PageDirective = function(pageState, $state) {
    return {
        restrict: 'E',
        templateUrl: '/core/page/page-directive.html',
        link: function(scope, el, attr) {
            scope.pageState = pageState;

            scope.$watch(
                'pageState.activePage',
                angular.bind(this, function(new_val, old_val) {
                    if (new_val == old_val) { return; }
                    $state.go(new_val);
                }));
        }
    }
};