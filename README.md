# Metro Transit Utils

## Usage

This script pulls the current bus locations from the Metro Transit NexTrip API,
and prints a URL to https://geojson.io with the points plotted. Very
rudimentary at the moment.

Usage:

    npm install
    ./wheres-my-bus.js [route] | xargs open

Example:

    ./wheres-my-bus.js 14 | xargs open

The Metro Transit NexTrip API is documented here:
- https://svc.metrotransit.org/swagger/index.html
