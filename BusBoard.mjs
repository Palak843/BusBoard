import fetch from "node-fetch";
import promptSync from "prompt-sync";
import readline from "readline-sync";
console.log("Please enter a valid postcode: ");
let postcode = readline.prompt();
//const postcode = "CR00zz";

// Validate postcode
//while (validatePostcode(postcode) === false) {
    try {
        const postcodeValid = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
        const postcodeValidResponse = await postcodeValid.json();
        console.log(postcodeValidResponse.result);
        if (postcodeValidResponse.result === false) {
            throw ("Invalid postcode")
        }
    } 
    catch (err) {
        console.log("Invalid postcode, try again");
        console.log("Please enter a valid postcode: ");
        postcode = readline.prompt();
    }
//}
const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
const postcodeDetails = await postcodeResponse.json();
const lat = postcodeDetails.result.latitude;
const long = postcodeDetails.result.longitude;
// Bus Stop
const busStopResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanPublicBusCoachTram&radius=500`);
const busStopDetails = await busStopResponse.json();
//console.log(busStopDetails);
busStopDetails.stopPoints.sort((a, b) => a.distance - b.distance);
// Bus Times
let apiKey = "d32dc34554204e6f875b8c3c3e599f56";

for (let j = 0; j < 2; j ++) {
let stopCode = (busStopDetails.stopPoints[j].id);
const response = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=${apiKey}`);
const arrivals = await response.json();
arrivals.sort((a, b) => a.timeToStation - b.timeToStation);
    console.log(`${busStopDetails.stopPoints[j].commonName}`)
    for (let i = 0; i < arrivals.length; i++) {
        const arrival = arrivals[i];
        console.log(`       Bus ${arrival.lineName} to ${arrival.destinationName} arriving in ${timeUnits(arrival.timeToStation)}.`);
    }
}

function timeUnits(time) {
    if (time === 1) {
        return time + " second";
    } else if (time < 60) {
        return time + " seconds";
    } else if (time < 120) {
        return Math.floor(time/60) + " minute";
    } else {
        return Math.floor(time/60) + " minutes";
    }
}
/*
import fetch from "node-fetch";

// Hello

// Postcode
let postcode = "RM142XA";
const postcodeResponse = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
const postcodeDetails = await postcodeResponse.json();
const lat = postcodeDetails.result.latitude;
const long = postcodeDetails.result.longitude;
console.log(lat)*/