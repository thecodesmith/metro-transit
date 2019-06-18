#!/usr/bin/env node

const request = require('request');
const _ = require('lodash');

const route = process.argv[2] || '535';
const api = `http://svc.metrotransit.org/NexTrip/VehicleLocations/${route}`;
const url = 'http://geojson.io/#data=data:application/json,'

request(api, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  let geojsonData = generateGeoJson(body);
  console.log(url + toUrl(geojsonData));
});

let generateGeoJson = function(data) {
  let features = data.map(function(entry) {
    return point(entry.VehicleLatitude, entry.VehicleLongitude);
  });

  return {
    "type": "FeatureCollection",
    "features": features
  };
};

let point = function(lat, lon) {
  return {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [lon, lat]
    }
  };
};

let toUrl = function(geojsonData) {
  return encodeURIComponent(JSON.stringify(geojsonData));
};
