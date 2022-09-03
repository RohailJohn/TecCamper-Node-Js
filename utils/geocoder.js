const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "IDdWRXmgS6PGtOInXc37ofTZBks4g0bI",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
