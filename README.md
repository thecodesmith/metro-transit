# Metro Transit Utils

## Usage

This script pulls the current bus locations from the Metro Transit NexTrip API,
and prints a URL to https://geojson.io with the points plotted. Very
rudimentary at the moment.

    npm install
    node wheres-my-bus.js [route] | xargs open
