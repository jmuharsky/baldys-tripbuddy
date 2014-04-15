import datetime
import logging

from google.appengine.ext import ndb
from google.appengine.api import datastore_types

# Define 'simple' types
SIMPLE_TYPES = (int, long, float, bool, dict, basestring, list)

def to_dict(model):
    logging.error(model)
    output = {}

    if model.key:
      output['id'] = model.key.id()

    for key, prop in model._properties.iteritems():
        value = getattr(model, key)

        if value == None:
            output[key] = None
        elif isinstance(value, SIMPLE_TYPES) and value is not None:
            output[key] = value
        elif isinstance(value, datetime.date):
            # Convert date/datetime to ms-since-epoch ("new Date()").
            ms = time.mktime(value.utctimetuple())
            ms += getattr(value, 'microseconds', 0) / 1000
            output[key] = int(ms)
        elif isinstance(value, datastore_types.GeoPt):
            output[key] = {'lat': value.lat, 'lon': value.lon}
        elif isinstance(value, ndb.Model):
            # Recurse
            output[key] = to_dict(value)
        else:
            logging.error('%s: %s', value, type(value))
            raise ValueError('cannot encode ' + repr(prop))

    return output