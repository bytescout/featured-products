using System;
using ByteScout.DocumentAnonymizer;

// This example demonstrates the use of Document Anonymizer SDK - a library
// for anonymization (data masking) of sensitive information in documents.
//
// Copyright © 2018 ByteScout Inc. https://bytescout.com

namespace ExtractText
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create ByteScout.DocumentAnonymizer.Anonymizer object instance.
            Anonymizer anonymizer = new Anonymizer();
            
            // Load document.
            anonymizer.LoadDocument(@".\invoice.pdf");

            // Setup anonymization:
            anonymizer.AnonymizeCompanyNames = true;
            anonymizer.AnonymizePhoneNumbers = true;
            anonymizer.AnonymizePersons = true;
            anonymizer.AnonymizePersonalIDs = true;
            anonymizer.AnonymizeAddresses = true;
            anonymizer.AnonymizeEmails = true;

            // Set anonymization type.
            anonymizer.AnonymizationType = AnonymizationType.Randomizing; // or AnonymizationType.DummyValues

            // Perform anonymization.
            anonymizer.Anonymize();

            // Save anonymized document.
            anonymizer.SaveDocument(@".\result.pdf");

            // Cleanup.
            anonymizer.Dispose();
        }
    }
}
