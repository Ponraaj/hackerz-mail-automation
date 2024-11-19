// "use client";

// import { useState } from "react";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [status, setStatus] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async (event) => {
//     event.preventDefault();

//     if (!file) {
//       setStatus("Please select a file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setStatus(`File uploaded successfully`);
//       } else {
//         const error = await response.json();
//         setStatus(`Error: ${error.error}`);
//       }
//     } catch (error) {
//       setStatus("Error uploading file.");
//     }
//   };

//   return (
//     <div>
//       <h1>Upload HTML File</h1>
//       <form onSubmit={handleUpload}>
//         <input type="file" accept=".html" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//       {status && <p>{status}</p>}
//     </div>
//   );
// }
'use client';

import { useState } from "react";
import { Upload, File, FileText } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setStatus(selectedFile ? `Selected: ${selectedFile.name}` : "");
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`File uploaded successfully`);
        setFile(null);
      } else {
        const error = await response.json();
        setStatus(`Error: ${error.error}`);
      }
    } catch (error) {
      setStatus("Error uploading file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center text-gray-800">
          <FileText className="mr-2" /> Upload HTML Template
        </h1>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center">
            <input 
              type="file" 
              accept=".html"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <Upload className="w-12 h-12 text-blue-500" />
              <span className="text-gray-600">
                {file ? file.name : "Click to select HTML file"}
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={!file}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors 
                       disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Upload className="mr-2" /> Upload Template
          </button>
        </form>
        
        <button className="mt-4">
  <a
    href="/"
    className="inline-block px-7 py-3 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300 ease-in-out"
  >
    Back
  </a>
</button>


        {status && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            status.includes('Error') 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}