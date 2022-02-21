const nodeGeocoder = require('node-geocoder');
const axios = require('axios');

const HttpError = require('../model/http-error');

let options = {
  provider: "openstreetmap"
}

let geoCoder = nodeGeocoder(options);

async function getCoordsForAddress(address) {
  const response = await geoCoder.geocode(address);
  console.log(response[0]);

  if(response[0]===undefined) {
    const error = new HttpError(
      'Could not find location for the specified address, try to enter relative address or use area zipcode(e.g. Pune-411004)',
      422
    );
    throw error;
  }else{
  return {
    lat: response[0].latitude,
    lng: response[0].longitude
  }}
}

module.exports = getCoordsForAddress;