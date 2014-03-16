from google.appengine.ext import ndb

class AddressModel(ndb.Model):
  street = ndb.StringProperty()
  city = ndb.StringProperty()
  state = ndb.StringProperty()
  zip = ndb.StringProperty()

class LocationModel(ndb.Model):
  name = ndb.StringProperty(required=True)
  address = ndb.StructuredProperty(AddressModel)
  geopt = ndb.GeoPtProperty()
  image_url = ndb.StringProperty(default='')
  url = ndb.StringProperty(default='')
  notes = ndb.TextProperty()
