goog.provide('tripbuddy.components.event.EventListDirective');

goog.require('tripbuddy.core.page.PageStateService');

MPG = 24;

DAYS = [
    {'long': 'sunday', 'short': 'sun'},
    {'long': 'monday', 'short': 'mon'},
    {'long': 'tuesday', 'short': 'tue'},
    {'long': 'wednesday', 'short': 'wed'},
    {'long': 'thursday', 'short': 'thu'},
    {'long': 'friday', 'short': 'fri'},
    {'long': 'saturday', 'short': 'sat'},
];

MONTHS = [
    {'long': 'january', 'short': 'jan'},
    {'long': 'february', 'short': 'feb'},
    {'long': 'march', 'short': 'mar'},
    {'long': 'april', 'short': 'apr'},
    {'long': 'may', 'short': 'may'},
    {'long': 'june', 'short': 'jun'},
    {'long': 'july', 'short': 'jul'},
    {'long': 'august', 'short': 'aug'},
    {'long': 'september', 'short': 'sep'},
    {'long': 'october', 'short': 'oct'},
    {'long': 'november', 'short': 'nov'},
    {'long': 'december', 'short': 'dec'},
];

/**
 * @param {tripbuddy.core.page.PageStateService} pageState
 * @returns {{restrict: string, templateUrl: string, link: link}}
 * @ngInject
 * @export
 * @constructor
 */
tripbuddy.components.event.EventListDirective = function(pageState, eventData) {
    return {
        restrict: 'E',
        templateUrl: '/components/event/list/event-list-directive.html',
        link: function(scope, el, attr) {
            /** @export */
            scope.prices = {
                'gas': 4.50
            };

            /** @export */
            scope.days = DAYS;

            /** @export */
            scope.months = MONTHS;

            /** @export */
            scope.prices.mile = scope.prices.gas / MPG;

            /** @export */
            scope.events = [];

            /** @export */
            scope.getCost = function(event) {
                switch (event.event_type) {
                    case 'hotel':
                        return event.nightly_price * event.nights;
                        break;
                    case 'driving':
                        return event.distance * scope.prices.mile;
                }
            };

            /** @export */
            scope.getTotalCost = function() {
                var total = 0;

                angular.forEach(scope.events, function(event) {
                    total += scope.getCost(event);
                });

                return total;
            };

            /** @export */
            scope.refresh = function() {
                var promise = eventData.list();

                promise.then(function(response) {
                    scope.events = response;
                });
            };

            scope.refresh();
        }
    }
};
