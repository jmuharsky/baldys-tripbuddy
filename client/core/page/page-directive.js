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
        }
    }
};