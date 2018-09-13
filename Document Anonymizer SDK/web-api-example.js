// This example demonstrates the use of Document Anonymizer - 
// Web API for anonymization (data masking) of sensitive information in documents.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

// (!) If you are getting "(403) Forbidden" error please ensure you have set the correct API_KEY

var https = require("https");
var path = require("path");
var fs = require("fs");


// The authentication key (API Key).
// Get your own by registering at https://secure.bytescout.com/users/sign_up
const API_KEY = "***********************************";


// Direct URL of source PDF file.
const SourceFileUrl = "https://somesite.co/files/sample.pdf";
// Destination PDF file name
const DestinationFile = "./result.pdf";

// Anonymization options:
const Options="companyNames,phoneNumbers,persons,personalIDs,addresses,emails";
const AnonymizationType = "randomizing"; // or "dummy-values"

// Prepare request to `Document Anonymizer` API endpoint
var queryPath = `/v1/document-anonymizer?name=${path.basename(DestinationFile)}&url=${SourceFileUrl}&type=${AnonymizationType}&options=${Options}`;
var reqOptions = {
    host: "bytescout.io",
    path: encodeURI(queryPath),
    headers: {
        "x-api-key": API_KEY
    }
};
// Send request
https.get(reqOptions, (response) => {
    response.on("data", (d) => {
        // Parse JSON response
        var data = JSON.parse(d);
        if (data.error == false) {
            // Download PDF file
            var file = fs.createWriteStream(DestinationFile);
            https.get(data.url, (response2) => {
                response2.pipe(file)
                .on("close", () => {
                    console.log(`Generated PDF file saved as "${DestinationFile}" file.`);
                });
            });
        }
        else {
            // Service reported error
            console.log(data.message);
        }
    });
}).on("error", (e) => {
    // Request error
    console.log(e);
});
