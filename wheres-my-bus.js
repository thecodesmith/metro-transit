#!/usr/bin/env node

const request = require('request');
const _ = require('lodash');

const route = process.argv[2] || '14';
const api = `https://svc.metrotransit.org/nextrip/vehicles/${route}`;
const url = 'https://geojson.io/#data=data:application/json,'

request(api, { json: true }, (err, res, body) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  if (res.statusCode != 200) {
    console.log(`Error [${res.statusCode}]: ${body.title} - ${body.detail}`);
    process.exit(1);
  }

  let geojsonData = generateGeoJson(body);
  console.log(url + toUrl(geojsonData));
});

let generateGeoJson = function(data) {
  let features = data.filter(function(entry) {
    return entry.latitude != 0 && entry.longitude != 0;
  }).map(function(entry) {
    return point(entry.latitude, entry.longitude);
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
