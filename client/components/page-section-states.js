goog.provide('tripbuddy.components.PageSectionStates');

goog.require('tripbuddy.components.location.list.LocationListViewCtrl');


goog.scope(function() {

/**
 * @param $stateProvider
 * @param $locationProvider
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.components.PageSectionStates = function($stateProvider, $locationProvider) {
    $stateProvider
        .state('events', {
            url: '/events',
            views: {
                'page.leftwell': { templateUrl: '/components/event/list/views/leftwell.html' },
                'page.content': {
                    templateUrl: '/components/event/list/views/content.html'},
                'page.rightwell': { templateUrl: '/components/event/list/views/rightwell.html' },
                'page.footer': { templateUrl: '/components/event/list/views/footer.html' },
                'page.toolbar': { templateUrl: '/components/event/list/views/toolbar.html' }
            }
        })
        .state('event', {
            url: '/event/:eventId',
            views: {
                'page.leftwell': { templateUrl: '/components/event/detail/views/leftwell.html' },
                'page.content': { templateUrl: '/components/event/detail/views/content.html' },
                'page.rightwell': { templateUrl: '/components/event/detail/views/rightwell.html' },
                'page.footer': { templateUrl: '/components/event/detail/views/footer.html' },
                'page.toolbar': { templateUrl: '/components/event/detail/views/toolbar.html' }
            }
        })
        .state('locations', {
            url: '/locations',
            views: {
                'page.leftwell': { templateUrl: '/components/location/list/views/leftwell.html' },
                'page.content': {
                    templateUrl: '/components/location/list/views/content.html',
                    controller: tripbuddy.components.location.list.LocationListViewCtrl},
                'page.rightwell': { templateUrl: '/components/location/list/views/rightwell.html' },
                'page.footer': { templateUrl: '/components/location/list/views/footer.html' },
                'page.toolbar': { templateUrl: '/components/location/list/views/toolbar.html' }
            }
        })
        .state('location', {
            url: '/location/:locationId',
            views: {
                'page.leftwell': { templateUrl: '/components/location/detail/views/leftwell.html' },
                'page.content': { templateUrl: '/components/location/detail/views/content.html' },
                'page.rightwell': { templateUrl: '/components/location/detail/views/rightwell.html' },
                'page.footer': { templateUrl: '/components/location/detail/views/footer.html' },
                'page.toolbar': { templateUrl: '/components/location/detail/views/toolbar.html' }
            }
        });

    $locationProvider.html5Mode(true);
};

});  // goog.scope
