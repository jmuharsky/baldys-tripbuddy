goog.provide('tripbuddy.components.event.EventListPageService');


goog.scope(function() {

  /**
   * @ngInject
   * @export
   */
  tripbuddy.components.event.EventListPageService = function() {
    /** @export @type {{DATAGRID: !string, PRETTY: !string, ALL: Array.<!string>}} */
    this.viewModes = {
      DATAGRID: 'datagrid',
      PRETTY: 'pretty',
      ALL: ['datagrid', 'pretty']
    };

    /** @export @type {!string} */
    this.viewMode = this.viewModes.DATAGRID;

    /**
     * @export
     * @param {!string} mode
     */
    this.setViewMode = function(mode) {
      this.viewMode = mode;
    };
  };

});  // goog.scope
