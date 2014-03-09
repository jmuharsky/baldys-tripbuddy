from google.appengine.ext import ndb

class Location(ndb.Model):
  name = ndb.StringProperty(required=True)
  start_location = ndb.GeoPtProperty(required=True)
  end_location = ndb.GeoPtProperty()
  image_url = ndb.StringProperty(default='')
  url = ndb.StringProperty(default='')
  notes = ndb.TextProperty()
