// This example demonstrates the use of PDF Editor - Web API for PDF editing.
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

// Options:
const RemoveAnnotations = true;
const RemoveAttachments = true;
const ReplaceText = "'Joe Carpenter'>'John Doe'"; // Replace string "Joe Carpenter" to "John Doe"
const RemoveText = "100,100,200,200"; // remove text from rectangle x=100, y=100, w=200, h=200
const HighlightText = "top secret";
const HighlightColor = "rgba(255, 0, 0, 0.75)"; // transparent red

// Prepare request to `PDF Editor` API endpoint
var queryPath = `/v1/pdf/edit?name=${path.basename(DestinationFile)}&url=${SourceFileUrl}` + 
    `&removeAnnotations=${RemoveAnnotations}&removeAttachments=${RemoveAttachments}&replaceText=${ReplaceText}` +
    `&removeText=${RemoveText}&highlightText=${HighlightText}&highlightColor=${HighlightColor}`;
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
