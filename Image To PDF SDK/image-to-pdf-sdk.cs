using System;
using ByteScout.ImageToPDF;

// This example demonstrates the use of Image To PDF SDK - a library
// for conversion of raster images (PNG, JPEG, TIFF, BMP) to PDF document.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

namespace ExtractText
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create ByteScout.ImageToPDF.ImageToPDF object instance.
            ImageToPDF converter = new ImageToPDF();
            
            // Load single image.
            converter.AddImage(@".\invoice123.tif");
            // Load all supported images from folder (*.jpg, *.png, *.bmp, *.tif).
            converter.AddImagesFromFolder(@".\Invoices\");

            // Setup converter:

            // Make PDF searchable (perform Optical Character Recognition - OCR).
            converter.MakeSearchable = true;
            converter.OCRLanguage = "eng";
            // Fix orientation of rotated and flipped images by analyzing text orientation.
            converter.FixRotation = true;
            // Resample large images to lower resolution to reduce file size
            converter.ResampleImages = true;
            converter.ResamplingResolution = 120;
            // Compression format to store images in PDF
            converter.ImageOptimizationFormat = ImageOptimizationFormat.JPEG;
            converter.JPEGQuality = 25; // Quality (compression ratio)


            // Save PDF document.
            converter.Save(@".\result.pdf");

            // Cleanup.
            converter.Dispose();
        }
    }
}
