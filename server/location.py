import os
import urllib

import json

from models import location

from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2


class ListHandler(webapp2.RequestHandler):

    def get(self):
        data = []
        locations = location.Location.query().fetch(1000)

        for current in locations:
            data.append({
                'id': current.key.id(),
                'name': current.name
            })

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class CreateHandler(webapp2.RequestHandler):

    def get(self):
        name = self.request.get('name')

        if not name:
            data = {'errors': [{'message': 'The "name" parameter is required.'}]}
        else:
            new_location = location.Location(name=name)
            new_location.put()

            data = {'id': new_location.key.id()}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class DeleteHandler(webapp2.RequestHandler):

    def get(self):
        id = int(self.request.get('id'))

        if not id:
            data = {'errors': [{'message': 'The "id" parameter is required.'}]}
        else:
            found_location = location.Location.get_by_id(id)

            if not found_location:
                data = {'errors': [{'message': 'id %s is not found.' % id}]}
            else:
                found_location.key.delete()
                data = {'message': 'Deleted successfully.'}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


handler = webapp2.WSGIApplication([
    ('/data/location/list', ListHandler),
    ('/data/location/create', CreateHandler),
    ('/data/location/delete', DeleteHandler),
], debug=True)
