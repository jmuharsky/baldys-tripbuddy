goog.provide('tripbuddy.components.event.EventDataService');

/**
 * @ngInject
 * @export
 */
tripbuddy.components.event.EventDataService = function ($q, $timeout) {
  /** @export @type {Array.<!EventModel>} */
  this.events = SAMPLE_DATA;

  /**
   * @return {Promise.<Array.<EventModel>>}
   * @export
   */
  this.list = function () {
      var deferred = $q.defer();

      $timeout(function () {
          deferred.resolve(SAMPLE_DATA);
      });

      return deferred.promise;
  };

  /**
   * @export
   * @type {ngGrid.GridOptions}
   */
  this.gridOptions = {
    data: 'data',
    enableRowSelection: true,
    multiSelect: false,
    enableCellEdit: true,
    columnDefs: [
      {field: 'id', displayName: 'ID', enableCellEdit: false, enableCellSelection: false},
      {field: 'event_type', displayName: 'Type', enableCellEdit: true, enableCellSelection: true},
      {field: 'location.name', displayName: 'Start Location', enableCellEdit: true, enableCellSelection: true},
      {field: 'destination.name', displayName: 'Destination', enableCellEdit: true, enableCellSelection: true},
      {field: 'url', displayName: 'Web URL', enableCellEdit: true, enableCellSelection: true},
      {field: 'date', cellFilter: 'date:\'MMM dd, yyyy\'', displayName: 'Date', enableCellEdit: true, enableCellSelection: true},
      {field: 'distance', displayName: 'Distance', enableCellEdit: true, enableCellSelection: true},
      {field: 'hours', displayName: 'Hours', enableCellEdit: true, enableCellSelection: true},
      {field: 'notes', displayName: 'Notes', enableCellEdit: true, enableCellSelection: true}],
    selectedItems: []
  };

  /**
   * @type {string}
   * @export
   */
  this.activePage = 'events';
};

SAMPLE_DATA = [
    {'id': 1,
        'event_type': 'driving',
        'location': {'name': 'Home', 'address': '27229 NE 145th S., Duvall WA 98019',
            'url': 'http://goo.gl/maps/WJ6c0'},
        'destination': {'name': 'Kalispell', 'address': '350 N Main St Kalispell, MT, 59901',
            'url': 'http://goo.gl/maps/UYpl0'},
        'url': 'http://goo.gl/maps/cHsYd',
        'date': new Date(2014, 6, 18),
        'distance': 525, 'hours': 9},
    {'id': 2,
        'event_type': 'hotel',
        'location': {
            'name': 'Travelodge Kalispell', 'address': '350 N Main St Kalispell, MT, 59901',
            'url': 'http://www.hotels.com/hotel/details.html?pa=7&pn=1&ps=7&tab=description&destinationId=1435619&searchDestination=Kalispell&hotelId=255442&arrivalDate=07-18-14&departureDate=07-19-14&children[0]=2&rooms[0].childrenAges[0]=7&rooms[0].childrenAges[1]=14&rooms[0].numberOfAdults=2&roomno=1&validate=false&previousDateful=false&reviewOrder=date_newest_first'},
        'date': new Date(2014, 6, 18),
        'nightly_price': 150, 'nights': 1},
    {'id': 3,
        'event_type': 'driving',
        'location': {
            'name': 'Kalispell', 'address': '350 N Main St Kalispell, MT, 59901',
            'url': 'http://goo.gl/maps/UYpl0'},
        'destination': {
            'name': 'Glacier National Park',
            'address': 'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434',
            'url': 'http://goo.gl/maps/L6w2J'},
        'url': 'http://goo.gl/maps/7sSEY',
        'date': new Date(2014, 6, 19),
        'distance': 525, 'hours': 4},
    {'id': 3,
        'event_type': 'hotel',
        'location': {
            'name': 'Many Glacier Hotel',
            'address': 'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434',
            'url': 'https://www.nationalparkreservations.com/lodge/glacier-many-glacier-hotel'},
        'date': new Date(2014, 6, 19),
        'nightly_price': 250, 'nights': 2},
    {'id': 3,
        'event_type': 'driving',
        'location': {
            'name': 'Many Glacier Hotel',
            'address': 'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434',
            'url': 'https://www.nationalparkreservations.com/lodge/glacier-many-glacier-hotel'},
        'destination': {
            'name': 'Sheridan',
            'address': '',
            'url': ''},
        'url': 'http://goo.gl/maps/g6pMH',
        'date': new Date(2014, 6, 21),
        'distance': 525, 'hours': 8},
    {'id': 3,
        'event_type': 'hotel',
        'location': {
            'name': 'A Sheridan Hotel',
            'address': '',
            'url': ''},
        'date': new Date(2014, 6, 21),
        'nightly_price': 250, 'nights': 1},
    {'id': 3,
        'event_type': 'driving',
        'location': {
            'name': 'Sheridan',
            'address': '',
            'url': ''},
        'destination': {
            'name': 'Rapid City',
            'address': '',
            'url': ''},
        'url': 'http://goo.gl/maps/7GGI9',
        'date': new Date(2014, 6, 22),
        'distance': 250, 'hours': 3.5},
    {'id': 3,
        'event_type': 'hotel',
        'location': {
            'name': 'A Rapid City Hotel',
            'address': '',
            'url': ''},
        'date': new Date(2014, 6, 22),
        'nightly_price': 200, 'nights': 3},
    {'id': 3,
        'event_type': 'driving',
        'location': {
            'name': 'Rapid City',
            'address': '',
            'url': ''},
        'destination': {
            'name': 'St. Paul',
            'address': '',
            'url': ''},
        'url': 'http://goo.gl/maps/7GGI9',
        'date': new Date(2014, 6, 25),
        'distance': 600, 'hours': 8.5},
];
