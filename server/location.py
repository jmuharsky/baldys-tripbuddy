import os
import urllib

import json
import logging

from models.location import AddressModel
from models.location import LocationModel
from util import param_util

from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2


class ListHandler(webapp2.RequestHandler):

    def get(self):
        data = []
        locations = LocationModel.query().fetch(1000)

        for current in locations:
            if current.address:
                address = {
                    'street': current.address.street,
                    'city': current.address.city,
                    'state': current.address.state,
                    'zip': current.address.zip
                }
            else:
                address = None

            if current.geopt:
                geopt = {
                    'lat': current.geopt.lat,
                    'lon': current.geopt.lon
                }
            else:
                geopt = None

            data.append({
                'id': current.key.id(),
                'name': current.name,
                'address': address,
                'geopt': geopt,
                'image_url': current.image_url,
                'url': current.url,
                'notes': current.notes
            })

        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(data))


class CreateHandler(webapp2.RequestHandler):

    def post(self):
        response = json.loads(self.request.body)

        try:
            location_param = param_util.GetJson(response, 'location', True)
            id = param_util.GetInteger(location_param, 'id', True)
            name = param_util.GetString(location_param, 'name', True)
            address = param_util.GetJson(location_param, 'address')
            geopt = param_util.GetJson(location_param, 'geopt')
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

                if geopt and geopt['lat'] or geopt['lon']:
                    lat = geopt['lat'] or 0
                    lon = geopt['lon'] or 0

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
