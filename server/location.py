import os
import urllib

import json
import logging

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

    def post(self):
        self.get()


class UpdateHandler(webapp2.RequestHandler):

    def get(self):
        id = int(self.request.get('id'))
        name = self.request.get('name')

        errors = []

        if not id:
            errors.append({'message': 'The "id" parameter is required.'})
        if not name:
            errors.append({'message': 'The "name" parameter is required.'})

        if errors:
            data = {'errors': errors}
        else:
            found_location = location.Location.get_by_id(id)

            if not found_location:
                data = {'errors': [{'message': 'id %s is not found.' % id}]}
            else:
                found_location.name = name
                found_location.put()

                data = {'message': 'Location updated.'}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))

    def post(self):
        self.get()


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
    ('/data/location/update', UpdateHandler),
    ('/data/location/delete', DeleteHandler),
], debug=True)
