import JSZip from 'jszip';

export const downloadFile = async (fileUrl: string) => {
  if (!fileUrl) {
    return;
  }

  try {
    const response = await fetch(fileUrl, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    // Extract filename from the content-disposition header if available
    const contentDisposition = response.headers.get('content-disposition');
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"$/);
    const filename = filenameMatch ? filenameMatch[1] : 'download';

    link.setAttribute('download', filename);

    // Append the link to the document and trigger a click to start the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};


export const handleExtractedZipFile = async (zipUrl: string) => {
  try {
    // Fetch the zip file and convert it to a blob
    const response = await fetch(zipUrl);
    const blobData = await response.blob();
    const zip = await JSZip.loadAsync(blobData);
    let extractedPDFs: any[] = [];

    // Function to extract PDF file details
    const extractFile = async (file: JSZip.JSZipObject) => {
      if (file.dir || !file.name.match(/\.(pdf)$/i)) {
        return null;
      }
      // Get PDF blob content
      const pdfBlob = await file.async('blob');
      // Creation date might not always be available in JSZip objects
      const creationDate = file.date ? file.date : 'Unknown';
      const blobUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
      return {
        title: file.name,
        addOn: creationDate,
        blobUrl,
      };
    };

    // Loop through files in the zip archive
    for (const [, file] of Object.entries(zip.files)) {
      const pdfExtracted = await extractFile(file);
      if (pdfExtracted) {
        extractedPDFs = [...extractedPDFs, pdfExtracted];
      }
    }

    return extractedPDFs;
  } catch (error) {
    console.error('Error extracting PDF files:', error);
    return [];
  }
};
