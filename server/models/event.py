import location

from google.appengine.ext import ndb

class Event(ndb.Model):
  name = ndb.StringProperty(required=True)
  type = ndb.StrigProperty(required=True)
  start_location = ndb.KeyProperty(kind=location.Location)
  start_datetime = ndb.DateTimeProperty()
  end_location = ndb.KeyProperty(kind=location.Location)
  end_datetime = ndb.DateTimeProperty()
  unit_qty = ndb.FloatProperty()
  unit_cost = ndb.FloatProperty()
  total_cost = ndb.FloatProperty()
  url = ndb.StringProperty()
  notes = ndb.TextProperty()
