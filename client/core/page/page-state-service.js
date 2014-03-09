goog.provide('tripbuddy.core.page.PageStateService');

/**
 * @ngInject
 * @export
 */
tripbuddy.core.page.PageStateService = function() {
    /**
     * @type {string}
     * @export
     */
    this.title = 'UNSET';

    /**
     * @type {string}
     * @export
     */
    this.activePage = 'events'
};
