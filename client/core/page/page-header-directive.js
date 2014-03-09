goog.provide('tripbuddy.core.page.PageHeaderDirective');

goog.require('tripbuddy.core.page.PageStateService');

/**
 * @param {ui.router.State} $state
 * @param {tripbuddy.core.page.PageStateService} pageState
 * @returns {!PageHeaderDirective}
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.core.page.PageHeaderDirective = function($state, pageState) {
    return {
        restrict: 'E',
        templateUrl: '/core/page/page-header-directive.html',
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
