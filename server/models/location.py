from google.appengine.ext import ndb

class Address(ndb.Model):
  street = ndb.StringProperty()
  city = ndb.StringProperty()
  state = ndb.StringProperty()
  zip = ndb.StringProperty()

class Location(ndb.Model):
  name = ndb.StringProperty(required=True)
  address = ndb.StructuredProperty(Address)
  geopt = ndb.GeoPtProperty()
  image_url = ndb.StringProperty(default='')
  url = ndb.StringProperty(default='')
  notes = ndb.TextProperty()
