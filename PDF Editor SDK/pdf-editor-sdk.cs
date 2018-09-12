using System;
using System.Drawing;
using ByteScout.PDFEditor;

// This example demonstrates the use of PDF Editor SDK - a library
// to create new or edit existing PDF documents.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

namespace ExtractText
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create ByteScout.PDFEditor.PDFEditor object instance.
            PDFEditor pdfEditor = new PDFEditor();

            // Load document
            pdfEditor.Load(@".\sample.pdf");
            
            // Delete last page
            pdfEditor.Pages.RemoveAt(pdfEditor.Pages.Count - 1);
            // Add new page instead
            pdfEditor.Pages.Add(PaperSize.Letter);

            // Remove image from point
            pdfEditor.Pages[0].RemoveImage(100, 200);
            
            // Remove image by index
            Rectangle imageRect = pdfEditor.Pages[0].Images[0].Bounds;
            pdfEditor.Pages[0].Images.RemoveAt(0);
            // ... and replace it with new image
            pdfEditor.Pages[0].AddImage(new Image(@".\image1.png"), imageRect);

            // Remove all annotations
            pdfEditor.Pages[0].Annotations.Clear();

            // Find and replace text
            pdfEditor.Pages[0].ReplaceText("Joe Carpenter", "John Doe");

            // Remove text from rectangle
            pdfEditor.Pages[0].RemoveText(new Rectangle(100, 100, 200, 200))

            // Find text and highlight it with transparent red
            Rectangle textRect = pdfEditor.Pages[0].Find("top secret");
            pdfEditor.Pages[0].FillRectangle(textRect, Color.FromArgb(196, 255, 0, 0));

            // Draw new text
            Font font = new Font("Arial", 18);
            Pen blackPen = new SolidPen(0, 0, 0);
            page.DrawString("The quick brown fox jumps over the lazy dog", font, blackPen, 20, 20);
            
                        
            // Save PDF document.
            pdfEditor.Save(@".\result.pdf");

            // Cleanup.
            pdfEditor.Dispose();
        }
    }
}
