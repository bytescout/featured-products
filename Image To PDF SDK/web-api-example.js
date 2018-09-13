// This example demonstrates the use of Image To PDF - 
// Web API for conversion of raster images (PNG, JPEG, TIFF, BMP) to PDF document.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

// (!) If you are getting "(403) Forbidden" error please ensure you have set the correct API_KEY

var https = require("https");
var path = require("path");
var fs = require("fs");


// The authentication key (API Key).
// Get your own by registering at https://secure.bytescout.com/users/sign_up
const API_KEY = "***********************************";


// Direct URL of source images files.
const SourceFileUrl1 = "https://somesite.co/files/sample.jpg";
const SourceFileUrl2 = "https://somesite.co/files/sample.png";
// Destination PDF file name
const DestinationFile = "./result.pdf";

// Options:

// Make PDF searchable (perform Optical Character Recognition - OCR)
const MakeSearchable = true;
const OCRLanguage = "eng";
// Fix orientation of rotated and flipped images by analyzing text orientation.
const FixRotation = true;
// Resample large images to lower resolution to reduce file size
const ResampleImages = true;
const ResamplingResolution = 120;
// Compression format to store images in PDF
const ImageFormat = "jpeg";
const JPEGQuality = 25; // Quality (compression ratio)

// Prepare request to `Image To PDF` API endpoint
var queryPath = `/v1/image/to/pdf?name=${path.basename(DestinationFile)}&urls=${SourceFileUrl1},${SourceFileUrl2}` + 
    `&makeSearchable=${MakeSearchable}&ocrLanguage=${OCRLanguage}&fixRotation=${FixRotation}&resampleImages=${ResampleImages}` +
    `&resamplingResolution=${ResamplingResolution}&imageFormat=${ImageFormat}&jpegQuality=${JPEGQuality}`;
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
