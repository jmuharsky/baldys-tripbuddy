goog.provide('tripbuddy.app');
goog.require('tripbuddy.components.event.EventDataService');
goog.require('tripbuddy.components.event.EventListDirective');
goog.require('tripbuddy.components.event.EventListPageService');
goog.require('tripbuddy.components.event.list.EventListViewCtrl');
goog.require('tripbuddy.components.location.LocationDataService');
goog.require('tripbuddy.components.location.list.LocationListViewCtrl');
goog.require('tripbuddy.components.PageSectionStates');
goog.require('tripbuddy.core.page.PageDirective');
goog.require('tripbuddy.core.page.PageStateService');
goog.require('tripbuddy.core.util.HttpPostFix');

tripbuddy.app = angular.module('tripbuddy', ['ui.router', 'ui.bootstrap', 'ngGrid']);

/** Registers services */
tripbuddy.app.service('pageState', tripbuddy.core.page.PageStateService);
tripbuddy.app.service('eventData', tripbuddy.components.event.EventDataService);
tripbuddy.app.service('eventListPage', tripbuddy.components.event.EventListPageService);
tripbuddy.app.service('locationData', tripbuddy.components.location.LocationDataService);

/** Register controllers */
tripbuddy.app.controller('eventListViewCtrl', tripbuddy.components.event.list.EventListViewCtrl);
tripbuddy.app.controller('locationListViewCtrl', tripbuddy.components.location.list.LocationListViewCtrl);

/** Register directives */
tripbuddy.app.directive('page', tripbuddy.core.page.PageDirective);

tripbuddy.app.directive('eventList', tripbuddy.components.event.EventListDirective);

/** Register UI and state routing */
tripbuddy.app.config(tripbuddy.components.PageSectionStates);
