// src/ai/flows/convert-google-drive-link-to-direct-download.ts
'use server';

/**
 * @fileOverview Converts a Google Drive link to a direct download link.
 *
 * - convertGoogleDriveLinkToDirectDownload - A function that handles the conversion process.
 * - ConvertGoogleDriveLinkToDirectDownloadInput - The input type for the convertGoogleDriveLinkToDirectDownload function.
 * - ConvertGoogleDriveLinkToDirectDownloadOutput - The return type for the convertGoogleDriveLinkToDirectDownload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConvertGoogleDriveLinkToDirectDownloadInputSchema = z.object({
  googleDriveLink: z
    .string()
    .describe('The Google Drive link to convert to a direct download link.'),
});
export type ConvertGoogleDriveLinkToDirectDownloadInput = z.infer<typeof ConvertGoogleDriveLinkToDirectDownloadInputSchema>;

const ConvertGoogleDriveLinkToDirectDownloadOutputSchema = z.object({
  directDownloadLink: z
    .string()
    .describe('The direct download link for the Google Drive file.'),
});
export type ConvertGoogleDriveLinkToDirectDownloadOutput = z.infer<typeof ConvertGoogleDriveLinkToDirectDownloadOutputSchema>;

export async function convertGoogleDriveLinkToDirectDownload(
  input: ConvertGoogleDriveLinkToDirectDownloadInput
): Promise<ConvertGoogleDriveLinkToDirectDownloadOutput> {
  return convertGoogleDriveLinkToDirectDownloadFlow(input);
}

const convertGoogleDriveLinkToDirectDownloadFlow = ai.defineFlow(
  {
    name: 'convertGoogleDriveLinkToDirectDownloadFlow',
    inputSchema: ConvertGoogleDriveLinkToDirectDownloadInputSchema,
    outputSchema: ConvertGoogleDriveLinkToDirectDownloadOutputSchema,
  },
  async input => {
    const {googleDriveLink} = input;
    let directDownloadLink = '#';
    try {
      const idMatch = 
          googleDriveLink.match(/\/d\/([a-zA-Z0-9_-]{25,})/) ||
          googleDriveLink.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);
      if (idMatch && idMatch[1]) {
        directDownloadLink = 'https://drive.google.com/uc?export=download&id=' + idMatch[1];
      }
    } catch (e) {
      console.error('Error parsing GDrive link:', e);
    }
    return {directDownloadLink: directDownloadLink};
  }
);
