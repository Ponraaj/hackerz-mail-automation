'use client';

import { useRouter } from 'next/navigation'

export default function UploadButton() {
  const router = useRouter();

  const handleUploadNavigate = () => {
    router.push('/upload');
  };

  return (
    <button 
      onClick={handleUploadNavigate}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out flex items-center space-x-2 shadow-md"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      <span>Upload Template</span>
    </button>
  )
}