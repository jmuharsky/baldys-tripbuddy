var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = 'en';
goog.TRUSTED_SITE = true;
goog.provide = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    delete goog.implicitNamespaces_[name];
    var namespace = name;
    while (namespace = namespace.substring(0, namespace.lastIndexOf('.'))) {
      if (goog.getObjectByName(namespace)) {
        break;
      }
      goog.implicitNamespaces_[namespace] = true;
    }
  }
  goog.exportPath_(name);
};
goog.setTestOnly = function(opt_message) {
  if (COMPILED && !goog.DEBUG) {
    opt_message = opt_message || '';
    throw Error('Importing test-only code into non-debug environment' + opt_message ? ': ' + opt_message : '.');
  }
};
if (!COMPILED) {
  goog.isProvided_ = function(name) {
    return!goog.implicitNamespaces_[name] && !!goog.getObjectByName(name);
  };
  goog.implicitNamespaces_ = {};
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split('.');
  var cur = opt_objectToExportTo || goog.global;
  if (!(parts[0] in cur) && cur.execScript) {
    cur.execScript('var ' + parts[0]);
  }
  for (var part;parts.length && (part = parts.shift());) {
    if (!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object;
    } else {
      if (cur[part]) {
        cur = cur[part];
      } else {
        cur = cur[part] = {};
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split('.');
  var cur = opt_obj || goog.global;
  for (var part;part = parts.shift();) {
    if (goog.isDefAndNotNull(cur[part])) {
      cur = cur[part];
    } else {
      return null;
    }
  }
  return cur;
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for (var x in obj) {
    global[x] = obj[x];
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if (!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, '/');
    var deps = goog.dependencies_;
    for (var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if (!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {};
      }
      deps.pathToNames[path][provide] = true;
    }
    for (var j = 0;require = requires[j];j++) {
      if (!(path in deps.requires)) {
        deps.requires[path] = {};
      }
      deps.requires[path][require] = true;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = true;
goog.require = function(name) {
  if (!COMPILED) {
    if (goog.isProvided_(name)) {
      return;
    }
    if (goog.ENABLE_DEBUG_LOADER) {
      var path = goog.getPathFromDeps_(name);
      if (path) {
        goog.included_[path] = true;
        goog.writeScripts_();
        return;
      }
    }
    var errorMessage = 'goog.require could not find: ' + name;
    if (goog.global.console) {
      goog.global.console['error'](errorMessage);
    }
    throw Error(errorMessage);
  }
};
goog.basePath = '';
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
goog.abstractMethod = function() {
  throw Error('unimplemented abstract method');
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    if (ctor.instance_) {
      return ctor.instance_;
    }
    if (goog.DEBUG) {
      goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = ctor;
    }
    return ctor.instance_ = new ctor;
  };
};
goog.instantiatedSingletons_ = [];
if (!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != 'undefined' && 'write' in doc;
  };
  goog.findBasePath_ = function() {
    if (goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return;
    } else {
      if (!goog.inHtmlDocument_()) {
        return;
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName('script');
    for (var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf('?');
      var l = qmark == -1 ? src.length : qmark;
      if (src.substr(l - 7, 7) == 'base.js') {
        goog.basePath = src.substr(0, l - 7);
        return;
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if (!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true;
    }
  };
  goog.writeScriptTag_ = function(src) {
    if (goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      if (doc.readyState == 'complete') {
        var isDeps = /\bdeps.js$/.test(src);
        if (isDeps) {
          return false;
        } else {
          throw Error('Cannot write "' + src + '" after document load');
        }
      }
      doc.write('<script type="text/javascript" src="' + src + '"></' + 'script>');
      return true;
    } else {
      return false;
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if (path in deps.written) {
        return;
      }
      if (path in deps.visited) {
        if (!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path);
        }
        return;
      }
      deps.visited[path] = true;
      if (path in deps.requires) {
        for (var requireName in deps.requires[path]) {
          if (!goog.isProvided_(requireName)) {
            if (requireName in deps.nameToPath) {
              visitNode(deps.nameToPath[requireName]);
            } else {
              throw Error('Undefined nameToPath for ' + requireName);
            }
          }
        }
      }
      if (!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path);
      }
    }
    for (var path in goog.included_) {
      if (!deps.written[path]) {
        visitNode(path);
      }
    }
    for (var i = 0;i < scripts.length;i++) {
      if (scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i]);
      } else {
        throw Error('Undefined script input');
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if (rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule];
    } else {
      return null;
    }
  };
  goog.findBasePath_();
  if (!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + 'deps.js');
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if (s == 'object') {
    if (value) {
      if (value instanceof Array) {
        return'array';
      } else {
        if (value instanceof Object) {
          return s;
        }
      }
      var className = Object.prototype.toString.call((value));
      if (className == '[object Window]') {
        return'object';
      }
      if (className == '[object Array]' || typeof value.length == 'number' && (typeof value.splice != 'undefined' && (typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice')))) {
        return'array';
      }
      if (className == '[object Function]' || typeof value.call != 'undefined' && (typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('call'))) {
        return'function';
      }
    } else {
      return'null';
    }
  } else {
    if (s == 'function' && typeof value.call == 'undefined') {
      return'object';
    }
  }
  return s;
};
goog.isDef = function(val) {
  return val !== undefined;
};
goog.isNull = function(val) {
  return val === null;
};
goog.isDefAndNotNull = function(val) {
  return val != null;
};
goog.isArray = function(val) {
  return goog.typeOf(val) == 'array';
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == 'array' || type == 'object' && typeof val.length == 'number';
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == 'function';
};
goog.isString = function(val) {
  return typeof val == 'string';
};
goog.isBoolean = function(val) {
  return typeof val == 'boolean';
};
goog.isNumber = function(val) {
  return typeof val == 'number';
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == 'function';
};
goog.isObject = function(val) {
  var type = typeof val;
  return type == 'object' && val != null || type == 'function';
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.removeUid = function(obj) {
  if ('removeAttribute' in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_);
  }
  try {
    delete obj[goog.UID_PROPERTY_];
  } catch (ex) {
  }
};
goog.UID_PROPERTY_ = 'closure_uid_' + (Math.random() * 1E9 >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if (type == 'object' || type == 'array') {
    if (obj.clone) {
      return obj.clone();
    }
    var clone = type == 'array' ? [] : {};
    for (var key in obj) {
      clone[key] = goog.cloneObject(obj[key]);
    }
    return clone;
  }
  return obj;
};
goog.bindNative_ = function(fn, selfObj, var_args) {
  return(fn.call.apply(fn.bind, arguments));
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  if (!fn) {
    throw new Error;
  }
  if (arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(selfObj, newArgs);
    };
  } else {
    return function() {
      return fn.apply(selfObj, arguments);
    };
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if (Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1) {
    goog.bind = goog.bindNative_;
  } else {
    goog.bind = goog.bindJs_;
  }
  return goog.bind.apply(null, arguments);
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs);
  };
};
goog.mixin = function(target, source) {
  for (var x in source) {
    target[x] = source[x];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return+new Date;
};
goog.globalEval = function(script) {
  if (goog.global.execScript) {
    goog.global.execScript(script, 'JavaScript');
  } else {
    if (goog.global.eval) {
      if (goog.evalWorksForGlobals_ == null) {
        goog.global.eval('var _et_ = 1;');
        if (typeof goog.global['_et_'] != 'undefined') {
          delete goog.global['_et_'];
          goog.evalWorksForGlobals_ = true;
        } else {
          goog.evalWorksForGlobals_ = false;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(script);
      } else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement('script');
        scriptElt.type = 'text/javascript';
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt);
      }
    } else {
      throw Error('goog.globalEval not available');
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName;
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split('-');
    var mapped = [];
    for (var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]));
    }
    return mapped.join('-');
  };
  var rename;
  if (goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == 'BY_WHOLE' ? getMapping : renameByParts;
  } else {
    rename = function(a) {
      return a;
    };
  }
  if (opt_modifier) {
    return className + '-' + rename(opt_modifier);
  } else {
    return rename(className);
  }
};
goog.setCssNameMapping = function(mapping, opt_style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = opt_style;
};
goog.global.CLOSURE_CSS_NAME_MAPPING;
if (!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING) {
  goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING;
}
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for (var key in values) {
    var value = ('' + values[key]).replace(/\$/g, '$$$$');
    str = str.replace(new RegExp('\\{\\$' + key + '\\}', 'gi'), value);
  }
  return str;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo);
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol;
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor;
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if (caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for (var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if (ctor.prototype[opt_methodName] === caller) {
      foundCaller = true;
    } else {
      if (foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args);
      }
    }
  }
  if (me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args);
  } else {
    throw Error('goog.base called from a method of one name ' + 'to a method of a different name');
  }
};
goog.scope = function(fn) {
  fn.call(goog.global);
};
goog.provide('tripbuddy.core.page.PageStateService');
tripbuddy.core.page.PageStateService = function() {
  this.title = 'UNSET';
  this.activePage = 'events';
};
goog.provide('tripbuddy.components.event.EventListDirective');
goog.require('tripbuddy.core.page.PageStateService');
MPG = 24;
DAYS = [{'long':'sunday', 'short':'sun'}, {'long':'monday', 'short':'mon'}, {'long':'tuesday', 'short':'tue'}, {'long':'wednesday', 'short':'wed'}, {'long':'thursday', 'short':'thu'}, {'long':'friday', 'short':'fri'}, {'long':'saturday', 'short':'sat'}];
MONTHS = [{'long':'january', 'short':'jan'}, {'long':'february', 'short':'feb'}, {'long':'march', 'short':'mar'}, {'long':'april', 'short':'apr'}, {'long':'may', 'short':'may'}, {'long':'june', 'short':'jun'}, {'long':'july', 'short':'jul'}, {'long':'august', 'short':'aug'}, {'long':'september', 'short':'sep'}, {'long':'october', 'short':'oct'}, {'long':'november', 'short':'nov'}, {'long':'december', 'short':'dec'}];
tripbuddy.components.event.EventListDirective = function(pageState, eventData) {
  return{restrict:'E', templateUrl:'/components/event/list/event-list-directive.html', link:function(scope, el, attr) {
    scope.prices = {'gas':4.5};
    scope.days = DAYS;
    scope.months = MONTHS;
    scope.prices.mile = scope.prices.gas / MPG;
    scope.events = [];
    scope.getCost = function(event) {
      switch(event.event_type) {
        case 'hotel':
          return event.nightly_price * event.nights;
          break;
        case 'driving':
          return event.distance * scope.prices.mile;
      }
    };
    scope.getTotalCost = function() {
      var total = 0;
      angular.forEach(scope.events, function(event) {
        total += scope.getCost(event);
      });
      return total;
    };
    scope.refresh = function() {
      var promise = eventData.list();
      promise.then(function(response) {
        scope.events = response;
      });
    };
    scope.refresh();
  }};
};
goog.provide('tripbuddy.core.page.PageDirective');
goog.require('tripbuddy.core.page.PageStateService');
tripbuddy.core.page.PageDirective = function(pageState, $state) {
  return{restrict:'E', templateUrl:'/core/page/page-directive.html', link:function(scope, el, attr) {
    scope.pageState = pageState;
  }};
};
goog.provide('tripbuddy.components.event.EventDataService');
tripbuddy.components.event.EventDataService = function($q, $timeout) {
  this.list = function() {
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve(SAMPLE_DATA);
    });
    return deferred.promise;
  };
  this.activePage = 'events';
};
SAMPLE_DATA = [{'event_type':'driving', 'start_location':{'name':'Home', 'address':'27229 NE 145th S., Duvall WA 98019', 'url':'http://goo.gl/maps/WJ6c0'}, 'end_location':{'name':'Kalispell', 'address':'350 N Main St Kalispell, MT, 59901', 'url':'http://goo.gl/maps/UYpl0'}, 'url':'http://goo.gl/maps/cHsYd', 'date':new Date(2014, 6, 18), 'distance':525, 'hours':9}, {event_type:'hotel', 'location':{'name':'Travelodge Kalispell', 'address':'350 N Main St Kalispell, MT, 59901', 'url':'http://www.hotels.com/hotel/details.html?pa=7&pn=1&ps=7&tab=description&destinationId=1435619&searchDestination=Kalispell&hotelId=255442&arrivalDate=07-18-14&departureDate=07-19-14&children[0]=2&rooms[0].childrenAges[0]=7&rooms[0].childrenAges[1]=14&rooms[0].numberOfAdults=2&roomno=1&validate=false&previousDateful=false&reviewOrder=date_newest_first'}, 
'date':new Date(2014, 6, 18), 'nightly_price':150, 'nights':1}, {'event_type':'driving', 'start_location':{'name':'Kalispell', 'address':'350 N Main St Kalispell, MT, 59901', 'url':'http://goo.gl/maps/UYpl0'}, 'end_location':{'name':'Glacier National Park', 'address':'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434', 'url':'http://goo.gl/maps/L6w2J'}, 'url':'http://goo.gl/maps/7sSEY', 'date':new Date(2014, 6, 19), 'distance':525, 'hours':4}, {'event_type':'hotel', 'location':{'name':'Many Glacier Hotel', 
'address':'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434', 'url':'https://www.nationalparkreservations.com/lodge/glacier-many-glacier-hotel'}, 'date':new Date(2014, 6, 19), 'nightly_price':250, 'nights':2}, {'event_type':'driving', 'start_location':{'name':'Many Glacier Hotel', 'address':'Highway 8, Swiftcurrent Lake, Glacier National Park, MT 59434', 'url':'https://www.nationalparkreservations.com/lodge/glacier-many-glacier-hotel'}, 'end_location':{'name':'Sheridan', 'address':'', 
'url':''}, 'url':'http://goo.gl/maps/g6pMH', 'date':new Date(2014, 6, 21), 'distance':525, 'hours':8}, {'event_type':'hotel', 'location':{'name':'A Sheridan Hotel', 'address':'', 'url':''}, 'date':new Date(2014, 6, 21), 'nightly_price':250, 'nights':1}, {'event_type':'driving', 'start_location':{'name':'Sheridan', 'address':'', 'url':''}, 'end_location':{'name':'Rapid City', 'address':'', 'url':''}, 'url':'http://goo.gl/maps/7GGI9', 'date':new Date(2014, 6, 22), 'distance':250, 'hours':3.5}, {'event_type':'hotel', 
'location':{'name':'A Rapid City Hotel', 'address':'', 'url':''}, 'date':new Date(2014, 6, 22), 'nightly_price':200, 'nights':3}, {'event_type':'driving', 'start_location':{'name':'Rapid City', 'address':'', 'url':''}, 'end_location':{'name':'St. Paul', 'address':'', 'url':''}, 'url':'http://goo.gl/maps/7GGI9', 'date':new Date(2014, 6, 25), 'distance':600, 'hours':8.5}];
goog.provide('tripbuddy.core.page.PageHeaderDirective');
goog.require('tripbuddy.core.page.PageStateService');
tripbuddy.core.page.PageHeaderDirective = function($state, pageState) {
  return{restrict:'E', templateUrl:'/core/page/page-header-directive.html', link:function(scope, el, attr) {
    scope.pageState = pageState;
    scope.$watch('pageState.activePage', angular.bind(this, function(new_val, old_val) {
      if (new_val == old_val) {
        return;
      }
      $state.go(new_val);
    }));
  }};
};
goog.provide('tripbuddy.app');
goog.require('tripbuddy.components.event.EventDataService');
goog.require('tripbuddy.components.event.EventListDirective');
goog.require('tripbuddy.core.page.PageDirective');
goog.require('tripbuddy.core.page.PageHeaderDirective');
goog.require('tripbuddy.core.page.PageStateService');
tripbuddy.app = angular.module('tripbuddy', ['ui.router', 'ui.bootstrap']);
tripbuddy.app.service('pageState', tripbuddy.core.page.PageStateService);
tripbuddy.app.service('eventData', tripbuddy.components.event.EventDataService);
tripbuddy.app.directive('page', tripbuddy.core.page.PageDirective);
tripbuddy.app.directive('pageHeader', tripbuddy.core.page.PageHeaderDirective);
tripbuddy.app.directive('eventList', tripbuddy.components.event.EventListDirective);
tripbuddy.app.config(function($stateProvider, $locationProvider) {
  $stateProvider.state('events', {url:'/events', views:{'page.leftwell':{templateUrl:'/components/event/list/actions-view.html'}, 'page.content':{templateUrl:'/components/event/list/content-view.html'}}}).state('event', {url:'/event/:eventId', views:{'page.leftwell':{templateUrl:'/components/event/detail/actions-view.html'}, 'page.content':{templateUrl:'/components/event/detail/content-view.html'}}}).state('locations', {url:'/locations', views:{'page.leftwell':{templateUrl:'/components/location/list/actions-view.html'}, 
  'page.content':{templateUrl:'/components/location/list/content-view.html'}}}).state('location', {url:'/location/:locationId', views:{'page.leftwell':{templateUrl:'/components/location/detail/actions-view.html'}, 'page.content':{templateUrl:'/components/location/detail/content-view.html'}}});
  $locationProvider.html5Mode(true);
});

