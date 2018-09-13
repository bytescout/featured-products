using System;
using System.Drawing;
using ByteScout.ImageFilters;

// This example demonstrates the use of Image Filters SDK - a library
// for image processing that improves scanned document quality 
// for further machine processing.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

namespace ExtractText
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create ByteScout.ImageFilters.ImageFilters object instance.
            ImageFilters imageFilters = new ImageFilters();
            
            // Load document.
            imageFilters.LoadDocument(@".\fax.tif");

            // APPLY FILTERS:

            // Fix orientation of rotated and flipped pages by analyzing text orientation.
            imageFilters.FixRotation();
            // Unrotate skewed pages.
            imageFilters.Deskew();
            // Remove speckles and noise.
            imageFilters.RemoveNoise();
            // Remove lines. This can improve the quality of optical character recognition (OCR).
            imageFilters.RemoveHorizontalLines();
            imageFilters.RemoveVerticalLines();


            // You can get a preview image after each modification to display to a user.
            Image previewImage = imageFilters.GetPreview();
            
            // Save improved image.
            imageFilters.SaveDocument(@".\fax.png");

            // Cleanup.
            imageFilters.Dispose();
        }
    }
}
