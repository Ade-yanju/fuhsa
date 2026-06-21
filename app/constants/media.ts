/**
 * Media URLs configuration.
 * Since storing large assets locally in the codebase consumes too much bandwidth (data transfer),
 * you can store them in Google Drive or another CDN / hosting provider and reference them here.
 *
 * If using Google Drive:
 * 1. Upload your file to Google Drive.
 * 2. Right-click the file, select "Share" -> "Share with others".
 * 3. Change General Access to "Anyone with the link" and set role to "Viewer".
 * 4. Copy the link and paste it here. It will automatically be converted to a direct link!
 */

// Helper to convert Google Drive share links to direct download links
export function getDirectLink(url: string): string {
  if (!url) return "";

  // Handle Google Drive links
  if (url.includes("drive.google.com")) {
    // Extract file ID from /d/FILE_ID/view or id=FILE_ID
    const match =
      url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      // Using the lh3.googleusercontent.com endpoint is much more reliable for web viewing (images/videos)
      // and behaves more like a CDN compared to the 'uc?export=download' endpoint.
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
}

// EDIT THESE LINKS BELOW with your Google Drive share links
export const MEDIA_URLS = {
  // Video (23MB)
  fuhsaVideo:
    "https://drive.google.com/file/d/1QZj5ohxhWgh8cAP0YWtUMmn4o6gzvjYj/view?usp=drive_link",

  // Slide Images (Hero Section)
  slide1:
    "https://drive.google.com/file/d/1OA1PkuV0gaaUXcgeIxMp0ggTE4ja4oVA/view?usp=drive_link",
  slide2:
    "https://drive.google.com/file/d/1r7RCO1FGCgyq5oDCuDwspmYCz_B4BPLF/view?usp=drive_link",
  slide3:
    "https://drive.google.com/file/d/1PgT8_zyipCE9Z1SQ98nlhjSQSQKS_jJx/view?usp=drive_link",
  slide4:
    "https://drive.google.com/file/d/1B0v-qnO9bxeuDYfO1PPB7DlQ_dd4IH3l/view?usp=drive_link",
  slide5:
    "https://drive.google.com/file/d/1yz5NYk0mbM1TDU4wKVp9YgBAgRaDCOxj/view?usp=drive_link",

  // Section Images
  announcement:
    "https://drive.google.com/file/d/1HGFeVuxoe6J6Z7VzooqvGCJE-GP2Jrrv/view?usp=sharing",
  lab: "https://drive.google.com/file/d/1KikiYNyjRoz2K4U4OhGm94qioYgYqeJm/view?usp=drive_link",
  labb: "https://drive.google.com/file/d/1I2NeH7rTbCJKdQr-bOGPUEB1xk3IEPQS/view?usp=drive_link",
  gate: "https://drive.google.com/file/d/1I5-0De-udzul5_-xDlYH7FSMJbrstC9B/view?usp=drive_link",
  vcImage: "/vcfuhsa.png",
  logo: "/fuhsa-logo.png",
};

// Resolved URLs automatically processed to provide direct links
export const RESOLVED_MEDIA_URLS = {
  fuhsaVideo: getDirectLink(MEDIA_URLS.fuhsaVideo),
  slide1: getDirectLink(MEDIA_URLS.slide1),
  slide2: getDirectLink(MEDIA_URLS.slide2),
  slide3: getDirectLink(MEDIA_URLS.slide3),
  slide4: getDirectLink(MEDIA_URLS.slide4),
  slide5: getDirectLink(MEDIA_URLS.slide5),
  announcement: getDirectLink(MEDIA_URLS.announcement),
  lab: getDirectLink(MEDIA_URLS.lab),
  labb: getDirectLink(MEDIA_URLS.labb),
  gate: getDirectLink(MEDIA_URLS.gate),
  vcImage: getDirectLink(MEDIA_URLS.vcImage),
  logo: getDirectLink(MEDIA_URLS.logo),
};
