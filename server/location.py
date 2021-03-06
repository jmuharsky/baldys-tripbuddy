import os
import urllib

import json
import logging

from models.location import AddressModel
from models.location import LocationModel
from util import param_util
from util import json_util

from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2


class ListHandler(webapp2.RequestHandler):

    def get(self):
        data = []
        locations = LocationModel.query().fetch(1000)

        for current in locations:
            location = json_util.to_dict(current)

            data.append(location)

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class CreateHandler(webapp2.RequestHandler):

    def post(self):
        response = json.loads(self.request.body)
        errors = []

        try:
            location_param = param_util.GetParam(response, 'location', True)
            name = param_util.GetString(location_param, 'name', True)
            address = param_util.GetParam(location_param, 'address')
            geopt = param_util.GetParam(location_param, 'geopt')
            image_url = param_util.GetString(location_param, 'image_url')
            url = param_util.GetString(location_param, 'url')
            notes = param_util.GetString(location_param, 'notes')
        except ValueError, err:
            errors.append({'message': err.message})

        if errors:
            data = {'errors': errors}
        else:
            new_location = LocationModel(name=name)
            new_location.put()

            data = {'id': new_location.key.id()}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class UpdateHandler(webapp2.RequestHandler):

    def post(self):
        errors = []
        response = json.loads(self.request.body)

        location_param = param_util.GetParam(response, 'location', True)
        id = param_util.GetInt(location_param, 'id', True)
        name = param_util.GetString(location_param, 'name', True)
        address = param_util.GetParam(location_param, 'address')
        geopt = param_util.GetParam(location_param, 'geopt')
        image_url = param_util.GetString(location_param, 'image_url')
        url = param_util.GetString(location_param, 'url')
        notes = param_util.GetString(location_param, 'notes')

        if errors:
            data = {'errors': errors}
        else:
            found_location = LocationModel.get_by_id(id)

            if not found_location:
                data = {'errors': [{'message': 'id %s is not found.' % id}]}
            else:
                found_location.name = name

                if address:
                    logging.error(address)
                    found_location.address = AddressModel(
                        street=param_util.GetString(address, 'street'),
                        city=param_util.GetString(address, 'city'),
                        state=param_util.GetString(address, 'state'),
                        zip=param_util.GetString(address, 'zip'))
                else:
                    found_location.address = None

                if geopt:
                    if 'lat' in geopt:
                        lat = geopt['lat']
                    else:
                        lat = 0

                    if 'lon' in geopt:
                        lon = geopt['lon']
                    else:
                        lon = 0

                    found_location.geopt = ndb.GeoPt(lat=lat, lon=lon)
                else:
                    found_location.geopt = None

                found_location.image_url = image_url
                found_location.url = url
                found_location.notes = notes

                found_location.put()

                data = {'message': 'Location updated.'}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class DeleteHandler(webapp2.RequestHandler):

    def get(self):
        id = int(self.request.get('id'))

        if not id:
            data = {'errors': [{'message': 'The "id" parameter is required.'}]}
        else:
            found_location = LocationModel.get_by_id(id)

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
