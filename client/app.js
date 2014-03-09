goog.provide('tripbuddy.app');
goog.require('tripbuddy.components.event.EventDataService');
goog.require('tripbuddy.components.event.EventListDirective');
goog.require('tripbuddy.core.page.PageDirective');
goog.require('tripbuddy.core.page.PageHeaderDirective');
goog.require('tripbuddy.core.page.PageStateService');

tripbuddy.app = angular.module('tripbuddy', ['ui.router', 'ui.bootstrap']);

/** Registers services */
tripbuddy.app.service('pageState', tripbuddy.core.page.PageStateService);
tripbuddy.app.service('eventData', tripbuddy.components.event.EventDataService);

/** Register controllers */
//tripbuddy.app.controller('pageCtrl', tripbuddy.core.page.PageController);

/** Register directives */
tripbuddy.app.directive('page', tripbuddy.core.page.PageDirective);
tripbuddy.app.directive('pageHeader', tripbuddy.core.page.PageHeaderDirective);

tripbuddy.app.directive('eventList', tripbuddy.components.event.EventListDirective);

tripbuddy.app.config(function($stateProvider, $locationProvider){
    $stateProvider
        .state('events', {
            url: '/events',
            views: {
                'page.leftwell': { templateUrl: '/components/event/list/actions-view.html' },
                'page.content': { templateUrl: '/components/event/list/content-view.html' }
            }
        })
        .state('event', {
            url: '/event/:eventId',
            views: {
                'page.leftwell': { templateUrl: '/components/event/detail/actions-view.html' },
                'page.content': { templateUrl: '/components/event/detail/content-view.html' }
            }
        })
        .state('locations', {
            url: '/locations',
            views: {
                'page.leftwell': { templateUrl: '/components/location/list/actions-view.html' },
                'page.content': { templateUrl: '/components/location/list/content-view.html' }
            }
        })
        .state('location', {
            url: '/location/:locationId',
            views: {
                'page.leftwell': { templateUrl: '/components/location/detail/actions-view.html' },
                'page.content': { templateUrl: '/components/location/detail/content-view.html' }
            }
        });

    $locationProvider.html5Mode(true)
});
