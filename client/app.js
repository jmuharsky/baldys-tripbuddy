goog.provide('tripbuddy.app');
goog.require('tripbuddy.components.event.EventDataService');
goog.require('tripbuddy.components.event.EventListDirective');
goog.require('tripbuddy.components.location.LocationDataService');
goog.require('tripbuddy.components.location.list.LocationListDirective');
goog.require('tripbuddy.components.PageSectionStates');
goog.require('tripbuddy.core.page.PageDirective');
goog.require('tripbuddy.core.page.PageHeaderDirective');
goog.require('tripbuddy.core.page.PageStateService');

tripbuddy.app = angular.module('tripbuddy', ['ui.router', 'ui.bootstrap']);

/** Registers services */
tripbuddy.app.service('pageState', tripbuddy.core.page.PageStateService);
tripbuddy.app.service('eventData', tripbuddy.components.event.EventDataService);
tripbuddy.app.service('locationData', tripbuddy.components.location.LocationDataService);

/** Register controllers */
tripbuddy.app.controller('pageCtrl', tripbuddy.core.page.PageController);

/** Register directives */
tripbuddy.app.directive('page', tripbuddy.core.page.PageDirective);
tripbuddy.app.directive('pageHeader', tripbuddy.core.page.PageHeaderDirective);

tripbuddy.app.directive('eventList', tripbuddy.components.event.EventListDirective);
tripbuddy.app.directive('locationList', tripbuddy.components.location.list.LocationListDirective);

/** Register UI and state routing */
tripbuddy.app.config(tripbuddy.components.PageSectionStates);
