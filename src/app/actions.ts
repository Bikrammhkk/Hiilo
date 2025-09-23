'use server';

import { convertGoogleDriveLinkToDirectDownload } from '@/ai/flows/convert-google-drive-link-to-direct-download';

export async function getDirectLink(googleDriveLink: string) {
  if (!googleDriveLink || !googleDriveLink.includes('drive.google.com')) {
    return { directDownloadLink: googleDriveLink };
  }
  try {
    const result = await convertGoogleDriveLinkToDirectDownload({
      googleDriveLink,
    });
    return result;
  } catch (error) {
    console.error('Error converting Google Drive link:', error);
    // Fallback to original link on error
    return { directDownloadLink: googleDriveLink };
  }
}
