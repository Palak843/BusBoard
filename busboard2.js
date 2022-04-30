import fetch from "node-fetch";

// Hello

// Postcode
let postcode = "RM142XA";
const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
const postcodeDetails = await postcodeResponse.json();
const lat = postcodeDetails.result.latitude;
const long = postcodeDetails.result.longitude;
console.log(lat)
