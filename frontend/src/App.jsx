import React, { useState } from 'react';
import { uploadFile, getDownloadUrl } from './service'; // Import the getDownloadUrl function

export default function App() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleUpload = async () => {
    if (file) {
      try {
        const response = await uploadFile(file);
        alert(response);
        setUploadedFileName(file.name); // Store the uploaded file name
        setDownloadUrl(''); // Reset the URL when a new file is uploaded
      } catch (error) {
        alert('Error uploading file');
      }
    }
  };

  const handleDownload = async () => {
    if (uploadedFileName) {
      try {
        // Fetch the presigned URL for the uploaded file
        const url = await getDownloadUrl(uploadedFileName);
        setDownloadUrl(url); // Store the download URL
      } catch (error) {
        alert('Error fetching download URL');
      }
    } else {
      alert('No file uploaded yet!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Upload and Download Files</h1>
        
        {/* File Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="file:border file:border-gray-300 file:bg-gray-50 file:text-sm file:px-4 file:py-2 file:rounded-lg file:text-gray-700 file:hover:bg-gray-200 w-full max-w-md"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mb-4">
          <button
            onClick={handleUpload}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Upload
          </button>
          <button
            onClick={handleDownload}
            disabled={!uploadedFileName}
            className={`w-full py-2 text-white font-semibold rounded-lg transition duration-200 ${uploadedFileName ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            Get Download URL
          </button>
        </div>
        
        {/* Display Download URL */}
        {downloadUrl && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Download URL:</p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {downloadUrl}
            </a>
          </div>
        )}
        
        {/* Display Uploaded File Name */}
        {uploadedFileName && (
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Uploaded File: <span className="font-medium text-indigo-600">{uploadedFileName}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
